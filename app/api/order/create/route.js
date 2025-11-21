import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import Address from "@/models/Address";
import connectDB from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = await auth();
    const { addressId, items } = await request.json();

    if (!addressId || !items || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid Data" });
    }

    await connectDB();

    const address = await Address.findById(addressId);
    if (!address) {
      return NextResponse.json({
        success: false,
        message: "Address not found",
      });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        amount += product.offerPrice * item.quantity;
      }
    }

    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items,
        amount: amount + Math.floor(amount * 0.02), // 2% Tax
        date: Date.now(),
      },
    });

    // Clear user cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Order Placed successfully",
    });
  } catch (error) {
    console.log("Error in creating order:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
