import { connectionStr } from "@/lib/db";
import { Settings } from "@/lib/settingsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(connectionStr);
  }
};

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    let settings = await Settings.findOne();

    if (settings) {
      settings = await Settings.findByIdAndUpdate(settings._id, body, {
        new: true,
      });
    } else {
      settings = await Settings.create(body);
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully!",
      settings,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
