"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const AccountDetail = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    try {
      const data = localStorage.getItem("restaurantUser");
      if (data) {
        setDetails(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!details) {
    return <>Loading Account Details....</>;
  }

  return (
    <>
      <div className="account-page">
        <div className="account-card">
          <div className="account-title">
            <h2>
              <span>Account </span>Details
            </h2>

            <p>View your restaurant account information</p>
          </div>

          <div className="account-profile-image">
            {details.image ? (
              <img
                src={details.image}
                alt="Restaurant"
                className="account-restaurant-image"
              />
            ) : (
              <div className="account-no-image">No Restaurant Image</div>
            )}
          </div>

          <div className="account-details">...</div>

          <div className="account-details">
            <div className="account-field">
              <label>Restaurant Name</label>
              <div className="account-value">{details.name}</div>
            </div>

            <div className="account-field">
              <label>Email</label>
              <div className="account-value">{details.email}</div>
            </div>

            <div className="account-field">
              <label>City</label>
              <div className="account-value">{details.city}</div>
            </div>

            <div className="account-field">
              <label>Contact</label>
              <div className="account-value">{details.contact}</div>
            </div>

            <div className="account-field full-width">
              <label>Address</label>
              <div className="account-value">{details.address}</div>
            </div>
          </div>

          <div className="account-buttons">
            <Link href="/editProfile" onClick={()=>setLoading("edit")} className="account-btn">
             {loading === "edit" ? "Opening..." : "Edit Profile"}
            </Link>

            <Link href="/changePassword" onClick={()=>setLoading("password")} className="account-btn secondary">
                {loading === "password" ? "Opeing...": "Change password"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetail;
