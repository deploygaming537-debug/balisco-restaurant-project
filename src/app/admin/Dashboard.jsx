"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminProfileImage from "./admin_profile_image/page";

const AdminDashboard = ({ admin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [pendingBookings, setPendingBookings] = useState(0);
  const profileRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState(0);

  // Dynamic Dashboard States
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalFoods: 0,
    totalCategories: 0,
    pending: 0,
    preparing: 0,
    delivered: 0,
  });


  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch Booking Pending Count
        const bookingRes = await fetch("/api/booking");
        const bookingData = await bookingRes.json();
        if (bookingData.success) {
          setPendingBookings(bookingData.pendingCount || 0);
        }

        // Fetch Orders Pending Count (Agar aapki orders API alag hai)
        const orderRes = await fetch("/api/orders"); 
        const orderData = await orderRes.json();
        if (orderData.success) {
          setPendingOrders(orderData.pendingCount || orderData.result?.filter(o => o.status === "pending").length || 0);
        }
      } catch (err) {
        console.log("Notification Fetch Error:", err);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 5000); // Har 5 second me auto update

    return () => clearInterval(interval);
  }, []);




  // Fetch Dashboard & Orders Data
  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Orders Data
      const orderRes = await fetch("/api/order", { cache: "no-store" });
      const orderData = await orderRes.json();

      let ordersList = [];
      if (orderData.success) {
        ordersList = orderData.result || [];
        setRecentOrders(ordersList.slice(0, 5)); // Top 5 Recent Orders
      }

      // Calculate Stats
      const pendingCount = ordersList.filter(
        (o) => o.status?.toLowerCase() === "pending",
      ).length;

      const preparingCount = ordersList.filter(
        (o) => o.status?.toLowerCase() === "preparing",
      ).length;

      const deliveredCount = ordersList.filter(
        (o) => o.status?.toLowerCase() === "delivered",
      ).length;

      const totalRev = ordersList
        .filter((o) => o.status?.toLowerCase() !== "cancelled")
        .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

      setPendingOrders(pendingCount);

      // 2. Fetch Category & Food counts
      const dashRes = await fetch("/api/admin/dashboard", {
        cache: "no-store",
      });
      const dashData = await dashRes.json();

      setStats({
        totalOrders: ordersList.length,
        totalRevenue: totalRev,
        totalFoods: dashData?.dashboard?.totalFoods || 0,
        totalCategories: dashData?.dashboard?.totalCatgeory || 0,
        pending: pendingCount,
        preparing: preparingCount,
        delivered: deliveredCount,
      });
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      const data = await response.json();

      if (data.success) {
        toast.success("Admin logged out successfully");
        router.replace("/admin/login");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Logout error occurred");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleNotificationClick = () => {
    router.push("/admin/customers_order");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "5px solid #e2e8f0",
            borderTop: "5px solid #ff4757",
            borderRadius: "50%",
            animation: "dashboardSpin 0.8s linear infinite",
          }}
        ></div>
        <style>{`
          @keyframes dashboardSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}
      >
        <div className="admin-logo-area">
          <div className="admin-logo-icon">🍴</div>
          <div>
            <h2>Balisco Restaurant</h2>
            <span>ADMIN PANEL</span>
          </div>
          <button
            className="admin-close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="admin-sidebar-menu">
          <p className="admin-menu-title">MAIN MENU</p>

          <Link href="/admin" className="admin-menu-item admin-active">
            <span>📊</span>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/customers_order"
            className="admin-menu-item"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>📦</span>
              <span>Orders</span>
            </div>
            {pendingOrders > 0 && (
              <span
                style={{
                  backgroundColor: "#e63946",
                  color: "#ffffff",
                  borderRadius: "50%",
                  padding: "2px 7px",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {pendingOrders}
              </span>
            )}
          </Link>
              {/* Booking table button code proper ndesign */}

            <Link
  href="/admin/bookings"
  className="admin-menu-item"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <span>🍽️</span>
    <span>Booking Table</span>
  </div>
  {pendingBookings > 0 && (
    <span
      style={{
        backgroundColor: "#e63946",
        color: "#ffffff",
        borderRadius: "50%",
        padding: "2px 7px",
        fontSize: "11px",
        fontWeight: "bold",
      }}
    >
      {pendingBookings}
    </span>
  )}
</Link>






          <Link href="/foodListing" className="admin-menu-item">
            <span>🍔</span>
            <span>Foods</span>
          </Link>

          <Link href="/foodCategory" className="admin-menu-item">
            <span>📂</span>
            <span>Categories</span>
          </Link>

          <p className="admin-menu-title admin-management-title">MANAGEMENT</p>

          <Link href="/admin/customers" className="admin-menu-item">
            <span>👥</span>
            <span>Customers</span>
          </Link>


              <Link href="/admin/sliders" className="admin-menu-item">
            <span>👥</span>
            <span>Image Manage</span>
          </Link>



          <Link href="/admin/reports" className="admin-menu-item">
            <span>📈</span>
            <span>Reports</span>
          </Link>

          <Link href="/admin/admin_settings" className="admin-menu-item">
            <span>⚙️</span>
            <span>Settings</span>
          </Link>
        </div>

        <div className="admin-sidebar-bottom">
          <div className="admin-help-box">
            <div className="admin-help-icon">💬</div>
            <div>
              <strong>Need Help?</strong>
              <p>Contact support</p>
            </div>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {/* HEADER */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              className="admin-mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back, Admin 👋</p>
            </div>
          </div>

          <div className="admin-header-right">
            <button
              className="admin-notification"
              onClick={handleNotificationClick}
              style={{ position: "relative", cursor: "pointer" }}
            >
              🔔
              {pendingOrders > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    backgroundColor: "#e63946",
                    color: "#ffffff",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  {pendingOrders}
                </span>
              )}
            </button>

            <div className="admin-profile-wrapper" ref={profileRef}>
              <div
                className="admin-profile"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="admin-avatar">
                  <AdminProfileImage />
                </div>
                <div className="admin-info">
                  <strong>{admin?.name || "Admin"}</strong>
                  <span>{admin?.role || "Manager"}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="admin-content">
          <section className="admin-welcome">
            <div>
              <span className="admin-banner-small">RESTAURANT MANAGEMENT</span>
              <h2>Good Day, Admin!</h2>
              <p>Here is live overview of your restaurant business.</p>
            </div>
            <div className="admin-banner-food">🍔</div>
          </section>

          {/* STAT CARDS */}
          <section className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon purple">📦</div>
              <div className="admin-stat-details">
                <p>Total Orders</p>
                <h3>{stats.totalOrders}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon green">💰</div>
              <div className="admin-stat-details">
                <p>Total Revenue</p>
                <h3>Rs. {stats.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon orange">🍔</div>
              <div className="admin-stat-details">
                <p>Total Foods</p>
                <h3>{stats.totalFoods}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon blue">📂</div>
              <div className="admin-stat-details">
                <p>Total Categories</p>
                <h3>{stats.totalCategories}</h3>
              </div>
            </div>
          </section>

          {/* REVENUE & ORDER SUMMARY */}
          <section className="admin-middle-grid">
            <div className="admin-chart-card">
              <h3>Revenue Summary</h3>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Live Total Earnings
              </p>
              <h2 style={{ color: "#2ed573", marginTop: "10px" }}>
                Rs. {stats.totalRevenue.toLocaleString()}
              </h2>
            </div>

            <div className="admin-order-summary">
              <h3>Order Summary</h3>
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>⏳ Pending</span>
                  <strong>{stats.pending}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>🍳 Preparing</span>
                  <strong>{stats.preparing}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>✅ Delivered</span>
                  <strong>{stats.delivered}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* DYNAMIC RECENT ORDERS */}
          <section className="admin-orders-card" style={{ marginTop: "20px" }}>
            <div className="admin-card-header">
              <div>
                <h3>Recent Orders</h3>
                <p>Latest customer orders list</p>
              </div>
              <Link href="/admin/customers_order" className="admin-view-all">
                View All →
              </Link>
            </div>

            <div className="admin-table-wrapper" style={{ padding: "15px" }}>
              {recentOrders.length === 0 ? (
                <p>No orders yet.</p>
              ) : (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <th style={{ padding: "8px" }}>Order #</th>
                      <th style={{ padding: "8px" }}>Customer</th>
                      <th style={{ padding: "8px" }}>Total</th>
                      <th style={{ padding: "8px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((ord) => (
                      <tr
                        key={ord._id}
                        style={{ borderBottom: "1px solid #eee" }}
                      >
                        <td style={{ padding: "8px" }}>#{ord.orderNumber}</td>
                        <td style={{ padding: "8px" }}>{ord.name}</td>
                        <td style={{ padding: "8px" }}>Rs. {ord.total}</td>
                        <td style={{ padding: "8px" }}>
                          <span
                            style={{
                              padding: "3px 8px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              backgroundColor:
                                ord.status?.toLowerCase() === "delivered"
                                  ? "#eccc68"
                                  : "#ffeaa7",
                            }}
                          >
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
