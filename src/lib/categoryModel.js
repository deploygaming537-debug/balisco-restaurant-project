import mongoose from "mongoose";

const categoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const categorySchema =
  mongoose.models.categories ||
  mongoose.model("categories", categoryModel);