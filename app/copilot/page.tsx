import HeaderProvider from "@/components/header-provider";
import BetaAccess, {
	LoadingStateBetaAccess,
} from "@/components/copilot/beta-access";
import Footer from "@/components/footer";
import { Plane, CloudSun, BookOpen, Clock, BarChart, Map } from "lucide-react";
import { Suspense } from "react";

const features = [
	{
		icon: BookOpen,
		title: "Electronic Logbook",
		description:
			"Effortlessly track your flight hours, aircraft types, and certifications. Automatically calculate your currency requirements and receive notifications when important dates approach.",
	},
	{
		icon: Map,
		title: "Route Planning",
		description:
			"Plan your flights with precision using our intuitive route planner. Access airport information, calculate fuel requirements, and generate detailed navigation logs for your journeys.",
	},
	{
		icon: CloudSun,
		title: "Weather Analysis",
		description:
			"Make informed decisions with comprehensive weather briefings. Access METARs, TAFs, radar imagery, and wind patterns all in one place for safer flight planning.",
	},
	{
		icon: Clock,
		title: "Currency Tracking",
		description:
			"Stay current and compliant with automatic tracking of your pilot privileges. Monitor IFR currency, medical certification, flight reviews, and passenger carrying requirements.",
	},
	{
		icon: BarChart,
		title: "Performance Analytics",
		description:
			"Gain insights into your flying patterns with detailed analytics. Track your progress, analyze your flight hours distribution, and identify areas for professional development.",
	},
	{
		icon: Plane,
		title: "Aircraft Management",
		description:
			"Keep track of multiple aircraft profiles, maintenance schedules, and equipment requirements. Access weight & balance calculations and performance data instantly.",
	},
];
export default async function CoPilotLandingPage() {
	return (
		<>
			<HeaderProvider />
			<div className="flex flex-col min-h-[50vh] bg-slate-900 text-white">
				<main className="flex-grow">
					<section className="relative min-h-screen flex items-center">
						<div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-4xl mx-auto pt-32 pb-16 sm:pt-40 sm:pb-20 animate-fade-in-up">
								<div className="flex flex-col items-center justify-center mb-16 sm:mb-20">
									<div className="flex items-baseline space-x-3 mb-3">
										<span className="text-xl font-bold text-white">
											CoPilot
										</span>
										<span className="text-blue-400">×</span>
										<span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 text-transparent bg-clip-text">
											AviatorJonah
										</span>
									</div>
									<span className="text-blue-400 font-medium">Coming 2025</span>
								</div>

								<div className="text-center">
									<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
										Your Digital
										<br />
										<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300">
											Flight Companion
										</span>
									</h1>

									<p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto mb-12">
										From flight planning to logbook management, everything you
										need in one place.
									</p>
									<Suspense fallback={<LoadingStateBetaAccess />}>
										<BetaAccess />
									</Suspense>
								</div>
							</div>
						</div>
					</section>
					<section className="relative py-24 md:py-32 overflow-hidden">
						{/* Decorative Elements */}
						<div className="absolute inset-0">
							<div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
							<div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl" />
						</div>

						<div className="relative max-w-6xl mx-auto px-4 sm:px-6">
							{/* Section Header */}
							<div className="text-center mb-16 md:mb-20">
								<div className="flex justify-center mb-6">
									<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
								</div>
								<h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white mb-6 animate-fade-in">
									Your Complete Aviation Companion
								</h2>
								<p className="text-xl text-slate-300 max-w-2xl mx-auto animate-fade-in-delay-1">
									Transform your flying experience with CoPilot&apos;s
									comprehensive suite of tools designed for modern pilots. From
									flight planning to logbook management, we&apos;ve got you
									covered.
								</p>
							</div>

							{/* Features Grid */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								{features.map((feature, index) => (
									<div
										key={index}
										className={`group relative animate-feature-card-${index + 1}`}
									>
										<div className="relative z-10 bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 h-full transition-all duration-300 group-hover:bg-slate-800/90 group-hover:shadow-lg group-hover:shadow-blue-500/10">
											{/* Icon Container */}
											<div className="mb-6 inline-flex p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl">
												<feature.icon className="w-8 h-8 text-blue-400" />
											</div>

											{/* Content */}
											<h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
												{feature.title}
											</h3>
											<p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
												{feature.description}
											</p>
										</div>

										{/* Hover Effect Background */}
										<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />
									</div>
								))}
							</div>
						</div>
					</section>
				</main>
			</div>
			<Footer />
		</>
	);
}
