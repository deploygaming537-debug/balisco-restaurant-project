import { connectionStr } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "Get Api working"
    })
}

export async function PUT(request){
    try {
        const {email, oldPassword, newPassword} = await request.json();
        if (!email || !oldPassword || !newPassword) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            });
        }

        await mongoose.connect(connectionStr);

        const restaurant = await restaurantSchema.findOne({email});

        if (!restaurant) {
            return NextResponse.json({
                success : false,
                message: "Restaurant not found"
            })
        }

        // check old password
        if (restaurant.password !== oldPassword) {
            return NextResponse.json({
                success : false,
                message: "Current password is incorrect",
            });
        }

        // new password save 
        restaurant.password = newPassword;
        await restaurant.save();

        return NextResponse.json({
            success : true,
            message : "Password change successfully",
        });

    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })

    }
}