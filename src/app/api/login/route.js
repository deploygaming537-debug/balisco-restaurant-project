import { connectionStr } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// GET request test karne ke liye
export async function GET() {
  return NextResponse.json({
    message: "Login API GET is working",
  });
}

// POST request = Login ke liye only this is target post api
export async function POST(request) {
  // Login form se email aur password receive karna
  const data = await request.json();
  // Data se email aur password alag nikalna
  const { email, password } = data;

  // agar is mein ye Empty ho toh us k liye ye use krna hai As a validation
  if (!email || !password) {
    return NextResponse.json({
      success: false,
      message: "Email and password are required",
      data: data,
    });
  }

  // MongoDB se connection banana
  await mongoose.connect(connectionStr);

  // Database mein email search karna
  const user = await restaurantSchema.findOne({ email: email.toLowerCase() });
  // Agar email database mein nahi mili
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Email not found",
    });
  }
  // Database ki password ko login wali password se match karna
  if (user.password !== password) {
    return NextResponse.json({
      success: false,
      message: "Password Incorrect",
    });
  }

  // User ka complete data object mein convert karna
  const result = user.toObject();
  // password delete in result user interface per show nahi krna hai is k liye ye use hota hai is mein
  delete result.password;

  // Login successfully
  return NextResponse.json({
    success: true,
    message: "Login SuccessFully",
    result: result,
  });
}
