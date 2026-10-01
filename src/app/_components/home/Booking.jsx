"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";


const Booking = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    arrivalTime: "",
    numberOfPeople: "",
    bookingDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name.trim() ||
    !formData.phone.trim() ||
    !formData.arrivalTime ||
    !formData.numberOfPeople ||
    !formData.bookingDate
  ) {
    toast.error("Please fill in all required fields.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);

    // 1. SAVE DATA TO LOCAL STORAGE FIRST WITH API RESULT (Booking ID)
    const savedData = {
      ...formData,
      bookingId: data.result?.bookingId || "RES-" + Math.floor(100000 + Math.random() * 900000),
    };
    localStorage.setItem("latestBooking", JSON.stringify(savedData));

    // 2. RESET FORM AFTER SAVING
    setFormData({
      name: "",
      phone: "",
      arrivalTime: "",
      numberOfPeople: "",
      bookingDate: "",
    });

    // 3. REDIRECT TO SUCCESS PAGE
    router.push("/booking-success");
  } catch (error) {
    console.log(error);
    toast.error("Failed to submit reservation. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <section className="booking">
      <div className="container">
        <div className="row">
          {/* Booking Information */}
          <div className="col-md-6">
            <div className="booking-content">
              <div className="block-text style-2">
                <p
                  className="subtitle"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  ONLINE RESERVATION
                </p>

                <h3
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  BOOK A TABLE
                </h3>

                <p className="text" data-aos="fade-up" data-aos-duration="1000">
                  Reserve your table with us and enjoy delicious food,
                  comfortable surroundings and friendly service.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="col-md-6">
            <div className="booking-form">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Name*"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Phone*"
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <select
                      name="arrivalTime"
                      value={formData.arrivalTime}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="">Arrival Time</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                      <option value="9:00 PM">9:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select
                      name="numberOfPeople"
                      value={formData.numberOfPeople}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="">Number of People</option>
                      <option value="1 Person">1 Person</option>
                      <option value="2 People">2 People</option>
                      <option value="3 People">3 People</option>
                      <option value="4 People">4 People</option>
                      <option value="5 People">5 People</option>
                      <option value="6+ People">6+ People</option>
                    </select>
                  </div>

                  <div className="form-group col-md-6">
                    <input
                      type="date"
                      name="bookingDate"
                      value={formData.bookingDate}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="tf-button style1 text-center"
                >
                  {loading ? "Processing..." : "Book a Table"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
