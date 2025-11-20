import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    cartItems: { type: Object, default: {} },
  },
  { minimize: true }
);

const User = mongoose.model.user || mongoose.model("user", UserSchema);
export default User;
