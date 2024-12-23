import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: false },
});

export default model("Product", ProductSchema);
