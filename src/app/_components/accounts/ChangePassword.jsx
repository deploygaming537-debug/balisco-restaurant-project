"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (event) => {
    event.preventDefault();

    // empty field check
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    const storeUser = localStorage.getItem("restaurantUser");

    if (!storeUser) {
      toast.error("User not found");
      return;
    }

    const user = JSON.parse(storeUser);

    try {
      const response = await fetch("/api/restaurant/change_password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      setTimeout(() => {
        localStorage.removeItem("restaurantUser");
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }finally{
      setLoading(true);
    }
  };

  return (
    <div>
      <div className="account-page">
        <div className="account-card small-card">
          <div className="account-title">
            <h2>
              <span>Change </span>Password
            </h2>
            <p>Update your account password</p>
          </div>

          <form onSubmit={handleChangePassword}>
            <div className="account-field">
              <label>Current Password</label>

              <input
                type="password"
                name="oldPassword"
                value={oldPassword}
                placeholder="Enter Current Password"
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </div>

            <div className="account-field">
              <label>New Password</label>

              <input
                type="password"
                name="newPassword"
                value={newPassword}
                placeholder="Enter New Password"
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>

            <div className="account-field">
              <label>Confirm New Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm New Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button type="submit" className="account-submit">
              {loading ? "Password Changing" : "Change password "}
            </button>
          </form>

          <div className="account-back">
            <Link href="/">← Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
