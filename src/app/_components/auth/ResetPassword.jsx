'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import "./login.css"
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter();

  const hanldeResetPassword = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill both fields");
      return;
    }

    if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match")
        return;
    }

    const email = localStorage.getItem("resetEmail");

    if (!email) {
        toast.error("Reset Email not found");
        return;
    }

    try {
      let response = await fetch("/api/reset_password",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      response = await response.json();
      console.log(response);

      if (response.success) {
        toast.success(response.message);
      }else{
        toast.error(response.message);
        return;
      }

      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        router.push("/login")
      }, 1000);


    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }






  }



  return (
    <>
    <div className="login-container">
        <div className="login-card">

          <form onSubmit={hanldeResetPassword}>

            <div className="logo">
              <h2>
                <span>Reset </span>Password
              </h2>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                New Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                value={password} 
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">
              Reset Password
            </button>

            <div className="signup-link">
              Remember your password?

              <Link
                href="/login"
                className="link-btn"
              >
                Login
              </Link>
            </div>

          </form>

        </div>
      </div>
    </>

  )
}

export default ResetPassword;