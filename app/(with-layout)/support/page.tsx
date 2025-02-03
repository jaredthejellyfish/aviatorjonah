import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	MessageSquare,
	Mail,
	Phone,
	Clock,
	ChevronRight,
	ArrowRight,
} from "lucide-react";

const SupportPage = () => {
	return (
		<div className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
			{/* Animated Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/20 mt-16" />
			<div className="absolute inset-0 mt-16">
				<div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
				<div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
				<div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
			</div>

			{/* Content Container */}
			<div className="relative">
				{/* Hero Section */}
				<div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
					<div className="max-w-4xl mx-auto px-4">
						<div className="text-center">
							<h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
								How can we help you?
							</h1>
							<p className="text-slate-100 text-xl mb-12 max-w-2xl mx-auto">
								Get the support you need with our dedicated team of experts
							</p>
							<div className="relative max-w-2xl mx-auto">
								<Input
									placeholder="Search for help..."
									className="w-full bg-slate-800/70 backdrop-blur-sm border-slate-700/50 text-slate-100 pl-6 pr-12 py-7 rounded-xl shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400"
								/>
								<Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-lg">
									<ChevronRight className="h-5 w-5" />
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Popular Articles */}
				<div className="max-w-4xl mx-auto px-4 py-16">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 mb-4">
							Popular Articles
						</h2>
						<p className="text-slate-200">Quick answers to common questions</p>
					</div>

					<div className="grid lg:grid-cols-3 gap-8 mb-20">
						<article className="col-span-3 group hover:bg-slate-800/70 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
							<div className="p-8 flex flex-col md:flex-row gap-6 items-start">
								<div className="p-3 rounded-xl bg-emerald-500/10 shrink-0">
									<MessageSquare className="h-6 w-6 text-emerald-400" />
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">
										Getting Started Guide
									</h3>
									<p className="text-slate-200 mb-4 leading-relaxed">
										Learn the basics of setting up your account and navigating
										our platform. This comprehensive guide covers everything
										from initial setup to advanced features.
									</p>
									<Button
										variant="link"
										className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
									>
										Read Full Guide{" "}
										<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
									</Button>
								</div>
							</div>
						</article>

						<article className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
							<div className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2 rounded-lg bg-purple-500/10">
										<Mail className="h-5 w-5 text-purple-400" />
									</div>
									<h3 className="font-medium">Troubleshooting FAQ</h3>
								</div>
								<p className="text-slate-200 mb-4">
									Common issues and their solutions to help you resolve problems
									quickly.
								</p>
								<Button
									variant="link"
									className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
								>
									View Solutions{" "}
									<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
								</Button>
							</div>
						</article>

						<article className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
							<div className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2 rounded-lg bg-amber-500/10">
										<Clock className="h-5 w-5 text-amber-400" />
									</div>
									<h3 className="font-medium">Best Practices</h3>
								</div>
								<p className="text-slate-200 mb-4">
									Tips and recommendations for getting the most out of our
									services.
								</p>
								<Button
									variant="link"
									className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
								>
									Learn More{" "}
									<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
								</Button>
							</div>
						</article>

						<article className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
							<div className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2 rounded-lg bg-rose-500/10">
										<Phone className="h-5 w-5 text-rose-400" />
									</div>
									<h3 className="font-medium">Security Guidelines</h3>
								</div>
								<p className="text-slate-200 mb-4">
									Important information about keeping your account and data
									secure.
								</p>
								<Button
									variant="link"
									className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
								>
									Read Guidelines{" "}
									<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
								</Button>
							</div>
						</article>
					</div>
				</div>

				{/* Support Options */}
				<div className="max-w-4xl mx-auto px-4 py-20">
					<div className="grid md:grid-cols-2 gap-8">
						<Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
							<CardHeader>
								<div className="flex items-center gap-3">
									<div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
										<MessageSquare className="h-6 w-6 text-blue-400" />
									</div>
									<div>
										<CardTitle className="text-xl">Live Chat Support</CardTitle>
										<CardDescription className="text-slate-200">
											Connect with our team instantly
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-slate-100 mb-6 group-hover:text-slate-200 transition-all duration-300">
									Available 24/7 for immediate assistance with your questions.
									Our experts are ready to help.
								</p>
								<Button className="w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 group-hover:translate-y-[-2px]">
									<span>Start Chat</span>
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>

						<Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
							<CardHeader>
								<div className="flex items-center gap-3">
									<div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
										<Mail className="h-6 w-6 text-blue-400" />
									</div>
									<div>
										<CardTitle className="text-xl">Email Support</CardTitle>
										<CardDescription className="text-slate-200">
											Get detailed responses
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-slate-100 mb-6 group-hover:text-slate-200 transition-all duration-300">
									Send us your questions and receive a comprehensive response
									within 24 hours.
								</p>
								<Button className="w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 group-hover:translate-y-[-2px]">
									<span>Send Email</span>
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>

						<Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
							<CardHeader>
								<div className="flex items-center gap-3">
									<div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
										<Phone className="h-6 w-6 text-blue-400" />
									</div>
									<div>
										<CardTitle className="text-xl">Phone Support</CardTitle>
										<CardDescription className="text-slate-200">
											Talk to our experts
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-slate-100 mb-6 group-hover:text-slate-200 transition-all duration-300">
									Call us directly for complex issues requiring immediate
									attention and guidance.
								</p>
								<Button className="w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 group-hover:translate-y-[-2px]">
									<span>Call Now</span>
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>

						<Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
							<CardHeader>
								<div className="flex items-center gap-3">
									<div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
										<Clock className="h-6 w-6 text-blue-400" />
									</div>
									<div>
										<CardTitle className="text-xl">Support Hours</CardTitle>
										<CardDescription className="text-slate-200">
											When to reach us
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-3 text-slate-100">
									<div className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30 group-hover:bg-slate-700/50 transition-all duration-300">
										<span>Monday - Friday</span>
										<span className="text-blue-400">9AM - 8PM EST</span>
									</div>
									<div className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30 group-hover:bg-slate-700/50 transition-all duration-300">
										<span>Saturday</span>
										<span className="text-blue-400">10AM - 6PM EST</span>
									</div>
									<div className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30 group-hover:bg-slate-700/50 transition-all duration-300">
										<span>Sunday</span>
										<span className="text-blue-400">12PM - 5PM EST</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SupportPage;
