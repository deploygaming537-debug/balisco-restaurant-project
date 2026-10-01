"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const CustomersOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasPending, setHasPending] = useState(false);

  // Orders load karna
  const getOrders = async () => {
    try {
      const response = await fetch("/api/order", { cache: "no-store" });
      const data = await response.json();

      if (data.success) {
        const orderList = data.result || [];
        setOrders(orderList);

        // Check if any order is Pending
        const pendingExists = orderList.some(
          (order) => order.status?.toLowerCase() === "pending"
        );
        setHasPending(pendingExists);
      }
    } catch (error) {
      console.log("Fetch Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
    const interval = setInterval(getOrders, 5000); // 5 sec polling
    return () => clearInterval(interval);
  }, []);

  // Status update function (Supports: Pending, Confirmed, Preparing, Delivered, Cancelled)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch("/api/order", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((ord) =>
            ord._id === orderId ? { ...ord, status: newStatus } : ord
          )
        );
        toast.success(data.message || `Status updated to ${newStatus}`);
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Error occurred while updating order status");
      console.log("Update status error:", error);
    }
  };

  return (
    <div className="admin-orders-container">
      {/* Pending Notification Bar */}
      {hasPending && (
        <div className="pending-notification-banner">
          🔔 <strong>New Pending Orders!</strong> Please review and update order statuses.
        </div>
      )}

      <div className="admin-orders-header">
        <div>
          <h2>Customer Orders</h2>
          <p>View customer details, items, and update order statuses.</p>
        </div>
        <Link href="/admin" className="back-dash-btn">
          ← Back to Dashboard
        </Link>
      </div>

      {/* PROPER LOADER SPINNER UI */}
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 0",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #ff4757",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p style={{ marginTop: "15px", color: "#666", fontWeight: "500" }}>
            Loading customer orders...
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : orders.length === 0 ? (
        <div className="orders-empty">No orders found.</div>
      ) : (
        <div className="table-responsive-box">
          <table className="orders-data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Items Ordered</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                // Ensure proper case matching
                const currentStatus = order.status
                  ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                  : "Pending";

                return (
                  <tr key={order._id}>
                    <td>
                      <span className="order-num">#{order.orderNumber}</span>
                    </td>
                    <td>
                      <strong>{order.name}</strong>
                    </td>
                    <td>{order.phone}</td>
                    <td>
                      <span className="address-text">{order.address}</span>
                    </td>
                    <td>
                      <ul className="item-details-list">
                        {order.items?.map((item, idx) => (
                          <li key={idx}>
                            {item.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <strong className="total-price">
                        Rs. {Number(order.total).toLocaleString()}
                      </strong>
                    </td>
                    <td>
                      <span
                        className={`status-pill status-${currentStatus.toLowerCase()}`}
                      >
                        {currentStatus}
                      </span>
                    </td>
                    <td>
                      <select
                        className="status-select-dropdown"
                        value={currentStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomersOrder;