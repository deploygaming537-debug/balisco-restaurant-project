import { connectionStr } from "@/lib/db";
import Order from "@/lib/orderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const orders = await Order.find({}).sort({ createdAt: -1, _id: -1 });

    // Initial Variables
    let totalRevenue = 0;
    let totalOrders = orders.length;
    let completedOrders = 0;
    let pendingOrders = 0;
    let cancelledOrders = 0;

    const customerSet = new Set(); // Unique customer count ke liye

    orders.forEach((order) => {
      const amount = Number(order.total) || 0;
      totalRevenue += amount;

      // Unique phone count
      if (order.phone) {
        customerSet.add(order.phone);
      }

      // Order status breakdown
      const status = order.status ? order.status.toLowerCase() : "pending";
      if (status === "delivered" || status === "completed") {
        completedOrders += 1;
      } else if (status === "cancelled") {
        cancelledOrders += 1;
      } else {
        pendingOrders += 1;
      }
    });

    // Average Order value (AOV)
    const avgOrderValue =
      totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : 0;

    return NextResponse.json({
      success: true,
      // FIX 1: 'reportDate' ki jagah 'reportData' kar diya
      reportData: {
        totalRevenue,
        totalOrders,
        totalCustomers: customerSet.size,
        avgOrderValue,
        completedOrders,
        pendingOrders, // FIX 2: Isko include kar diya
        cancelledOrders,
        recentOrders: orders.slice(0, 10), // Top 10 recent orders summary
      },
    });
  } catch (error) {
    console.log("REPORTS FETCH API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
