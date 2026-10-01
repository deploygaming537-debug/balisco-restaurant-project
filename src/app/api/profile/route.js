import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.formData();

    const file = data.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "Profile image is required",
      });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({
        success: false,
        message: "Please select an image file",
      });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({
        success: false,
        message: "Image size must be less than 5MB",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "restaurant/profile",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      message: "Profile image uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
  console.log("Cloudinary Upload Error:", error);

  return NextResponse.json(
    {
      success: false,
      message: error.message || "Profile image upload failed",
    },
    {
      status: 500,
    }
  );
}
}
