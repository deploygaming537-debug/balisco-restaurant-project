import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    arrivalTime: {
      type: String,
      required: [true, "Arrival time is required"],
    },
    numberOfPeople: {
      type: String,
      required: [true, "Number of people is required"],
    },
    bookingDate: {
      type: String,
      required: [true, "Booking date is required"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);