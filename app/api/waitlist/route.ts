import { subscribeHtmlContent } from "@/lib/email-data/subscribeHtmlContent";
import { type NextRequest, NextResponse } from "next/server";
import { ServerClient } from "postmark";

const listId = "ae7a54a6c7"; // Your Mailchimp Audience ID
const serverPrefix = "us9"; // Updated to match your actual Mailchimp datacenter

export async function POST(req: NextRequest) {
	try {
		// Check required environment variables
		if (!process.env.MAILCHIMP_API_KEY || !process.env.POSTMARK_API_TOKEN) {
			throw new Error("Missing required environment variables");
		}

		const { email, name }: { email: string; name: string } = await req.json();

		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			console.error("Invalid email address.");
			return NextResponse.json(
				{ message: "Invalid email address." },
				{ status: 400 },
			);
		}

		// Add to Mailchimp first
		const mailchimpResponse = await fetch(
			`https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/`,
			{
				method: "POST",
				headers: {
					Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email_address: email,
					status: "subscribed",
					merge_fields: {
						FNAME: name,
					},
				}),
			},
		);

		const mailchimpData = await mailchimpResponse.json();

		// Check if Mailchimp subscription was successful
		if (!mailchimpResponse.ok) {
			throw new Error(`Mailchimp error: ${JSON.stringify(mailchimpData)}`);
		}

		// Create the client
		const client = new ServerClient(process.env.POSTMARK_API_TOKEN || "");

		// Send confirmation email via Postmark
		await client.sendEmail({
			From: "welcome@aviatorjonah.com",
			To: email,
			Subject: "Welcome to the AviatorJonah Newsletter!",
			HtmlBody: subscribeHtmlContent,
			TextBody:
				"Thank you for subscribing to the AviatorJonah newsletter! We are excited to have you on board.",
			MessageStream: "broadcast",
		});

		return NextResponse.json(
			{ message: "Successfully subscribed and confirmation email sent!" },
			{ status: 200 },
		);
	} catch (e) {
		const error = e as Error;
		console.error("Error during subscription process:", error);

		// More specific error handling
		if (error.message.includes("Mailchimp")) {
			return NextResponse.json(
				{ message: "Failed to add to mailing list", error: error.message },
				{ status: 400 },
			);
		}

		if (error.message === "Missing required environment variables") {
			return NextResponse.json(
				{ message: "Server configuration error", error: error.message },
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{ message: "An unexpected error occurred", error: error.message },
			{ status: 500 },
		);
	}
}
