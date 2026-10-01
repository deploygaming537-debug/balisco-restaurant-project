import { connectionStr } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Reset api working",
  });
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password are required",
      });
    }

    await mongoose.connect(connectionStr);

    const user = await restaurantSchema.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email not found",
      });
    }

    user.password = password;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password Update Successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
