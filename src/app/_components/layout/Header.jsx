"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./header.css";

const Header = () => {
  const [details, setDetails] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const accountRef = useRef(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem("restaurantUser");

      // User login nahi hai
      if (!data && pathName === "/") {
        router.push("/signup");
        return;
      }

      // User already login hai
      if (data && pathName === "/signup") {
        router.push("/");
        return;
      }

      if (data) {
        setDetails(JSON.parse(data));
      } else {
        setDetails(null);
      }
    } catch (error) {
      console.error("User data error:", error);
      localStorage.removeItem("restaurantUser");
      setDetails(null);
    }
  }, [pathName, router]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    if (accountOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [accountOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setAccountOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");

    setDetails(null);
    setAccountOpen(false);

    toast.success("Logout Successfully!");

    setTimeout(() => {
      router.push("/login");
    }, 500);
  };

  const handleAccountNavigation = (route) => {
    setAccountOpen(false);
    router.push(route);
  };

  return (
    <header id="header_main" className="header style-1">
      <div className="container">
        <div id="site-header-inner">
          <div className="header__logo">
            <Link href="/">
              <img src="/assets/images/logo/logo.png" alt="Logo" />
            </Link>
          </div>

          <nav id="main-nav" className="main-nav">
            <ul id="menu-primary-menu" className="menu">
              <li className="menu-item">
                <Link href="/" className={pathName === "/" ? "active" : ""}>
                  Home
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  href="/about"
                  className={pathName === "/about" ? "active" : ""}
                >
                  About
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  href="/menu"
                  className={pathName === "/menu" ? "active" : ""}
                >
                  Menu
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  href="/blog"
                  className={pathName === "/blog" ? "active" : ""}
                >
                  Blog
                </Link>

                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link href="/blog/bloglist">Blog List</Link>
                  </li>
                </ul>
              </li>

              <li className="menu-item">
                <Link
                  href="/contact"
                  className={pathName === "/contact" ? "active" : ""}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {details ? (
            <div className="restaurant-account" ref={accountRef}>
              <button
                type="button"
                className="restaurant-account-btn"
                onClick={() => {
                  setAccountOpen((prev) => !prev);
                }}
                aria-expanded={accountOpen}
              >
                <span className="account-avatar">
                  {details.image ? (
                    <img
                      src={details.image}
                      alt="Profile"
                      className="restaurant-profile-image"
                    />
                  ) : (
                    details.name?.charAt(0).toUpperCase() || "U"
                  )}
                </span>

                <span className="account-name">{details.name || "User"}</span>

                <span className="account-arrow">{accountOpen ? "▲" : "▼"}</span>
              </button>

              {accountOpen && (
                <div className="restaurant-account-dropdown">
                  <div className="account-profile">
                    <div className="dropdown-avatar">
                      {details.image ? (
                        <img
                          src={details.image}
                          alt="Profile"
                          className="restaurant-dropdown-profile-image"
                        />
                      ) : (
                        details.name?.charAt(0).toUpperCase() || "U"
                      )}
                    </div>

                    <div className="account-profile-info">
                      <strong>{details.name || "User"}</strong>

                      <span>{details.email || ""}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="account-dropdown-item"
                    onClick={() => handleAccountNavigation("/order")}
                  >
                    <span></span>
                    <span>Order Now</span>
                  </button>

                  <button
                    type="button"
                    className="account-dropdown-item"
                    onClick={() => handleAccountNavigation("/my-order")}
                  >
                    <span></span>
                    <span>My Orders</span>
                  </button>

                  <button
                    type="button"
                    className="account-dropdown-item"
                    onClick={() => handleAccountNavigation("/accountDetail")}
                  >
                    <span></span>
                    <span>Account Details</span>
                  </button>

                  <button
                    type="button"
                    className="account-dropdown-item"
                    onClick={() => handleAccountNavigation("/editProfile")}
                  >
                    <span></span>
                    <span>Edit Profile</span>
                  </button>

                  <button
                    type="button"
                    className="account-dropdown-item"
                    onClick={() => handleAccountNavigation("/changePassword")}
                  >
                    <span></span>
                    <span>Change Password</span>
                  </button>

                  <button
                    type="button"
                    className="account-dropdown-item account-delete"
                    onClick={() => handleAccountNavigation("/deleteAccount")}
                  >
                    <span></span>
                    <span>Delete Account</span>
                  </button>

                  <button
                    type="button"
                    className="account-logout"
                    onClick={handleLogout}
                  >
                    <span></span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="tf-button style1">
              Login / SignUp
            </Link>
          )}

          <div className="mobile-button">
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
