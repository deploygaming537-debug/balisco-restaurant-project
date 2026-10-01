import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Customer detail
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    // Food order items
    items: [
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
        category: String,
        image: String,
      },
    ],

    // Complete order total
    total: {
      type: Number,
      required: true,
    },

    // Order status (Sabhi dropdown values add kar di gayi hain)
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Preparing", "Delivered", "Cancelled"],
      default: "Pending",
    },

    // Order number
    orderNumber: {
      type: Number,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;