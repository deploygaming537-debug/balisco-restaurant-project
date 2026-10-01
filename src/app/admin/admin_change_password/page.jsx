"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const AdminChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password feilds");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch("/api/admin/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      router.push("/admin")



      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log("CHANGE PASSWORD ERROR", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-password-page">
      {/* HEADER */}
      <div className="admin-password-header">
        <div>
          <h1>Change Password</h1>

          <p>Update your admin account password</p>
        </div>

        <Link href="/admin/adminProfile" className="admin-profile-back-btn">
          ← Back to Profile
        </Link>
      </div>

      {/* CARD */}
      <div className="admin-password-card">
        <form onSubmit={handleSubmit}>
          {/* CURRENT PASSWORD */}
          <div className="admin-form-group">
            <label>Current Password</label>

            <div className="admin-password-input">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div className="admin-form-group">
            <label>New Password</label>

            <div className="admin-password-input">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />

              <button type="button" onClick={() => setShowNew(!showNew)}>
                {showNew ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="admin-form-group">
            <label>Confirm New Password</label>

            <div className="admin-password-input">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="admin-edit-actions">
            <Link href="/admin" className="admin-cancel-btn">
              Cancel
            </Link>

            <button type="submit" className="admin-save-btn" disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;
