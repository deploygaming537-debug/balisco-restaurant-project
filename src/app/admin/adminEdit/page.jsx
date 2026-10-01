"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminProfileEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [role, setRole] = useState("");
  const router = useRouter();

  // get exist profile
  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await fetch("/api/admin", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();
        if (!data.success) {
          toast.error(data.message);
          return;
        }

        setName(data.admin.name || "");
        setEmail(data.admin.email || "");
        setRole(data.admin.role || "Admin");
      } catch (error) {
        console.log("GET ADMIN PROFILE ERROR", error);
        toast.error("Unable to load profile");
      } finally {
        setPageLoading(false);
      }
    };

    getAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Name and email is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/profile-edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      router.push("/admin");
    } catch (error) {
      console.log("EDIT PROFILE ERROR", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-profile-edit-page">
      {/* HEADER */}
      <div className="admin-profile-edit-header">
        <div>
          <h1>Edit Profile</h1>
          <p>Update your admin account information</p>
        </div>

        <Link href="/admin/adminProfile" className="admin-profile-back-btn">
          ← Back to Profile
        </Link>
      </div>

      {/* FORM CARD */}
      <div className="admin-profile-edit-card">
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="admin-form-group">
            <label>Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          {/* EMAIL */}
          <div className="admin-form-group">
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* ROLE */}
          <div className="admin-form-group">
            <label>Role</label>

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="admin-edit-actions">
            <Link href="/admin/profile" className="admin-cancel-btn">
              Cancel
            </Link>

            <button type="submit" className="admin-save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileEdit;
