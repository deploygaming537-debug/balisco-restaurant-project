import { connectionStr } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Forgot APi Working",
  });
}

//  forgot Api Is API ka kaam sirf email ko check karna hai
export async function POST(request) {
  try {
    // Forgot Password form se email receive karna
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is required",
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

    return NextResponse.json({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
