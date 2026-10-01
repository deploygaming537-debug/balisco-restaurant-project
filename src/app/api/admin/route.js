import Admin from "@/lib/adminModel";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("adminSession")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not authenticated",
        },
        {
          status: 401,
        },
      );
    }

    const admin = await Admin.findOne({
      sessionToken,
    }).select("-password -sessionToken");

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin session",
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.log("Admin API ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
