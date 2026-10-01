import Admin from "@/lib/adminModel";
import cloudinary from "@/lib/cloudinary";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);

    // cookies se session token
    const cookiesStore = await cookies();

    const sessionToken = cookiesStore.get("adminSession")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        {
          succcess: false,
          message: "Admin not authenticated",
        },
        { status: 401 },
      );
    }

    // Session token se admin find karna
    const admin = await Admin.findOne({
      sessionToken,
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid session",
        },
        { status: 401 },
      );
    }

    // form data lena
    const formData = await request.formData();

    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        { status: 400 },
      );
    }

    // file ko buuffer mein convert krna main work
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cloudinary upload
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "restaurant/admin",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      uploadStream.end(buffer);
    });

    // mongoDB mein image URL save
    admin.image = result.secure_url;
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Profile image uploaded successfully",
      image: admin.image,
    });
  } catch (error) {
    console.log("ADMIN PROFILE IMAGE ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
