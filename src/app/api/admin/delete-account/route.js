import Admin from "@/lib/adminModel";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function DELETE(request) {
  try {
    await mongoose.connect(connectionStr);

    // Get admin session
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("adminSession")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not authenticated",
        },
        { status: 401 }
      );
    }

    // Find logged-in admin
    const admin = await Admin.findOne({ sessionToken });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin session",
        },
        { status: 401 }
      );
    }

    // Get password from frontend
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is required",
        },
        { status: 400 }
      );
    }

    // Check hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password",
        },
        { status: 400 }
      );
    }

    // Delete admin account
    await Admin.findByIdAndDelete(admin._id);

    // Delete login session
    cookieStore.delete("adminSession");

    return NextResponse.json({
      success: true,
      message: "Admin account deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ACCOUNT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}