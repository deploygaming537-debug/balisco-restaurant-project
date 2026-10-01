import Admin from "@/lib/adminModel";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

    // find logged in admin
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

    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Name email and role are required",
        },
        { status: 400 },
      );
    }

    // Check if email is already used by another admin
    const existAdmin = await Admin.findOne({
      email: email.toLowerCase(),
      _id: { $ne: admin._id },
    });

    if (existAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already exist another admin",
        },
        { status: 400 },
      );
    }

    // Update profile
    admin.name = name;
    admin.email = email.toLowerCase();
    admin.role = role;

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        image: admin.image,
      },
    });
  } catch (error) {
    console.log("EDIT PROFILE ERROR", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
