"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const AdminDeleteAccount = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your admin account?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/delete-account",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      setPassword("");

      setTimeout(() => {
        router.replace("/admin/signup");
      }, 1000);
    } catch (error) {
      console.log("Delete account error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-delete-page">
      <div className="admin-delete-card">

        <div className="admin-delete-icon">
          ⚠️
        </div>

        <h2>Delete Account</h2>

        <p>
          This action cannot be undone.
        </p>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <div className="admin-delete-buttons">

          <Link
            href="/admin/adminProfile"
            className="admin-cancel-btn"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="admin-delete-btn"
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AdminDeleteAccount;