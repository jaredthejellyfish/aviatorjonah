import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import stripe from "@/utils/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { SelectedCourseSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const user = await currentUser();

  const body = await req.json();

  const parsedCourse = SelectedCourseSchema.safeParse(body);

  if (!parsedCourse.success) {
    return NextResponse.json(
      { error: "Missing required course information", cause: parsedCourse.error },
      { status: 400 }
    );
  }

  const {
    price,
    title,
    description,
    image: images,
    slug: courseSlug,
  } = parsedCourse.data;

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
              images: images ? [images] : [], // Add images if you have them
            },
            unit_amount: Math.round(price * 100), // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${headersList.get(
        "origin"
      )}/courses/enroll/${courseSlug}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: user?.emailAddresses[0]?.emailAddress,
      cancel_url: `${headersList.get(
        "origin"
      )}/courses/enroll/${courseSlug}/error`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
