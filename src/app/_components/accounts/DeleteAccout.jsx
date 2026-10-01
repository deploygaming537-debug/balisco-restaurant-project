"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleDeleteAccount = async (event) => {
    event.preventDefault();

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    const storeUser = localStorage.getItem("restaurantUser");

    if (!storeUser) {
      toast.error("User not found");
      return;
    }

    const user = JSON.parse(storeUser);

    try {
      const response = await fetch("/api/restaurant/delete_account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      localStorage.removeItem("restaurantUser");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
  };

  return (
    <div className="account-page">
      <div className="account-card delete-card">
        <div className="delete-icon">!</div>

        <div className="account-title">
          <h2>
            <span>Delete </span>Account
          </h2>

          <p>Permanently delete your restaurant account</p>
        </div>

        <div className="delete-warning">
          <h3>Are you sure?</h3>

          <p>
            Deleting your account will permanently remove your account
            information. This action cannot be undone.
          </p>
        </div>

        <form onSubmit={handleDeleteAccount}>
          <div className="account-field">
            <label>Current Password</label>

            <input
              type="password"
              placeholder="Enter your current password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="delete-buttons">
            <Link href="/" className="cancel-btn">
              Cancel
            </Link>

            <button type="submit" className="delete-btn">
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
