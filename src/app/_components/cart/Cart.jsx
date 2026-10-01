"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Cart localStorage se load karega
  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("restaurantCart") || "[]",
    );

    setCart(savedCart);
  }, []);

  // Cart localStorage mein save karega
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("restaurantCart", JSON.stringify(updatedCart));
  };

  // Quantity increase
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    updateCart(updatedCart);
  };

  // Quantity decrease
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // Food remove
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);

    updateCart(updatedCart);

    toast.success("Item removed from cart");
  };

  // Subtotal calculate
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  return (
    <>
      <Header />

      <section className="cart-page">
        <div className="container">
          {/* Heading */}
          <div className="cart-heading">
            <h1>Your Cart</h1>
            <p>Review your selected food items before checkout.</p>
          </div>

          {cart.length === 0 ? (
            /* Empty Cart */
            <div className="empty-cart">
              <h3>Your cart is empty</h3>

              <p>You haven't added any food items to your cart yet.</p>

              <Link href="/menu" className="tf-button">
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="row">
              {/* Cart Items */}
              <div className="col-lg-8">
                {cart.map((item) => (
                  <div className="cart-item" key={item._id}>
                    {/* Image */}
                    <div className="cart-item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="no-cart-image">No Image</div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>

                      <p>{item.description}</p>

                      <strong>Rs. {Number(item.price).toLocaleString()}</strong>
                    </div>

                    {/* Quantity */}
                    <div className="cart-quantity">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item._id)}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeItem(item._id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="col-lg-4">
                <div className="cart-summary">
                  <h3>Order Summary</h3>

                  <div className="summary-row">
                    <span>Items</span>
                    <span>
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>Subtotal</span>

                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="summary-row">
                    <span>Delivery</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <hr />

                  <div className="summary-total">
                    <span>Total</span>

                    <strong>Rs. {subtotal.toLocaleString()}</strong>
                  </div>

                  <Link
                    href="/checkout"
                    className="tf-button cart-checkout-btn"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link href="/menu" className="continue-shopping">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
