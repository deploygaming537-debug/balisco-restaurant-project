import { categorySchema } from "@/lib/categoryModel";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await mongoose.connect(connectionStr);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const category = await categorySchema.findById(id);

      if (!category) {
        return NextResponse.json({
          success: false,
          message: "Category not found",
        });
      }

      return NextResponse.json({
        success: true,
        result: category,
      });
    }

    const categories = await categorySchema.find();

    return NextResponse.json({
      success: true,
      result: categories,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
// End method

export async function POST(request) {
  try {
    const { name, image } = await request.json();

    if (!name) {
      return NextResponse.json({
        success: false,
        message: "Category name is required",
      });
    }

    await mongoose.connect(connectionStr);

    const existCategory = await categorySchema.findOne({
      name: name,
    });

    if (existCategory) {
      return NextResponse.json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new categorySchema({
      name: name,
      image: image || "",
    });

    const result = await category.save();

    return NextResponse.json({
      success: true,
      message: "Category added successfully",
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
// End method

// PUT method

export async function PUT(request) {
  try {
    const { id, name } = await request.json();

    if (!id || !name || !name.trim()) {
      return NextResponse.json({
        success: false,
        message: "Category ID and name are required",
      });
    }

    await mongoose.connect(connectionStr);

    const category = await categorySchema.findById(id);
    if (!category) {
      return NextResponse.json({
        success: false,
        message: "Category not found",
      });
    }

    const existCategory = await categorySchema.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });

    if (existCategory) {
      return NextResponse.json({
        success: false,
        message: "Category already exists",
      });
    }

    category.name = name.trim();

    const result = await category.save();
    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
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

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Category ID is required",
      });
    }

    await mongoose.connect(connectionStr);

    const category = await categorySchema.findById(id);
    if (!category) {
      return NextResponse.json({
        success: false,
        message: "Category not found",
      });
    }

    await categorySchema.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
