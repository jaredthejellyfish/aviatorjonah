import { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/back-button";

export const metadata: Metadata = {
	title: "Coming Soon | AviatorJonah",
	description: "This feature is coming soon to Your Site.",
};

export default function Page() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center p-4 pt-20">
			<Card className="max-w-3xl w-full bg-gray-900/50 backdrop-blur-lg border-gray-800">
				<CardContent className="p-8 md:p-12">
					<div className="space-y-12">
						<div className="space-y-6 text-center">
							<div className="flex items-center justify-center">
								<div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
									<Clock className="h-4 w-4 mr-2" />
									<span className="text-sm font-medium">Coming Soon</span>
								</div>
							</div>

							<div className="space-y-4">
								<h1 className="text-4xl md:text-5xl font-bold text-gray-50 tracking-tight">
									Something Exciting Is Coming
								</h1>

								<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
									We&apos;re crafting something special for you. Our team is
									working to create an exceptional experience.
								</p>
							</div>

							<div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
								<BackButton />
								<Button
									asChild
									className="bg-blue-600 text-white hover:bg-blue-700 px-8"
								>
									<Link href="/">Return Home</Link>
								</Button>
							</div>
						</div>

						<div className="text-center space-y-4">
							<p className="text-gray-400">
								Want to be the first to know when we launch?
							</p>
							<Button
								asChild
								variant="outline"
								className="border-gray-700 hover:bg-gray-800/50 text-gray-300 hover:text-gray-50"
							>
								<Link href="/updates">Read our updates</Link>
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
