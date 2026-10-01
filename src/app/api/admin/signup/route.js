import Admin from "@/lib/adminModel";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
 
export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);

    const body = await request.json();

    const { name, email, phone, role, password, confirmPassword } = body;
    //  Required fields
    if (!name || !email || !phone || !role || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All feilds are required",
        },
        {
          status: 400,
        },
      );
    }

    // password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match",
        },
        { status: 400 },
      );
    }

    // Check existing admin
    const existAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin already exist with this email",
        },
        { status: 400 },
      );
    }

    // create admin

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email: email.toLowerCase(),
      phone,
      role,
      password: hashedPassword,
    });

    const result = await admin.save();

    return NextResponse.json({
      success: true,
      message: "Admin account created successfully",
      admin: {
        id: result._id,
        name: result.name,
        email: result.email,
        phone: result.phone,
        role: result.role,
      },
    });
  } catch (error) {
    console.log("ADMIN SIGNUP API ERROR:", error);

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
