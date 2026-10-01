import { connectionStr } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Delete Api",
  });
}

export async function DELETE(resquest) {
  try {
    const { email, password } = await resquest.json();

    // check fields
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password are required",
      });
    }

    await mongoose.connect(connectionStr);

    const restaurant = await restaurantSchema.findOne({ email });

    if (!restaurant) {
      return NextResponse.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if (restaurant.password !== password) {
      return NextResponse.json({
        success: false,
        message: "Password is incorrect!",
      });
    }

    // account delete
    await restaurantSchema.deleteOne({ email });

    // for success
    return NextResponse.json({
      success: true,
      message: "Account Delete Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
