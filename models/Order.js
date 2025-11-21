import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  items: [
    {
      product: { type: String, required: true, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "order placed" },
  date: { type: Number, required: true },
});

// Force recompilation of the model to update schema
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}
const Order = mongoose.model("Order", orderSchema);
export default Order;
