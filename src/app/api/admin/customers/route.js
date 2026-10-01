import { connectionStr } from "@/lib/db";
import Order from "@/lib/orderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    // Sahi orders fetch karna (Latest orders pehle)
    const orders = await Order.find({}).sort({ createdAt: -1, _id: -1 });

    // Customer grouping logic
    const customerMap = {};

    orders.forEach((order) => {
      const phone = order.phone || "N/A";

      // Date check safe fallback: Agar createdAt nahi hai, to MongoDB ID se exact time nikal lo
      const safeDate = order.createdAt
        ? order.createdAt
        : order._id
          ? order._id.getTimestamp()
          : new Date();

      // Agar is customer ka record pehle se nahi hai, to new customer record banao
      if (!customerMap[phone]) {
        customerMap[phone] = {
          name: order.name || "Unknown",
          phone: order.phone || "N/A",
          address: order.address || "N/A", // Fixed spelling from addres to address
          totalOrders: 1,
          totalSpent: Number(order.total) || 0,
          lastOrderDate: safeDate, // Sahi timestamp
        };
      } else {
        // Agar phone number pehle se exist karta hai, to count aur spent amount update karo
        customerMap[phone].totalOrders += 1;
        customerMap[phone].totalSpent += Number(order.total) || 0;
      }
    });

    // Object ko array mein convert karna
    const customerList = Object.values(customerMap);

    return NextResponse.json({
      success: true,
      customers: customerList,
    });
  } catch (error) {
    console.log("CUSTOMER FETCH API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
