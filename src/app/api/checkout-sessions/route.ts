import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import stripe from "@/utils/stripe";

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const { courseId, price, title, description, images, courseSlug } =
    await req.json();

  if (!courseId || !price || !title || !description || !courseSlug) {
    return NextResponse.json(
      { error: "Missing required course information" },
      { status: 400 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", // Assuming USD, adjust if necessary
            product_data: {
              name: title,
              description: description,
              images: [...images], // Add images if you have them
            },
            unit_amount: Math.round(price * 100), // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${headersList.get("origin")}/courses/enroll/${courseSlug}/thank-you?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${headersList.get("origin")}/courses/enroll/${courseSlug}/error`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 },
    );
  }
}
