"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";

export default function Checkout() {
  const router = useRouter();

  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("restaurantCart") || "[]",
    );

    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          items: cart,
          total: subtotal,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      //   order success
      toast.success("Order Placed successfully");

      //   cart empty
      localStorage.removeItem("restaurantCart");
      setCart([]);

      //   order success k bad
      router.push("/order-success");
    } catch (error) {
      console.log("Order Error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />

      <section className="checkout-page">
        <div className="container">
          <div className="checkout-heading">
            <h1>Place Your Order</h1>
            <p>Enter your details and confirm your food order.</p>
          </div>

          <div className="checkout-grid">
            {/* Customer Form */}
            <div className="checkout-form-box">
              <h3>Delivery Details</h3>

              <form onSubmit={handleSubmit}>
                <div className="checkout-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="03XXXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field">
                  <label>Delivery Address</label>
                  <textarea
                    name="address"
                    placeholder="Enter complete delivery address"
                    rows="5"
                    value={form.address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="checkout-place-btn">
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="checkout-summary">
              <h3>Order Summary</h3>

              {cart.map((item) => (
                <div className="checkout-item" key={item._id}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>

                  <strong>
                    Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                  </strong>
                </div>
              ))}

              <hr />

              <div className="checkout-total-row">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="checkout-total-row">
                <span>Subtotal</span>
                <strong>Rs. {subtotal.toLocaleString()}</strong>
              </div>

              <div className="checkout-grand-total">
                <span>Total</span>
                <strong>Rs. {subtotal.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
