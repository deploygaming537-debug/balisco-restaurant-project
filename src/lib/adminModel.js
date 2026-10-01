import mongoose from "mongoose";

const adminModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Manager"],
      default: "Admin",
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    sessionToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);



const Admin = mongoose.models.admin || mongoose.model("admin", adminModel)
export default Admin; 