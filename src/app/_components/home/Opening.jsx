"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Opening = () => {
  const [openingImg, setOpeningImg] = useState(
    "/assets/images/section/opening.jpg",
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/settings/slider?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data?.success && data?.data?.opening_hours) {
          setOpeningImg(data.data.opening_hours);
        }
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };
    fetchImages();
  }, []);

  const [settings, setSettings] = useState({
    isOpen: true,
    openingTime: "11:00 AM",
    closingTime: "11:00 PM",
    breakfastTiming: "07:00 AM - 11:00 AM",
    lunchTiming: "11:00 AM - 11:00 PM",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <section className="opening">
      <div className="shape"></div>

      <div className="container">
        {/* Status Alert Banner */}
        <div
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: "25px",
            textAlign: "center",
            fontWeight: "600",
            fontSize: "15px",
            backgroundColor: settings.isOpen ? "#d1fae5" : "#fee2e2",
            color: settings.isOpen ? "#065f46" : "#991b1b",
            border: `1px solid ${settings.isOpen ? "#a7f3d0" : "#fca5a5"}`,
          }}
          data-aos="fade-down"
        >
          {settings.isOpen ? (
            <span>🟢 We are OPEN now! Place your order online.</span>
          ) : (
            <span>
              🔴 We are currently CLOSED! Orders are temporarily disabled.
            </span>
          )}
        </div>

        <div className="row">
          <div className="col-xl-7 col-md-12">
            <div className="opening-content">
              <div className="block-text">
                <h3
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  Opening Time Hours
                </h3>

                <ul>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <span>Restaurant Status:</span>{" "}
                    <strong>{settings.isOpen ? "OPEN" : "CLOSED"}</strong>
                  </li>

                  <li data-aos="fade-up" data-aos-duration="1000">
                    <span>Daily Opening Time:</span>{" "}
                    {settings.openingTime || "11:00 AM"}
                  </li>

                  <li data-aos="fade-up" data-aos-duration="1000">
                    <span>Daily Closing Time:</span>{" "}
                    {settings.closingTime || "11:00 PM"}
                  </li>
                </ul>

                <div className="d-flex">
                  {/* Dynamic Breakfast Timing */}
                  <ul>
                    <h5 data-aos="fade-up" data-aos-duration="1000">
                      Breakfast
                    </h5>

                    <li data-aos="fade-up" data-aos-duration="1000">
                      <span>Mon - Sun:</span>{" "}
                      {settings.breakfastTiming || "07:00 AM - 11:00 AM"}
                    </li>
                  </ul>

                  {/* Dynamic Lunch and Dinner Timing */}
                  <ul>
                    <h5 data-aos="fade-up" data-aos-duration="1000">
                      Lunch and Dinner
                    </h5>

                    <li data-aos="fade-up" data-aos-duration="1000">
                      <span>Mon - Sun:</span>{" "}
                      {settings.lunchTiming || "11:00 AM - 11:00 PM"}
                    </li>
                  </ul>
                </div>

                <Link href="/menu" className="tf-button style3">
                  Book a Table
                </Link>
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-md-12">
            <div
              className="opening-img"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <img
                src={openingImg}
                key={openingImg}
                alt="Restaurant opening"
                className="opening-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opening;
