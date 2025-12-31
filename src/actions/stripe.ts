"use server";

import { stripe } from "@/lib/stripe";
import { createSupabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function createTipCheckout(postId: number, amount: number = 500) {
    const supabase = createSupabaseServer();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.error("Auth error:", error);
        throw new Error("Unauthorized");
    }

    try {
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
            metadata: {
                post_id: postId.toString(),
                tipper_user_id: user.id,
            },
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/timeline?tip_success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/timeline?tip_cancel=true`,
        });

        redirect(session.url!);
    } catch (err) {
        console.error("Stripe error:", err);
        throw new Error("Checkout failed");
    }
}