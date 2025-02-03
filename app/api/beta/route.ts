import { NextResponse } from "next/server";
import { ServerClient } from "postmark";

import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import generateNotificationBeta from "@/data/emails/generateNotificationBeta";
import generateConfirmationEmailBeta from "@/data/emails/generateConfirmationEmailBeta";
import { auth } from "@clerk/nextjs/server";

const postmarkClient = new ServerClient(process.env.POSTMARK_API_TOKEN!);

export async function POST(request: Request) {
	try {
		const {
			email,
			name,
			country,
			aviation_experience,
			current_roles,
			discord,
			terms_accepted,
			beta_policy_accepted,
		} = await request.json();

		// Validate required fields
		if (
			!email ||
			!name ||
			!country ||
			!aviation_experience ||
			!current_roles ||
			!terms_accepted ||
			!beta_policy_accepted
		) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		if (!process.env.POSTMARK_API_TOKEN) {
			throw new Error("POSTMARK_API_TOKEN is not configured");
		}

		const { userId } = await auth();

		const supabase = await createClerkSupabaseClientSsr();

		// Insert into Supabase
		const { data, error } = await supabase
			.from("beta_applications")
			.insert([
				{
					user_id: userId,
					email,
					name,
					country,
					aviation_experience,
					current_roles,
					discord,
					terms_accepted,
					beta_policy_accepted,
				},
			])
			.select();

		if (error) throw error;

		// Send confirmation email to user
		await postmarkClient.sendEmail({
			From: '"R&D | AviatorJonah" <hello@aviatorjonah.com>',
			To: email,
			Subject: "Application Status Update",
			HtmlBody: generateConfirmationEmailBeta(name),
			TextBody: `Hello ${name},

Thank you for signing up to be a beta tester for CoPilot x AviatorJonah! Soon, you will be able to join us in shaping the future of aviation.

Important Details:
- Applications are open until February 7th, 2025
- Our team will begin reviewing applications after the deadline
- Selected beta testers will receive exclusive early access
- Direct feedback channel to our development team

For now, you can read our weekly updates from our R&D Team at https://aviatorjonah.com/updates to stay up-to-date!

Get ready to experience aviation technology like never before. Your insights will be invaluable in perfecting CoPilot for the entire aviation community.

With regards,
Jonah N H
Founder & CFI

Need help? Contact us at support@avjco.org`,
		});

		// Send notification email
		await postmarkClient.sendEmail({
			From: '"CoPilot Beta System" <hello@aviatorjonah.com>',
			To: "jonah@avjco.org",
			Subject: `New Beta Application: ${name}`,
			HtmlBody: generateNotificationBeta({
				name,
				email,
				country,
				aviation_experience,
				current_roles,
				discord,
			}),
			TextBody: `New beta application received from ${name} (${email}).

Country: ${country}
Aviation Experience: ${aviation_experience}
Current Roles: ${current_roles}${discord ? "\nDiscord: " + discord : ""}`,
		});

		return NextResponse.json({ success: true, data });
	} catch (error) {
		console.error("Detailed error:", error);
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
