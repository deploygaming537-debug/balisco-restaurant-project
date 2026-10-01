import Admin from "@/lib/adminModel";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request) {
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
        { status: 401 },
      );
    }

    // Find logged-in admin

    const admin = await Admin.findOne({
      sessionToken,
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin session",
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Required feilds
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All password feilds required",
        },
        { status: 400 },
      );
    }

    // check current password with hashedPassword for main use for database
    const passwordMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Current Password is incorrect",
        },
        { status: 400 },
      );
    }

    // // New password same as old password
    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be different",
        },
        { status: 400 },
      );
    }
    // confirm password
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password do not match",
        },
        { status: 400 },
      );
    }

    //Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password
    admin.password = hashedPassword;

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password change successfully",
    });
  } catch (error) {
    console.log("CHANGE PASSWORD ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
