import { NextResponse } from "next/server";

const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN;

export async function POST(request: Request) {
	try {
		const { status, details, timestamp } = await request.json();

		const response = await fetch("https://api.postmarkapp.com/email", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-Postmark-Server-Token": POSTMARK_API_TOKEN!,
			},
			body: JSON.stringify({
				From: "notification@avjco.org",
				To: "outage@avjco.org",
				Subject: `[${status.toUpperCase()}] AviatorJonah Performance Alert`,
				HtmlBody: `
          <h1>Performance Alert</h1>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Time:</strong> ${timestamp}</p>
          <p><strong>Details:</strong> ${details}</p>
          <hr>
          <p>This is an automated message from the AviatorJonah monitoring system.</p>
        `,
				MessageStream: "outbound",
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to send email");
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error sending notification:", error);
		return NextResponse.json(
			{ error: "Failed to send notification" },
			{ status: 500 },
		);
	}
}
