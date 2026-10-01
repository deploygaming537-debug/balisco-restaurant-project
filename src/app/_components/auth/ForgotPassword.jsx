"use client";
import Link from "next/link";
import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      let response = await fetch("/api/forgot_password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      response = await response.json();
      console.log(response);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      localStorage.setItem("resetEmail", email);

      setTimeout(() => {
        router.push("/resetPassword");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <form onSubmit={handleForgotPassword}>
            <div className="logo">
              <h2>
                <span>Forgot </span>Password
              </h2>
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value.toLowerCase())}
              />
            </div>

            <button type="submit" className="login-btn">
              Send Reset Link
            </button>

            <div className="signup-link">
              Remember your password?
              <Link href="/login" className="link-btn">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgot;
