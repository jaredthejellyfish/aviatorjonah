// app/(with-layout)/waitlist/page.tsx
import { Metadata } from "next";
import WaitlistForm from "components/waitlist/WaitlistForm";

export const metadata: Metadata = {
	title: "Join the Waitlist | CoPilot",
	description:
		"Be the first to experience CoPilot - Join our exclusive waitlist today.",
};

export default async function WaitlistPage() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 md:pt-32">
			<div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none -z-10" />

			<div className="relative container mx-auto px-4 py-16 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					{/* Header Section */}
					<div className="text-center mb-12">
						<h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-4">
							Join the Future of CoPilot
						</h1>
						<p className="text-lg text-white/60 max-w-2xl mx-auto">
							Be among the first to experience the next generation of AI-powered
							assistance. Join our waitlist and stay updated on our journey.
						</p>
					</div>

					{/* Form Section */}
					<div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 sm:p-8">
						<WaitlistForm />
					</div>

					{/* Features Section */}
					<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
							<h3 className="text-lg font-semibold mb-2">Early Access</h3>
							<p className="text-white/60">
								Be among the first to experience our revolutionary platform.
							</p>
						</div>
						<div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
							<h3 className="text-lg font-semibold mb-2">Exclusive Updates</h3>
							<p className="text-white/60">
								Receive development insights and progress updates directly.
							</p>
						</div>
						<div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
							<h3 className="text-lg font-semibold mb-2">Priority Support</h3>
							<p className="text-white/60">
								Get dedicated support and onboarding when we launch.
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
