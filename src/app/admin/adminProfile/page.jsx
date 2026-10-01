"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const getAdminProfile = async () => {
      try {
        const response = await fetch("/api/admin", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success) {
          setAdmin(data.admin);
        }
      } catch (error) {
        console.log(("ADMIN PROFILE ERROR", error));
      } finally {
        setLoading();
      }
    };
    getAdminProfile();
  }, []);

  // loading 
  if (loading) {
    return(
      <div className="admin-profile-loading">
        <h3>Loading......</h3>
      </div>
    )
  }

  // admin data na mily toh 
  if (!admin) {
      return(
        <div className="admin-profile-loading">
          <h3>Unable to laod admin profile</h3>
        </div>
      )
  }



  return (
    <div className="admin-profile-page">
      {/* PAGE HEADER */}
      <div className="admin-profile-page-header">
        <div>
          <h1>My Profile</h1>
          <p>View and manage your admin account</p>
        </div>

        <Link href="/admin" className="admin-profile-back-btn">
          ← Back to Dashboard
        </Link>
      </div>

      {/* PROFILE CARD */}
      <div className="admin-profile-card">
        {/* PROFILE TOP */}
        <div className="admin-profile-top">
          <div className="admin-profile-large-image">
            {admin.image ? (
              <img src={admin.image} alt="Admin Profile" />
            ) : (
              <span>👤</span>
            )}
          </div>

          <div className="admin-profile-title">
            <h2>{admin.name}</h2>

            <p>Administrator</p>
          </div>
        </div>

        {/* PROFILE INFORMATION */}
        <div className="admin-profile-info">
          {/* NAME */}
          <div className="admin-profile-field">
            <span>Name</span>

            <strong>{admin.name}</strong>
          </div>

          {/* EMAIL */}
          <div className="admin-profile-field">
            <span>Email</span>

            <strong>{admin.email}</strong>
          </div>

          {/* ROLE */}
          <div className="admin-profile-field">
            <span>Role</span>

            <strong>Administrator</strong>
          </div>

          {/* STATUS */}
          <div className="admin-profile-field">
            <span>Account Status</span>

            <strong className="admin-status-active">Active</strong>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="admin-profile-actions">
          <Link
            href="/admin/admin_change_password"
            className="admin-profile-action-btn"
          >
            🔒 Change Password
          </Link>

          <Link href="/admin/admin_setting" className="admin-profile-action-btn">
            ⚙️ Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
