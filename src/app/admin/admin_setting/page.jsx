"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const AdminSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const [settings, setSettings] = useState({
    restaurantName: "My Restaurant",
    phone: "0300-1234567",
    email: "admin@restaurant.com",
    address: "Main Boulevard, Gulberg, Lahore",
    isOpen: true,
    openingTime: "11:00 AM",
    closingTime: "11:00 PM",
    breakfastStart: "07:00 AM",
    breakfastEnd: "11:00 AM",
    lunchStart: "11:00 AM",
    lunchEnd: "11:00 PM",
    minOrderAmount: 500,
    deliveryFee: 150,
    emailNotifications: false,
  });

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
    setMsg("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success) {
        setMsg("✅ Settings updated successfully!");
      } else {
        setMsg("❌ Failed to save settings.");
      }
    } catch (error) {
      setMsg("❌ Server error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-page-container">
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
          {msg && <div className="settings-alert">{msg}</div>}

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

          {/* Timings Management */}
          <div className="settings-card">
            <h3>⏰ Separate Meal Timings</h3>

            <h4 style={{ marginTop: "15px", marginBottom: "10px" }}>
              Breakfast Timings
            </h4>
            <div className="form-grid-2">
              <div className="input-group">
                <label>Breakfast Start Time</label>
                <input
                  type="text"
                  name="breakfastStart"
                  value={settings.breakfastStart || ""}
                  onChange={handleChange}
                  placeholder="e.g. 07:00 AM"
                />
              </div>
              <div className="input-group">
                <label>Breakfast End Time</label>
                <input
                  type="text"
                  name="breakfastEnd"
                  value={settings.breakfastEnd || ""}
                  onChange={handleChange}
                  placeholder="e.g. 11:00 AM"
                />
              </div>
            </div>

            <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
              Lunch & Dinner Timings
            </h4>
            <div className="form-grid-2">
              <div className="input-group">
                <label>Lunch & Dinner Start Time</label>
                <input
                  type="text"
                  name="lunchStart"
                  value={settings.lunchStart || ""}
                  onChange={handleChange}
                  placeholder="e.g. 11:00 AM"
                />
              </div>
              <div className="input-group">
                <label>Lunch & Dinner End Time</label>
                <input
                  type="text"
                  name="lunchEnd"
                  value={settings.lunchEnd || ""}
                  onChange={handleChange}
                  placeholder="e.g. 11:00 PM"
                />
              </div>
            </div>

            <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
              Overall Store Hours
            </h4>
            <div className="form-grid-2">
              <div className="input-group">
                <label>Daily Opening Time</label>
                <input
                  type="text"
                  name="openingTime"
                  value={settings.openingTime || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Daily Closing Time</label>
                <input
                  type="text"
                  name="closingTime"
                  value={settings.closingTime || ""}
                  onChange={handleChange}
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