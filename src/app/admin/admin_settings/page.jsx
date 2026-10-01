"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const AdminSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", text: "" });

  const [settings, setSettings] = useState({
    restaurantName: "My Restaurant",
    phone: "0300-1234567",
    email: "admin@restaurant.com",
    address: "Main Boulevard, Gulberg, Lahore",
    isOpen: true,
    openingTime: "11:00 AM",
    closingTime: "11:00 PM",
    breakfastTiming: "07:00 AM - 11:00 AM",
    lunchTiming: "11:00 AM - 11:00 PM",
    minOrderAmount: 500,
    deliveryFee: 150,
    emailNotifications: false,
  });

  // Helper function to show auto-hiding toast
  const showToast = (text, type = "success") => {
    setToast({ show: true, type, text });
    setTimeout(() => {
      setToast({ show: false, type: "", text: "" });
    }, 3000);
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
    } catch (error) {
      console.log("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success) {
        showToast("✅ Settings updated successfully!", "success");
      } else {
        showToast("❌ Failed to save settings.", "error");
      }
    } catch (error) {
      showToast("❌ Server error occurred.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-page-container" style={{ position: "relative" }}>
      {/* Dynamic Toast Notification */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            padding: "14px 24px",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "15px",
            backgroundColor: toast.type === "success" ? "#10b981" : "#ef4444",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          {toast.text}
        </div>
      )}

      <div className="settings-header">
        <div>
          <h2>⚙️ Admin & Restaurant Settings</h2>
          <p>
            Manage restaurant details, timing, delivery charges, and status.
          </p>
        </div>
        <Link href="/admin" className="back-dash-btn">
          ← Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <div className="loader-center-box">
          <div className="clean-spinner"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="settings-form-wrapper">
          {/* Store Status */}
          <div className="settings-card">
            <h3>🔴 Store Status</h3>
            <div className="toggle-row">
              <div>
                <strong>Restaurant Open / Closed</strong>
                <p>Toggle to accept or pause online orders.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  name="isOpen"
                  checked={settings.isOpen || false}
                  onChange={handleChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* Timings Section */}
          <div className="settings-card">
            <h3>⏰ Restaurant & Meal Timings</h3>

            {/* Overall Hours */}
            <div className="form-grid-2">
              <div className="input-group">
                <label>Daily Opening Time</label>
                <input
                  type="text"
                  name="openingTime"
                  value={settings.openingTime || ""}
                  onChange={handleChange}
                  placeholder="e.g. 11:00 AM"
                />
              </div>
              <div className="input-group">
                <label>Daily Closing Time</label>
                <input
                  type="text"
                  name="closingTime"
                  value={settings.closingTime || ""}
                  onChange={handleChange}
                  placeholder="e.g. 11:00 PM"
                />
              </div>
            </div>

            {/* Meal Timings */}
            <div className="form-grid-2" style={{ marginTop: "15px" }}>
              <div className="input-group">
                <label>Breakfast Timing</label>
                <input
                  type="text"
                  name="breakfastTiming"
                  value={settings.breakfastTiming || ""}
                  onChange={handleChange}
                  placeholder="e.g. 07:00 AM - 11:00 AM"
                />
              </div>
              <div className="input-group">
                <label>Lunch & Dinner Timing</label>
                <input
                  type="text"
                  name="lunchTiming"
                  value={settings.lunchTiming || ""}
                  onChange={handleChange}
                  placeholder="e.g. 11:00 AM - 11:00 PM"
                />
              </div>
            </div>
          </div>

          {/* Store Details */}
          <div className="settings-card">
            <h3>🏪 General Info & Delivery</h3>
            <div className="form-grid-2">
              <div className="input-group">
                <label>Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={settings.restaurantName || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email || ""}
                  onChange={handleChange}
                  placeholder="e.g. admin@restaurant.com"
                />
              </div>

              <div className="input-group">
                <label>Restaurant Address</label>
                <input
                  type="text"
                  name="address"
                  value={settings.address || ""}
                  onChange={handleChange}
                  placeholder="e.g. Main Boulevard, Gulberg, Lahore"
                />
              </div>

              <div className="input-group">
                <label>Minimum Order (Rs.)</label>
                <input
                  type="number"
                  name="minOrderAmount"
                  value={settings.minOrderAmount || 0}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Delivery Fee (Rs.)</label>
                <input
                  type="number"
                  name="deliveryFee"
                  value={settings.deliveryFee || 0}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="save-btn-row">
            <button
              type="submit"
              disabled={saving}
              className="save-settings-btn"
            >
              {saving ? "Saving Changes..." : "💾 Save Settings"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminSettingsPage;