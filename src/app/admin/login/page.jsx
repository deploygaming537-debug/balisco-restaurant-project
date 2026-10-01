"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Admin Login successfully");
      router.replace("/admin");
    } catch (error) {
      console.log("Admin login error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/admin", {
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success) {
          router.replace("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAdmin();
  }, [router]);

  return (
    <div className="admin-auth-page admin-login-page">
      <div className="admin-auth-container">
        {/* LEFT SIDE */}
        <div className="admin-auth-left">
          <div className="admin-auth-brand">
            <div className="admin-auth-logo">🍴</div>

            <div>
              <h2>Balisco Restaurant</h2>
              <span>ADMIN PANEL</span>
            </div>
          </div>

          <div className="admin-auth-content">
            <span className="admin-auth-badge">RESTAURANT MANAGEMENT</span>

            <h1>
              Manage your restaurant
              <br />
              <strong>with ease.</strong>
            </h1>

            <p>
              Everything you need to manage orders, foods, customers and your
              restaurant in one place.
            </p>

            <div className="admin-auth-features">
              <div>
                <span>✓</span>
                <p>Manage customer orders</p>
              </div>

              <div>
                <span>✓</span>
                <p>Manage foods & categories</p>
              </div>

              <div>
                <span>✓</span>
                <p>View restaurant reports</p>
              </div>
            </div>
          </div>

          <div className="admin-auth-footer">
            © 2026 Balisco Restaurant. All rights reserved.
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="admin-auth-right">
          <div className="admin-auth-form-box">
            <div className="admin-mobile-brand">
              <div className="admin-auth-logo">🍴</div>
              <div>
                <h2>Balisco Admin panel</h2>
                <span>ADMIN PANEL</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-input-group">
                <label>Email Address</label>

                <div className="admin-input-wrapper">
                  <span>✉️</span>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="admin-input-group">
                <div className="admin-label-row">
                  <label>Password</label>

                  <Link href="/admin/forgot-password">Forgot Password?</Link>
                </div>

                <div className="admin-input-wrapper">
                  <span></span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    name="password"
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="admin-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <label className="admin-remember">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="admin-auth-button"
              >
                {loading ? "Logging...." : "Login to dashboard"}
                {!loading && <span>→</span>}
              </button>
            </form>

            <div className="admin-auth-divider">
              <span>OR</span>
            </div>

            <p className="admin-create-account">
              Don't have an admin account?
              <Link href="/admin/signup">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
