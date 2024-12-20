import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  userId: { type: String, required: true },
  productList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default model("Cart", CartSchema);
