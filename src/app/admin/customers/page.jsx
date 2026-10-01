"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/admin/customers", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setCustomers(data.customers);
      }
    } catch (error) {
      console.log("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Customer Filter Logic
  const filteredCustomers = customers.filter(
    (cust) =>
      cust.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.phone?.includes(searchTerm),
  );

  // Search Match Highlighter Function (Green Underline)
  const highlightText = (text, query) => {
    if (!query || !text) return text;

    const parts = String(text).split(new RegExp(`(${query})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="search-match-green">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // Safe Date Formatter
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
  };

  return (
    <div className="customers-page-container">
      {/* Top Header */}
      <div className="customers-header">
        <div>
          <h2>👥 Customer List</h2>
          <p>View all customers who ordered from your restaurant.</p>
        </div>
        <Link href="/admin" className="back-dash-btn">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Search Input Box */}
      <div className="customers-search-box">
        <input
          type="text"
          placeholder="Search customer by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading Spinner / Data Table */}
      {loading ? (
        <div className="loader-center-box">
          <div className="clean-spinner"></div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="no-data-card">
          No customers found matching your search.
        </div>
      ) : (
        <div className="customers-table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Last Order Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust, idx) => (
                <tr key={idx}>
                  <td className="cust-name">
                    {highlightText(cust.name, searchTerm)}
                  </td>
                  <td>{highlightText(cust.phone, searchTerm)}</td>
                  <td>{cust.address}</td>
                  <td>
                    <span className="orders-badge">
                      {cust.totalOrders} Orders
                    </span>
                  </td>
                  <td className="spent-amount">
                    Rs. {Number(cust.totalSpent).toLocaleString()}
                  </td>
                  <td className="date-text">
                    {formatDate(cust.lastOrderDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
