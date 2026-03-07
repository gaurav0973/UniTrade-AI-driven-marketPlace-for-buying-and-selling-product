import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const event = await req.json();
    await connectDB();

    switch (event.type) {
      case "user.created": {
        const { id, first_name, last_name, email_addresses, image_url } =
          event.data;
        await User.create({
          _id: id,
          name: ((first_name || "") + " " + (last_name || "")).trim(),
          email: email_addresses[0].email_address,
          imageUrl: image_url,
        });
        break;
      }
      case "user.updated": {
        const { id, first_name, last_name, email_addresses, image_url } =
          event.data;
        await User.findByIdAndUpdate(id, {
          name: ((first_name || "") + " " + (last_name || "")).trim(),
          email: email_addresses[0].email_address,
          imageUrl: image_url,
        });
        break;
      }
      case "user.deleted": {
        const { id } = event.data;
        await User.findByIdAndDelete(id);
        break;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
