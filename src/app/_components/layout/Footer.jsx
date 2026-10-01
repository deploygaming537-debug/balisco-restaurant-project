"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Footer = () => {
  // Opening component waali same settings state
  const [settings, setSettings] = useState({
    isOpen: true,
    openingTime: "11:00 AM",
    closingTime: "11:00 PM",
    breakfastTiming: "07:00 AM - 11:00 AM",
    lunchTiming: "11:00 AM - 11:00 PM",
  });

  // Admin settings fetch karne ka effect
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Error loading footer settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Logo & About Section */}
          <div className="col-lg-3 col-md-6">
            <div className="widget logo">
              <img src="/assets/images/logo/logofooter.png?v=1" alt="Basilico Logo" />
              <p>
                Our buzzy food-hall style concept is inspired by international dining styles, especially
                in Asia. Explore the following fast-action food.
              </p>
              <ul className="list-social">
                <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                <li><Link href="#"><i className="fa-solid fa-envelope"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
              </ul>
            </div>
          </div>

          {/* Dynamic Opening Time Section (Matched with Admin Settings) */}
          <div className="col-lg-3 col-md-6">
            <div className="widget time">
              <h5>OPENING TIME</h5>
              <ul>
                <li>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: settings.isOpen ? "#10b981" : "#ef4444", fontWeight: "bold" }}>
                    {settings.isOpen ? "OPEN" : "CLOSED"}
                  </span>
                </li>
                <li className="mt-2">
                  <strong>Daily Hours:</strong><br />
                  {settings.openingTime || "11:00 AM"} - {settings.closingTime || "11:00 PM"}
                </li>
                <li className="mt-2">
                  <strong>Breakfast:</strong><br />
                  Mon - Sun: {settings.breakfastTiming || "07:00 AM - 11:00 AM"}
                </li>
                <li className="mt-2">
                  <strong>Lunch & Dinner:</strong><br />
                  Mon - Sun: {settings.lunchTiming || "11:00 AM - 11:00 PM"}
                </li>
              </ul>
            </div>
          </div>

          {/* Location & Contact Section */}
          <div className="col-lg-3 col-md-6">
            <div className="widget locations">
              <h5>LOCATION</h5>
              <ul>
                <li>
                  <span>Address:</span>
                  <p>4517 Washington Ave. Manchester, Kentucky 39495, USA</p>
                </li>
                <li>
                  <span>Booking & Contact:</span>
                  <p>Basilicofood123@gmail.com</p>
                  <p>0347-4655697</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="col-lg-3 col-md-6">
            <div className="widget latestnew">
              <h5>LATEST NEW</h5>
              <p className="mb-28">Register your email to not miss any news and offers from us!</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Email *"
                    required
                  />
                </div>

                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    I agree to the Privacy Policy
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="row bottom-footer">
          <div className="bottom-main">
            <p>Copyright © 2026 Themesflat. All Rights Reserved.</p>

            <ul>
              <li><Link href="#">PRIVACY</Link></li>
              <li><Link href="#">TERM OF USE</Link></li>
              <li><Link href="#">POLICY</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;