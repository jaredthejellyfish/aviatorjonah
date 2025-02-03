import { GeoLocation } from "@/components/copilot/home/Heading";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
export async function GET(request: NextRequest) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const searchParams = request.nextUrl.searchParams;
	const ip = searchParams.get("ip");

	const response = await fetch(`http://reallyfreegeoip.org/json/${ip}`, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const locationData = (await response.json()) as GeoLocation;
	return NextResponse.json(locationData);
}
