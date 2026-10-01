"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ReportsPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend se report fetch karne ka function
  const fetchReportData = async () => {
    try {
      const res = await fetch("/api/admin/reports", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setReport(data.reportData);
      }
    } catch (error) {
      console.log("Error loading report data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  return (
    <div className="reports-page-container">
      {/* Top Header */}
      <div className="reports-header">
        <div>
          <h2>📈 Sales & Business Reports</h2>
          <p>
            Track your revenue, total orders, and restaurant growth performance.
          </p>
        </div>
        <Link href="/admin" className="back-dash-btn">
          ← Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <div className="loader-center-box">
          <div className="clean-spinner"></div>
        </div>
      ) : !report ? (
        <div className="no-data-card">Failed to load report metrics.</div>
      ) : (
        <>
          {/* Top 4 Metric Cards */}
          <div className="report-cards-grid">
            <div className="report-card green-border">
              <span className="card-icon">💵</span>
              <div className="card-info">
                <h4>Total Revenue</h4>
                <h3>Rs. {Number(report.totalRevenue).toLocaleString()}</h3>
              </div>
            </div>

            <div className="report-card blue-border">
              <span className="card-icon">📦</span>
              <div className="card-info">
                <h4>Total Orders</h4>
                <h3>{report.totalOrders} Orders</h3>
              </div>
            </div>

            <div className="report-card purple-border">
              <span className="card-icon">👥</span>
              <div className="card-info">
                <h4>Unique Customers</h4>
                <h3>{report.totalCustomers} Customers</h3>
              </div>
            </div>

            <div className="report-card orange-border">
              <span className="card-icon">🎯</span>
              <div className="card-info">
                <h4>Avg Order Value</h4>
                <h3>Rs. {Number(report.avgOrderValue).toLocaleString()}</h3>
              </div>
            </div>
          </div>

          {/* Order Status Breakdown */}
          <div className="report-section-title">
            <h3>📊 Order Status Breakdown</h3>
          </div>

          <div className="status-grid">
            <div className="status-card completed-box">
              <p>Delivered / Completed</p>
              <h2>{report.completedOrders}</h2>
            </div>
            <div className="status-card pending-box">
              <p>Pending / Processing</p>
              <h2>{report.pendingOrders}</h2>
            </div>
            <div className="status-card cancelled-box">
              <p>Cancelled Orders</p>
              <h2>{report.cancelledOrders}</h2>
            </div>
          </div>

          {/* Recent Orders Summary */}
          <div className="report-section-title">
            <h3>📋 Recent Orders Summary</h3>
          </div>

          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {report.recentOrders.map((ord, idx) => (
                  <tr key={idx}>
                    <td className="ord-id">#{ord._id.slice(-6)}</td>
                    <td>{ord.name || "N/A"}</td>
                    <td>{ord.phone || "N/A"}</td>
                    <td className="spent-amount">
                      Rs. {Number(ord.total || 0).toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`status-pill ${
                          ord.status === "delivered" ||
                          ord.status === "completed"
                            ? "status-green"
                            : ord.status === "cancelled"
                              ? "status-red"
                              : "status-yellow"
                        }`}
                      >
                        {ord.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportsPage;
