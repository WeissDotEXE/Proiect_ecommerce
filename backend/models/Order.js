import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  buyerName: { type: String, required: true },
  productList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  total: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default model("Order", OrderSchema);
