import { connectionStr } from "@/lib/db";
import { foodSchema } from "@/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await mongoose.connect(connectionStr);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const food = await foodSchema.findById(id);

      if (!food) {
        return NextResponse.json({
          success: false,
          message: "Food not found ",
        });
      }

      return NextResponse.json({
        success: true,
        result: food,
      });
    }

    const foods = await foodSchema.find();

    return NextResponse.json({
      success: true,
      message: "Food list found successfully",
      result: foods,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// POST Method
export async function POST(request) {
  try {
    //
    const payload = await request.json();

    // required fields data
    if (
      !payload.name ||
      !payload.price ||
      !payload.category ||
      !payload.status ||
      !payload.description
    ) {
      return NextResponse.json({
        success: false,
        message: "All fields required",
      });
    }
    //MongoDB
    await mongoose.connect(connectionStr);

    //New data
    const food = new foodSchema({
      name: payload.name,
      price: payload.price,
      category: payload.category,
      status: payload.status,
      description: payload.description,
      image: payload.image || "",
    });
    const result = await food.save();

    return NextResponse.json({
      success: true,
      message: "Food Added Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// PUT Method

export async function PUT(request) {
  try {
    const { id, name, price, category, description, image, status } =
      await request.json();
    if (!id || !name || !price || !category || !description || !status) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    await mongoose.connect(connectionStr);

    const food = await foodSchema.findById(id);
    if (!food) {
      return NextResponse.json({
        success: false,
        message: "Food not found",
      });
    }

    // food information update
    ((food.name = name),
      (food.price = price),
      (food.category = category),
      (food.description = description),
      (food.status = status));

    // Agar new image mili ho
    if (image) {
      food.image = image;
    }

    await food.save();

    return NextResponse.json({
      success: true,
      message: "Food updated successfully",
      result: food,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Food ID required",
      });
    }

    await mongoose.connect(connectionStr);
    const food = await foodSchema.findById(id);

    if (!food) {
      return NextResponse.json({
        success: false,
        message: "food not found",
      });
    }

    await foodSchema.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Food Deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
