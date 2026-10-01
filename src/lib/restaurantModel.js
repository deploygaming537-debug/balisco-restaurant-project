import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
  address: String,
  contact: String,
  password: String,
  image: String

})

export const restaurantSchema = mongoose.models.restaurant || mongoose.model("restaurant", restaurantModel);
