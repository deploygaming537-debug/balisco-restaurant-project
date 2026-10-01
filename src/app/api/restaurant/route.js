import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantModel";

export async function GET() {
  await mongoose.connect(connectionStr);
  return NextResponse.json({ result: true });
}
// End method

export async function POST(request) {
  try {
    const payload = await request.json();

    console.log("Restaurant Payload:", payload);

    if (!payload.name || !payload.email || !payload.password) {
      return NextResponse.json({
        success: false,
        message: "Required restaurant fields are missing",
      });
    }

    await mongoose.connect(connectionStr);

    const existingRestaurant = await restaurantSchema.findOne({
      email: payload.email.toLowerCase(),
    });

    if (existingRestaurant) {
      return NextResponse.json({
        success: false,
        message: "Account already exists with this email",
      });
    }

    const restaurant = new restaurantSchema(payload);

    const result = await restaurant.save();

    return NextResponse.json({
      success: true,
      message: "Account Create Successfully",
      result,
    });
  } catch (error) {
    console.log("RESTAURANT API ERROR:", error);

    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}



