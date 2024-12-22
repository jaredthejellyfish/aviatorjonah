"use client";

import { loadStripe } from "@stripe/stripe-js";
import { ArrowRight } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SelectedCourseSchema } from "@/lib/schemas";

type Props = {
  selectedCourse: {
    id: string;
    price: number;
    title: string;
    description: string;
    image: string;
    slug: string;
  };
  enrolled: boolean;
  isAuthenticated: boolean;
  buttonStyles: string;
  buttonText?: string;
};

function PaymentClient({
  selectedCourse,
  enrolled,
  isAuthenticated,
  buttonStyles,
  buttonText,
}: Props) {
  const parsedCourse = SelectedCourseSchema.safeParse(selectedCourse);

  if (!parsedCourse.success) {
    return <div>Course not found</div>;
  }

  const redirectToCheckout = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );

      if (!stripe) throw new Error("Stripe failed to initialize.");

      const checkoutResponse = await fetch("/api/checkout-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          price: selectedCourse.price,
          title: selectedCourse.title,
          description: selectedCourse.description,
          images: [selectedCourse.image],
          slug: selectedCourse.slug,
        }),
      });

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Link href={`/auth/login?return=/courses/view/${selectedCourse.slug}`}>
        <Button className={cn("mb-4 w-full", buttonStyles)}>{"hi"}</Button>
      </Link>
    );
  }

  return enrolled ? (
    <Button size="lg" className={cn("mb-4 w-full", buttonStyles)} asChild>
      <Link href={`/course/${selectedCourse.slug}`}>Go to Course</Link>
    </Button>
  ) : (
    <Button
      size="lg"
      className={cn("mb-4 w-full", buttonStyles)}
      onClick={redirectToCheckout}
    >
      {buttonText ?? "Enroll Now"}
      <ArrowRight className="ml-2 h-5 w-5 mb-0.5" />
    </Button>
  );
}

export default PaymentClient;
