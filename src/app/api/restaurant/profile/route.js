import { connectionStr } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

    export async function GET() {
        return NextResponse.json({
            message:"Get Api Working"
        })
    }



export async function PUT(request) {
  try {
    const {
      email,
      name,
      city,
      address,
      contact,
      image,
    } = await request.json();

    if (!email || !name || !city || !address || !contact) {
      return NextResponse.json({
        success: false,
        message: "All fields required",
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

    // Profile information update
    restaurant.name = name;
    restaurant.city = city;
    restaurant.address = address;
    restaurant.contact = contact;

    // Profile image update
    if (image) {
      restaurant.image = image;
    }

    await restaurant.save();

    return NextResponse.json({
      success: true,
      message: "Profile Updated Successfully",

      result: {
        name: restaurant.name,
        email: restaurant.email,
        city: restaurant.city,
        address: restaurant.address,
        contact: restaurant.contact,
        image: restaurant.image, // Image bhi return karo
      },
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}