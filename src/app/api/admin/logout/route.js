import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const cookiesStore = await cookies();

    cookiesStore.delete("adminSession");

    return NextResponse.json({
      success: true,
      message: "Admin Logout successfully",
    });
  } catch (error) {
    console.log("ADMIN LOGOUT ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
      },
      { status: 500 },
    );
  }
}
