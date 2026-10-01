import { connectionStr } from "@/lib/db";
import Order from "@/lib/orderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// GET Orders
export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, result: orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Fetch failed" },
      { status: 500 },
    );
  }
}

// POST Order (Customer Order Place)
export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);
    const body = await request.json();
    const { name, phone, address, items, total } = body;

    if (
      !name ||
      !phone ||
      !address ||
      !items ||
      items.length === 0 ||
      total === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 },
      );
    }

    const lastOrder = await Order.findOne({
      orderNumber: { $exists: true },
    }).sort({ orderNumber: -1 });
    const orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1001;

    const order = new Order({
      orderNumber,
      name,
      phone,
      address,
      items,
      total,
      status: "Pending",
    });

    const result = await order.save();
    return NextResponse.json({
      success: true,
      message: "Order Placed successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// PUT Method (Admin Status Change Karega)
export async function PUT(request) {
  try {
    await mongoose.connect(connectionStr);

    const { orderId, status, customerAction } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, message: "Order ID and Status required" },
        { status: 400 },
      );
    }

    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    // CUSTOMER CANCEL
    if (customerAction === true) {
      const currentStatus = existingOrder.status?.toLowerCase();

      if (!["pending", "confirmed"].includes(currentStatus)) {
        return NextResponse.json(
          { success: false, message: "This order cannot be cancelled" },
          { status: 400 },
        );
      }

      existingOrder.status = "Cancelled";
      const result = await existingOrder.save();

      return NextResponse.json({
        success: true,
        message: "Order cancelled successfully",
        result,
      });
    }

    // ADMIN STATUS UPDATE (All statuses: Pending, Confirmed, Preparing, Delivered, Cancelled)
    existingOrder.status = status;
    const result = await existingOrder.save();

    return NextResponse.json({
      success: true,
      message: `Status updated to ${status} successfully`,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// DELETE Method
export async function DELETE(request) {
  try {
    await mongoose.connect(connectionStr);

    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID required" },
        { status: 400 },
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    const currentStatus = order.status?.toLowerCase();

    if (!["cancelled", "delivered"].includes(currentStatus)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only cancelled or delivered orders can be deleted",
        },
        { status: 400 },
      );
    }

    await Order.findByIdAndDelete(orderId);

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
