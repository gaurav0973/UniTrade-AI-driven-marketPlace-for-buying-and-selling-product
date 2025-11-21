import connectDB from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = await auth();
    await connectDB();

    const orders = await Order.find({ userId }).populate("items.product");

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
