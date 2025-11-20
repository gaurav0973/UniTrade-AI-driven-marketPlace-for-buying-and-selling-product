import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  pincode: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

// Force recompilation of the model to update schema
if (mongoose.models.Address) {
  delete mongoose.models.Address;
}
const Address = mongoose.model("Address", addressSchema);

export default Address;
