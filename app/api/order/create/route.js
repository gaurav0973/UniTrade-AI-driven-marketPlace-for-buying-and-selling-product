import Product from "@/models/Product";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {

        const {userId} = await auth()
        const { address, items } = await request.json();

        if(!address || !items || items.length === 0){
            return NextResponse.json({success : false, message : "Invalid Data"})
        }

        // calculate total amount
        const amount = items.reduce(async(acc, item) => {
            const product = await Product.findById(item.productId);
            return acc + (product.offerPrice * item.quantity);
        }, 0)

        await inngest.send({
            name : "order/created",
            data : {
                userId,
                address,
                items,
                amount : amount + Math.floor(amount*0.2),
                date : Date.now()
            }

        })


        // clear user cart 
        const user = await User.findById(userId)
        user.cartItems = {}
        await user.save()

        return NextResponse.json({success : true, message : "Order Placed successfully"})
    } catch (error) {
        console.log("Error in creating order:", error)
        return NextResponse.json({success : false, message : error.message})
    }
}