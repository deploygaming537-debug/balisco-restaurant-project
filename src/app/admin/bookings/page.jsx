"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await fetch("/api/booking");
      const data = await res.json();
      if (data.success) {
        setBookings(data.result);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const res = await fetch("/api/booking", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Booking status changed to ${newStatus}`);
        loadBookings();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Booking Management</h2>
        <button onClick={loadBookings} className="btn btn-outline-dark btn-sm rounded-pill">
          🔄 Refresh List
        </button>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Ref ID</th>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Date & Time</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item) => (
                  <tr key={item._id}>
                    <td><strong>{item.bookingId}</strong></td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.bookingDate} at {item.arrivalTime}</td>
                    <td>{item.numberOfPeople}</td>
                    <td>
                      {item.status === "confirmed" && (
                        <span className="badge bg-success">Confirmed</span>
                      )}
                      {item.status === "pending" && (
                        <span className="badge bg-warning text-dark">Pending</span>
                      )}
                      {item.status === "cancelled" && (
                        <span className="badge bg-danger">Cancelled</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => handleStatusChange(item.bookingId, "confirmed")}
                          className="btn btn-sm btn-success rounded-pill"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.bookingId, "cancelled")}
                          className="btn btn-sm btn-outline-danger rounded-pill"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}