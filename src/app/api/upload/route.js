import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  try {
    // Check missing environment variables
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json(
        { success: false, error: ".env.local file mein Cloudinary keys missing hain!" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Koi file select nahi hui." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Data, {
      folder: "basilico_uploads",
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary Error Detail:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Cloudinary Upload Server Error" },
      { status: 500 }
    );
  }
}