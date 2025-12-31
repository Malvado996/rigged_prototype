"use client";

import { loadStripe } from "@stripe/stripe-js";

// Make sure the env var is defined in .env.local
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export async function initiateTip(postId: number, amount: number = 500) {
    const response = await fetch("/api/create-tip-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, amount }),
    });

    const { clientSecret } = await response.json();  // ← Get clientSecret instead of sessionId

    if (!clientSecret) {
        alert("Failed to create checkout session");
        return;
    }

    const stripe = await stripePromise;

    if (!stripe) {
        alert("Stripe failed to load");
        return;
    }

    // New way — use confirmCardPayment or redirect with clientSecret
    const { error } = await stripe.redirectToCheckout({
        clientSecret,
    });

    if (error) {
        alert(error.message);
    }
}