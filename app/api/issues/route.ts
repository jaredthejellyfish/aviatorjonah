import { NextResponse } from "next/server";
import { ServerClient } from "postmark";

import { auth } from "@clerk/nextjs/server";
import generateConfirmationEmailIssue from "@/data/emails/generateConfirmationEmailIssue";
import { generateNotificationIssue } from "@/data/emails/generateNotificationIssue";

const postmarkClient = new ServerClient(process.env.POSTMARK_API_TOKEN!);

export async function POST(request: Request) {
	try {
		const { email, name, issueCategory, details } = await request.json();

		// Validate required fields
		if (!email || !name || !issueCategory || !details) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		if (!process.env.POSTMARK_API_TOKEN) {
			throw new Error("POSTMARK_API_TOKEN is not configured");
		}

		const { userId } = await auth();
		if (!userId) {
			throw new Error("User ID is not authenticated");
		}

		// Send confirmation email to user
		await postmarkClient.sendEmail({
			From: '"R&D | AviatorJonah" <hello@aviatorjonah.com>',
			To: email,
			Subject: "Issue Report Submitted",
			HtmlBody: generateConfirmationEmailIssue(name, details),
			TextBody: `Hello ${name},

Thank you for submitting an issue report to AviatorJonah! We will get back to you as soon as possible.

Important Details:
- Issue Category: ${issueCategory}
- Details: ${details}

With regards,
Jonah N H
Founder & CFI

Need help? Contact us at support@avjco.org`,
		});

		// Send notification email
		await postmarkClient.sendEmail({
			From: '"AviatorJonah" <hello@aviatorjonah.com>',
			To: "jonah@avjco.org",
			Subject: `New Issue Report: ${name}`,
			HtmlBody: generateNotificationIssue(name, email, details, issueCategory),
			TextBody: `New issue report received from ${name} (${email}).

Issue Summary: ${details}
Details: ${details}`,
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Detailed error:", error);
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
