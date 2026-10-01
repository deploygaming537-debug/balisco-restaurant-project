"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Admin",
    password: "",
    confirmPassword: "",
    terms: false,
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
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.role ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("Please fill all feidls");
      return;
    }

    // checked password match
    if (form.password !== form.confirmPassword) {
      toast.error("Password and confirmPassword do not match");
      return;
    }
    // checked terms process and error
    if (!form.terms) {
      toast.error("Please accept terms and condtions");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Admin account created successfully");
      router.push("/admin/login");
    } catch (error) {
      console.log("ADMIN SIGNUP ERROR", error);
      toast.error("Something went wrong");
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
    <div className="admin-auth-page admin-signup-page">
      <div className="admin-signup-container">
        {/* TOP BRAND */}
        <div className="admin-signup-brand">
          {/* <div className="admin-auth-logo"></div> */}

          <div>
            <h2>Balisco Restaurant</h2>
            <span>ADMIN PANEL</span>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="admin-signup-card">
          <div className="admin-signup-heading">
            <div className="admin-signup-icon">👨‍💼</div>

            <h1>Create Admin Account</h1>

            <p>Set up your administrator account to manage your restaurant.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="admin-signup-grid">
              {/* NAME */}
              <div className="admin-input-group">
                <label>Full Name</label>

                <div className="admin-input-wrapper">
                  <span></span>

                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    placeholder="Enter your full name"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="admin-input-group">
                <label>Email Address</label>

                <div className="admin-input-wrapper">
                  <span></span>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="admin@example.com"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="admin-input-group">
                <label>Phone Number</label>

                <div className="admin-input-wrapper">
                  <span></span>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    placeholder="Enter phone number"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ROLE */}
              <div className="admin-input-group">
                <label>Admin Role</label>

                <div className="admin-input-wrapper">
                  <span></span>

                  <select name="role" onChange={handleChange} value={form.role}>
                    <option value="Admin">Administrator</option>

                    <option value="Manager">Restaurant Manager</option>
                  </select>
                </div>
              </div>

              {/* PASSWORD */}
              <div className="admin-input-group">
                <label>Password</label>

                <div className="admin-input-wrapper">
                  <span></span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="admin-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "" : ""}
                  </button>
                </div>
              </div>

              {/* CONFIRM */}
              <div className="admin-input-group">
                <label>Confirm Password</label>

                <div className="admin-input-wrapper">
                  <span></span>

                  <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
            </div>

            <label className="admin-terms">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />

              <span>
                I agree to the
                <a href="#"> Terms & Conditions</a>
              </span>
            </label>

            <button
              type="submit"
              className="admin-auth-button admin-signup-button"
            >
              Create Admin Account
              <span>→</span>
            </button>
          </form>

          <div className="admin-signup-login">
            Already have an admin account?
            <Link href="/admin/login">Login Here</Link>
          </div>
        </div>

        <p className="admin-signup-bottom">
          Secure Admin Access • Balisco Restaurant
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
