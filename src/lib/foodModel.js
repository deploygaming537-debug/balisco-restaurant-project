import mongoose from "mongoose";


const foodModel = new mongoose.Schema({
name: String,
price: Number,
category: String,
status: String,
description: String,
image: String,
});

export const foodSchema = mongoose.models.food || mongoose.model("food", foodModel);