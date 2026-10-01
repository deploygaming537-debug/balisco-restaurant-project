import { NextResponse } from "next/server";

// Global memory storage setup
if (!global.sliderStore) {
  global.sliderStore = {
    // Slider Section Banners
    home_hero_1: "/assets/images/slider/img_slider_1.jpg",
    home_hero_2: "/assets/images/slider/img_slider_12.jpg",

    // Vouchers Page Images[cite: 1]
    voucher_image1: "/assets/images/section/menu2.jpg",
    voucher_icon1: "/assets/images/icon/shopping-bag.png",
    voucher_icon2: "/assets/images/icon/gift-card.png",
    voucher_image2: "/assets/images/section/menu3.jpg",
  };
}

// GET Method - Fetch all slider settings
export async function GET() {
  try {
    return NextResponse.json(
      { 
        success: true, 
        message: "Slider settings fetched successfully",
        data: global.sliderStore 
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch slider settings" 
      },
      { status: 500 }
    );
  }
}

// PUT Method - Update slider image by key
export async function PUT(request) {
  try {
    const body = await request.json();
    const { spotKey, imageUrl } = body;

    // Strict validation with clean English message
    if (!spotKey || !imageUrl) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Please select a placement spot and provide a valid image URL" 
        },
        { status: 400 }
      );
    }

    // Dynamic key update
    global.sliderStore[spotKey] = imageUrl;

    return NextResponse.json(
      {
        success: true,
        message: "Slider banner updated successfully",
        data: global.sliderStore,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { 
        success: false, 
        message: "An error occurred while updating slider banner" 
      },
      { status: 500 }
    );
  }
}

// POST Method Fallback[cite: 1]
export async function POST(request) {
  return PUT(request);
}