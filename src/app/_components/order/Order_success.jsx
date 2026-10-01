"use client";

import Link from "next/link";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const OrderSuccess = () => {
  return (
    <>
      <Header />

      <section className="order-success-page">
        <div className="container">
          <div className="order-success-box">
            <div className="success-icon">✓</div>

            <h1>Order Placed Successfully!</h1>

            <p>
              Thank you for your order. Your order has been successfully placed.
            </p>

            <p className="success-small-text">
              We will process your order shortly.
            </p>

            <div className="success-buttons">
              <Link href="/my-order" className="tf-button style1">
                View My Orders
              </Link>

              <Link href="/menu" className="continue-order-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OrderSuccess;
