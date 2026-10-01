"use client";

import Link from "next/link";
import "./login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError(true);
      if (!email) {
        toast.error("Please enter your email");
      }
      if (!password) {
        toast.error("please enter your password");
      }
      return;
    }

    setError(false);

    try {
      let response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      // Database se email/password wrong hai
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      //Login SuccessFull
      if (data.success) {
        toast.success("Login Successfully");
        localStorage.setItem("restaurantUser", JSON.stringify(data.result));
        router.push("/");
      }

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <form onSubmit={handleLogin} autoComplete="off">
            <div className="logo">
              <h2>
                <span>Restaurant </span>Login
              </h2>
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="restaurant-login-password"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(event) => setEmail(event.target.value.toLowerCase())}
              />
              {error && !email && (
                <span className="error-message">please enter valid email</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                name="restaurant-login-password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {error && !password && (
                <span className="error-message">
                  please enter valid password
                </span>
              )}
            </div>

            <div className="remember">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                Remember Me
              </label>

              <Link
                href="/forgotPassword"
                onClick={(event) => {
                  if (!email) {
                    event.preventDefault();
                    toast.error("Please enter your email first");
                    return;
                  }
                }}
              >
                Forgot Password?
              </Link>
            </div>

            <button className="login-btn">Login to your account</button>

            <div className="signup-link">
              Don't have an account?
              <Link href="/signup" className="link-btn" type="button">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
