import { stripe } from "../../../lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { postId, amount } = await request.json();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Tip for Rigged Creator",
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/timeline?tip_success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/timeline?tip_cancel=true`,
        metadata: {
            post_id: postId.toString(),
        },
    });

    return NextResponse.json({ sessionId: session.id });
}