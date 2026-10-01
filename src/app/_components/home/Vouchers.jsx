"use client"; // Client Component declare

import Link from "next/link";
import { useEffect, useState } from "react";

const Vouchers = () => {
  // Static paths hum Default state mein tackle kar rahe hain
  const [img1, setImg1] = useState("/assets/images/section/menu2.jpg");
  const [icon1, setIcon1] = useState("/assets/images/icon/shopping-bag.png");
  const [icon2, setIcon2] = useState("/assets/images/icon/gift-card.png");
  const [img2, setImg2] = useState("/assets/images/section/menu3.jpg");

  // Dynamic Image Fetching logic Tackle [cite: 1, 10]
  useEffect(() => {
    const fetchVoucherImages = async () => {
      try {
        const res = await fetch(`/api/settings/slider?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (!res.ok) return;

        const data = await res.json();

        // data aur keys match Tackle
        if (data && data.success && data.data) {
          if (data.data.voucher_image1) setImg1(data.data.voucher_image1);
          if (data.data.voucher_icon1) setIcon1(data.data.voucher_icon1);
          if (data.data.voucher_icon2) setIcon2(data.data.voucher_icon2);
          if (data.data.voucher_image2) setImg2(data.data.voucher_image2);
        }
      } catch (error) {
        console.error("Error fetching vouchers images:", error);
      }
    };

    fetchVoucherImages();
  }, []); // Mount hone par ek baar chalega [cite: 10]

  return (
    <section className="vouchers">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="vouchers-content">
              {/* Image 1 with dynamic URL and key Tackle */}
              <div
                className="item image"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <img src={img1} key={img1} alt="Restaurant food" />
              </div>

              {/* Order Online */}
              <div className="item content">
                {/* Icon 1 dynamic URL and key Tackle */}
                <img
                  src={icon1}
                  key={icon1}
                  alt="Order online"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                />

                <h4 data-aos="fade-up" data-aos-duration="1000">
                  Order Online
                </h4>

                <p data-aos="fade-up" data-aos-duration="1000">
                  Enjoy your favorite food from the comfort of your home. Choose
                  your food and place your order easily online.
                </p>

                <Link href="/order" className="tf-button style3">
                  Order Now
                </Link>
              </div>

              {/* Restaurant Experience */}
              <div className="item content">
                {/* Icon 2 dynamic URL and key Tackle */}
                <img
                  src={icon2}
                  key={icon2}
                  alt="Restaurant"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                />

                <h4 data-aos="fade-up" data-aos-duration="1000">
                  Dine With Us
                </h4>

                <p data-aos="fade-up" data-aos-duration="1000">
                  Enjoy delicious food, a comfortable atmosphere and friendly
                  service with your family and friends.
                </p>

                <Link href="/booking" className="tf-button style3">
                  Book a Table
                </Link>
              </div>

              {/* Image 2 dynamic URL and key Tackle */}
              <div
                className="item image"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <img src={img2} key={img2} alt="Restaurant Promo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vouchers;