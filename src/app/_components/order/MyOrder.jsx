"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await fetch("/api/order");

      const data = await response.json();

      if (data.success) {
        setOrders(data.result || []);
      }
    } catch (error) {
      console.log("Order fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

      const handleCancelOrder = async (orderId) => {
  try {
    const response = await fetch("/api/order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        status: "cancelled",
        customerAction: true,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Order cancelled successfully");
      getOrders();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Cancel order error:", error);
  }
};

const handleDeleteOrder = async (orderId) => {
  try {
    const response = await fetch("/api/order", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Order deleted successfully");
      getOrders();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Delete order error:", error);
  }
};







  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "status-confirmed";

      case "cancelled":
        return "status-cancelled";

      case "preparing":
        return "status-preparing";

      case "out_for_delivery":
        return "status-delivery";

      case "delivered":
        return "status-delivered";

      default:
        return "status-pending";
    }
  };

  return (
    <>
      <Header />

      <section className="my-orders-page">
        <div className="container">
          {/* HEADING */}

          <div className="my-orders-heading">
            <p className="subtitle">Your Orders</p>

            <h1>My Orders</h1>

            <p>Check your previous and current orders.</p>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="orders-message">
              <h3>Loading Orders...</h3>
            </div>
          )}

          {/* NO ORDERS */}

          {!loading && orders.length === 0 && (
            <div className="orders-message">
              <div className="empty-order-icon">🛒</div>

              <h3>No Orders Found</h3>

              <p>You haven't placed any order yet.</p>

              <Link href="/menu" className="tf-button style1">
                Order Now
              </Link>
            </div>
          )}

          {/* ORDERS */}

          {!loading && orders.length > 0 && (
            <div className="orders-list">
              {orders.map((order) => (
                <div className="order-card" key={order._id}>
                  {/* TOP */}

                  <div className="order-card-top">
                    <div>
                      <span className="order-label">Order ID</span>

                      <h4>#{order.orderNumber}</h4>
                    </div>

                    <span
                      className={`order-status ${getStatusClass(order.status)}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  {/* CUSTOMER */}

                  <div className="order-customer">
                    <div>
                      <span>Customer</span>
                      <strong>{order.name}</strong>
                    </div>

                    <div>
                      <span>Phone</span>
                      <strong>{order.phone}</strong>
                    </div>

                    <div>
                      <span>Address</span>
                      <strong>{order.address}</strong>
                    </div>
                  </div>

                  {/* ITEMS */}

                  <div className="order-items">
                    <h4>Ordered Items</h4>

                    {order.items?.map((item, index) => (
                      <div className="order-item-row" key={index}>
                        <div>
                          <strong>{item.name}</strong>

                          <span>Quantity: {item.quantity}</span>
                        </div>

                        <strong>
                          Rs.{" "}
                          {Number(item.price * item.quantity).toLocaleString()}
                        </strong>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM */}

                  <div className="order-card-bottom">
                    <span>Total Amount</span>

                    <strong>Rs. {Number(order.total).toLocaleString()}</strong>
                  </div>

                  <div className="customer-order-actions">
                    {["pending", "confirmed"].includes(
                      order.status?.toLowerCase(),
                    ) && (
                      <button
                        className="customer-cancel-order-btn"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        Cancel Order
                      </button>
                    )}

                    {["cancelled", "delivered"].includes(
                      order.status?.toLowerCase(),
                    ) && (
                      <button
                        className="customer-delete-order-btn"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        Delete Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MyOrders;
