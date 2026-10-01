import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, default: "My Restaurant" },
    phone: { type: String, default: "0300-1234567" },
    email: { type: String, default: "admin@restaurant.com" },
    address: { type: String, default: "Main Boulevard, Gulberg, Lahore" },
    isOpen: { type: Boolean, default: true },

    // Main Restaurant Timings
    openingTime: { type: String, default: "11:00 AM" },
    closingTime: { type: String, default: "11:00 PM" },

    // 2 Nayi Fields (Breakfast & Lunch/Dinner)
    breakfastTiming: { type: String, default: "07:00 AM - 11:00 AM" },
    lunchTiming: { type: String, default: "11:00 AM - 11:00 PM" },

    minOrderAmount: { type: Number, default: 500 },
    deliveryFee: { type: Number, default: 150 },
    emailNotifications: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);