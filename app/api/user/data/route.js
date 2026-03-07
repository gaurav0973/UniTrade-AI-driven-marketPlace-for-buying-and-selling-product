import connectDB from "@/config/db";
import User from "@/models/User";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Not authenticated",
      });
    }

    await connectDB();
    let user = await User.findById(userId);
    if (!user) {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);
      user = await User.create({
        _id: userId,
        name: (
          (clerkUser.firstName || "") +
          " " +
          (clerkUser.lastName || "")
        ).trim(),
        email: clerkUser.emailAddresses[0].emailAddress,
        imageUrl: clerkUser.imageUrl,
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
