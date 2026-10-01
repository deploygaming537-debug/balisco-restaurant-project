import Admin from "@/lib/adminModel";
import { categorySchema } from "@/lib/categoryModel";
import { connectionStr } from "@/lib/db";
import { foodSchema } from "@/lib/foodModel";
import Order from "@/lib/orderModel";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    // check admin session
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("adminSession")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not authenticated",
        },
        { status: 401 },
      );
    }

    // find admin loggedin check
    const admin = await Admin.findOne({
      sessionToken,
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Admin Session",
        },
        { status: 401 },
      );
    }

    // Total food
    const totalFoods = await foodSchema.countDocuments();

    //Total category
    const totalCatgeory = await categorySchema.countDocuments();

    // Total order
    const totalOrder = await Order.countDocuments();

    // Pending order
    const pendingOrder = await Order.countDocuments({
      status: "Pending",
    });

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    return NextResponse.json({
      success: true,
      dashboard: {
        totalFoods,
        totalCatgeory,
        totalOrder,
        pendingOrder,
        totalRevenue,
      },
    });
  } catch (error) {
    console.log("ADMIN DASHBOARD API ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
