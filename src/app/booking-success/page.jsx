"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function BookingSuccessPage() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ arrivalTime: "", numberOfPeople: "" });
  const [updating, setUpdating] = useState(false);

  // Live Booking Details Fetch Function
const fetchLiveBooking = async (bId) => {
  try {
    const res = await fetch(`/api/booking?bookingId=${bId}`, { cache: "no-store" });
    const data = await res.json();
    
    if (data.success && data.result) {
      setBookingDetails(data.result);
      localStorage.setItem("latestBooking", JSON.stringify(data.result));
    } else {
      // Agar database se record delete ho chuka hai
      localStorage.removeItem("latestBooking");
      setBookingDetails(null);
    }
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
    const savedBooking = localStorage.getItem("latestBooking");
    if (savedBooking) {
      const parsed = JSON.parse(savedBooking);
      setBookingDetails(parsed);
      setEditData({
        arrivalTime: parsed.arrivalTime || "7:00 PM",
        numberOfPeople: parsed.numberOfPeople || "2 People",
      });

      if (parsed.bookingId) {
        fetchLiveBooking(parsed.bookingId);
      }
    }
  }, []);

  // Solid Date & Time Calculator (Fixes 0:0:0:0 Bug)
  const calculateRemainingTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    try {
      const parts = timeStr.trim().split(" ");
      let timeParts = parts[0].split(":");
      let hours = parseInt(timeParts[0], 10);
      let minutes = parseInt(timeParts[1], 10);
      const modifier = parts[1] ? parts[1].toUpperCase() : "";

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");

      const targetISO = `${dateStr.trim()}T${formattedHours}:${formattedMinutes}:00`;
      const targetDate = new Date(targetISO).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
    } catch (err) {
      console.log("Timer error:", err);
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  // Live Timer Countdown Loop
  useEffect(() => {
    if (!bookingDetails?.bookingDate || !bookingDetails?.arrivalTime) return;

    const timer = setInterval(() => {
      const remaining = calculateRemainingTime(
        bookingDetails.bookingDate,
        bookingDetails.arrivalTime
      );
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [bookingDetails]);

  // Reschedule / Edit Booking Function
  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    if (!editData.arrivalTime || !editData.numberOfPeople) {
      toast.error("Please fill in all fields");
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch("/api/booking", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: bookingDetails.bookingId,
          arrivalTime: editData.arrivalTime,
          numberOfPeople: editData.numberOfPeople,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Reservation details updated!");
      setBookingDetails(data.result);
      localStorage.setItem("latestBooking", JSON.stringify(data.result));
      setShowEditModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update booking.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section className="booking-success-section py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card border-0 shadow-lg rounded-4 text-center p-4 p-md-5 bg-white">
              
              {/* Header Status Bar */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 mb-4 pb-3 border-bottom">
                <span className="badge bg-dark px-3 py-2 fs-6 rounded-pill">
                  Ref ID: {bookingDetails?.bookingId || "N/A"}
                </span>

                <div>
                  {bookingDetails?.status === "confirmed" && (
                    <span className="badge bg-success px-3 py-2 fs-6 rounded-pill">
                      ✓ Confirmed by Restaurant
                    </span>
                  )}
                  {bookingDetails?.status === "pending" && (
                    <span className="badge bg-warning text-dark px-3 py-2 fs-6 rounded-pill">
                      ⏳ Pending Admin Approval
                    </span>
                  )}
                  {bookingDetails?.status === "cancelled" && (
                    <span className="badge bg-danger px-3 py-2 fs-6 rounded-pill">
                      ✕ Reservation Cancelled
                    </span>
                  )}
                </div>
              </div>

              <h2 className="fw-bold text-dark mb-1">Reservation Details</h2>
              <p className="text-muted small mb-4">
                Keep this page saved. Your booking details and timer update in real-time.
              </p>

              {/* Reverse Timer Clock Box */}
              <div className="bg-dark text-white p-4 rounded-3 mb-4 shadow-sm">
                <p className="small text-uppercase tracking-wider text-warning mb-3 fw-bold">
                  Time Remaining Until Reservation
                </p>
                <div className="d-flex justify-content-center gap-3 text-center">
                  <div>
                    <h2 className="fw-bold mb-0 text-warning">{timeLeft.days}</h2>
                    <small className="text-white-50">Days</small>
                  </div>
                  <h2 className="fw-bold mb-0 text-warning">:</h2>
                  <div>
                    <h2 className="fw-bold mb-0 text-warning">{timeLeft.hours}</h2>
                    <small className="text-white-50">Hours</small>
                  </div>
                  <h2 className="fw-bold mb-0 text-warning">:</h2>
                  <div>
                    <h2 className="fw-bold mb-0 text-warning">{timeLeft.minutes}</h2>
                    <small className="text-white-50">Mins</small>
                  </div>
                  <h2 className="fw-bold mb-0 text-warning">:</h2>
                  <div>
                    <h2 className="fw-bold mb-0 text-warning">{timeLeft.seconds}</h2>
                    <small className="text-white-50">Secs</small>
                  </div>
                </div>
              </div>

              {/* Customer Reservation Summary */}
              <div className="bg-light rounded-3 p-4 text-start mb-4 border">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                  <h5 className="fw-bold mb-0 text-dark">Customer Summary</h5>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="btn btn-outline-primary btn-sm rounded-pill px-3"
                  >
                    ✏️ Reschedule / Edit
                  </button>
                </div>

                <div className="row g-3">
                  <div className="col-sm-6">
                    <span className="d-block small text-muted">Customer Name</span>
                    <strong className="text-dark fs-6">{bookingDetails?.name || "Guest"}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="d-block small text-muted">Phone Number</span>
                    <strong className="text-dark fs-6">{bookingDetails?.phone || "N/A"}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="d-block small text-muted">Booking Date</span>
                    <strong className="text-dark fs-6">{bookingDetails?.bookingDate || "N/A"}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="d-block small text-muted">Arrival Time</span>
                    <strong className="text-dark fs-6">{bookingDetails?.arrivalTime || "N/A"}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="d-block small text-muted">Guests</span>
                    <strong className="text-dark fs-6">{bookingDetails?.numberOfPeople || "N/A"}</strong>
                  </div>
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link href="/" className="btn btn-dark btn-lg px-4 py-2 rounded-pill fs-6">
                  Back to Home
                </Link>
                <Link href="/menu" className="btn btn-outline-dark btn-lg px-4 py-2 rounded-pill fs-6">
                  Explore Menu
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold">Edit Reservation</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <form onSubmit={handleUpdateBooking}>
                <div className="modal-body text-start">
                  <div className="mb-3">
                    <label className="form-label small text-muted">New Arrival Time</label>
                    <select
                      className="form-select"
                      value={editData.arrivalTime}
                      onChange={(e) => setEditData({ ...editData, arrivalTime: e.target.value })}
                    >
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                      <option value="9:00 PM">9:00 PM</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small text-muted">Number of Guests</label>
                    <select
                      className="form-select"
                      value={editData.numberOfPeople}
                      onChange={(e) => setEditData({ ...editData, numberOfPeople: e.target.value })}
                    >
                      <option value="1 Person">1 Person</option>
                      <option value="2 People">2 People</option>
                      <option value="3 People">3 People</option>
                      <option value="4 People">4 People</option>
                      <option value="5 People">5 People</option>
                      <option value="6+ People">6+ People</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer border-top">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="btn btn-dark rounded-pill px-4"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}