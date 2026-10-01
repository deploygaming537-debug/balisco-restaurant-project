import { connectionStr } from "@/lib/db";
import { Booking } from "@/lib/bookingModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Next.js Cache Disable Fix (Refreshes data instantly after MongoDB Delete)
export const dynamic = "force-dynamic";

// GET: Fetch all bookings or single booking by ID/bookingId
export async function GET(request) {
  try {
    await mongoose.connect(connectionStr);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const bookingId = searchParams.get("bookingId");

    // Single Booking Fetch by bookingId
    if (bookingId) {
      const booking = await Booking.findOne({ bookingId });
      if (!booking) {
        return NextResponse.json(
          {
            success: false,
            message: "Booking record not found",
            result: null,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, result: booking });
    }

    // Single Booking Fetch by Mongo _id
    if (id) {
      const booking = await Booking.findById(id);
      if (!booking) {
        return NextResponse.json(
          {
            success: false,
            message: "Booking record not found",
            result: null,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, result: booking });
    }

    // All Bookings Fetch + Pending Notification Count
    const bookings = await Booking.find().sort({ createdAt: -1 });
    const pendingCount = await Booking.countDocuments({ status: "pending" });

    return NextResponse.json({
      success: true,
      message: "Booking list fetched successfully",
      result: bookings,
      pendingCount: pendingCount, // Notification Badge Count
    });
  } catch (error) {
    console.log("GET API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching bookings",
      },
      { status: 500 }
    );
  }
}

// POST: Create New Booking
export async function POST(request) {
  try {
    const payload = await request.json();

    if (
      !payload.name ||
      !payload.phone ||
      !payload.arrivalTime ||
      !payload.numberOfPeople ||
      !payload.bookingDate
    ) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    await mongoose.connect(connectionStr);

    const existingBooking = await Booking.findOne({
      phone: payload.phone,
      bookingDate: payload.bookingDate,
      arrivalTime: payload.arrivalTime,
    });

    if (existingBooking) {
      return NextResponse.json({
        success: false,
        message: "You already have a reservation for this date and time slot",
      });
    }

    const generatedBookingId = "RES-" + Math.floor(100000 + Math.random() * 900000);

    const newBooking = new Booking({
      bookingId: generatedBookingId,
      name: payload.name,
      phone: payload.phone,
      arrivalTime: payload.arrivalTime,
      numberOfPeople: payload.numberOfPeople,
      bookingDate: payload.bookingDate,
      status: "pending",
    });

    const result = await newBooking.save();

    return NextResponse.json({
      success: true,
      message: "Table booked successfully",
      result,
    });
  } catch (error) {
    console.log("POST API Error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to process table booking. Please try again.",
    });
  }
}

// PUT: Update Booking Status or Details
export async function PUT(request) {
  try {
    const payload = await request.json();
    const { bookingId, arrivalTime, numberOfPeople, status } = payload;

    if (!bookingId) {
      return NextResponse.json({
        success: false,
        message: "Booking ID is required",
      });
    }

    await mongoose.connect(connectionStr);

    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return NextResponse.json({
        success: false,
        message: "Booking record not found",
      });
    }

    if (arrivalTime) booking.arrivalTime = arrivalTime;
    if (numberOfPeople) booking.numberOfPeople = numberOfPeople;
    if (status) booking.status = status;

    await booking.save();

    return NextResponse.json({
      success: true,
      message: "Booking details updated successfully",
      result: booking,
    });
  } catch (error) {
    console.log("PUT API Error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update booking details",
    });
  }
}