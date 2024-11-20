import { auth } from "@/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});

const PLAN_PRICES = {
  price_starter: "price_1QN7pZL14OIVwNjUYL2eyUvX",
  price_professional: "price_1QN7pwL14OIVwNjUe57fgtzG",
  price_enterprise: "price_enterprise123",
};

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId } = await req.json();
    console.log({ priceId });
    const stripePriceId = PLAN_PRICES[priceId as keyof typeof PLAN_PRICES];

    if (!stripePriceId) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      customer_email: session.user.email,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Error creating payment" },
      { status: 500 },
    );
  }
}
