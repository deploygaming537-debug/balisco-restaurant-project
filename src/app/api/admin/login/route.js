import Admin from "@/lib/adminModel";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
 

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);

    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Required feilds
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 },
      );
    }

    // Find admin

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // check password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // create secure random session token
    const sessionToken = crypto.randomBytes(32).toString("hex");

    admin.sessionToken = sessionToken;
    await admin.save();

    const cookiesStore = await cookies();
    cookiesStore.set("adminSession", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      ...(rememberMe ? { maxAge: 60 * 60 * 24 * 7 } : {}),
    });

    return NextResponse.json({
      success: true,
      message: "Admin login successfully",
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
    console.log("ADMIN LOGIN API ERROR:", error);
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
