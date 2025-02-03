import React, { useEffect, useState } from "react";
import { CreditCard, Loader2, Check, Sparkles } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
const PaymentDialog = ({
	isOpen,
	onClose,
	onSubmit,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: Record<string, string>) => void;
}) => {
	const [formData, setFormData] = useState({
		cardNumber: "",
		expiry: "",
		cvc: "",
		name: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
	});

	const addressFields = [
		{ label: "Street Address", name: "address1", placeholder: "123 Main St" },
		{
			label: "Apartment, suite, etc.",
			name: "address2",
			placeholder: "Apt 4B",
			optional: true,
		},
		{ label: "City", name: "city", placeholder: "San Francisco" },
		{ label: "State / Province", name: "state", placeholder: "CA" },
		{ label: "ZIP / Postal Code", name: "zipCode", placeholder: "94105" },
		{ label: "Country", name: "country", placeholder: "United States" },
	];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800 text-white border border-slate-700">
				<DialogHeader className="space-y-3">
					<DialogTitle className="text-xl font-semibold flex items-center gap-2">
						<CreditCard className="h-5 w-5 text-blue-400" />
						Payment Information
					</DialogTitle>

					<div className="flex items-center gap-3 p-4 bg-slate-800/40 rounded-xl border border-slate-600/50 backdrop-blur-sm">
						<span className="text-sm text-slate-300">We Accept</span>
						<div className="flex gap-2">
							{[
								{
									name: "Visa",
									url: "https://code-assets.aviatorjonah.com/VISA-Logo-2006.png",
								},
								{
									name: "Mastercard",
									url: "https://code-assets.aviatorjonah.com/mastercard.png",
								},
								{
									name: "Amex",
									url: "https://code-assets.aviatorjonah.com/amex.png",
								},
								{
									name: "Discover",
									url: "https://code-assets.aviatorjonah.com/Discover.jpg",
								},
							].map((card) => (
								<div
									key={card.name}
									className="flex items-center justify-center bg-white/95 rounded-lg h-8 w-12 p-1 transition-transform hover:scale-105"
								>
									<Image
										src={card.url}
										alt={card.name}
										className="h-4 object-contain"
									/>
								</div>
							))}
						</div>
					</div>
				</DialogHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit(formData);
					}}
					className="space-y-6"
				>
					<div className="space-y-6">
						{/* Card Information Section */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold text-white">
								Card Information
							</h3>
							{[
								{
									label: "Cardholder Name",
									name: "name",
									placeholder: "John Smith",
								},
								{
									label: "Card Number",
									name: "cardNumber",
									placeholder: "1234 5678 9012 3456",
								},
							].map((field) => (
								<div key={field.name} className="space-y-2">
									<Label htmlFor={field.name}>{field.label}</Label>
									<Input
										id={field.name}
										name={field.name}
										placeholder={field.placeholder}
										className="bg-slate-800/50 border-slate-600 text-white focus:border-blue-500/50 focus:ring-blue-500/50 transition-all"
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												[field.name]: e.target.value,
											}))
										}
									/>
								</div>
							))}

							<div className="grid grid-cols-2 gap-4">
								{[
									{
										label: "Expiry Date",
										name: "expiry",
										placeholder: "MM/YY",
									},
									{ label: "CVC", name: "cvc", placeholder: "123" },
								].map((field) => (
									<div key={field.name} className="space-y-2">
										<Label htmlFor={field.name}>{field.label}</Label>
										<Input
											id={field.name}
											name={field.name}
											placeholder={field.placeholder}
											className="bg-slate-800/50 border-slate-600 text-white"
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													[field.name]: e.target.value,
												}))
											}
										/>
									</div>
								))}
							</div>
						</div>

						{/* Billing Address Section */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold text-white">
								Billing Address
							</h3>
							<div className="grid grid-cols-1 gap-4">
								{addressFields.map((field) => (
									<div key={field.name} className="space-y-2">
										<Label htmlFor={field.name}>
											{field.label}
											{field.optional && (
												<span className="text-slate-400 text-sm ml-2">
													(Optional)
												</span>
											)}
										</Label>
										<Input
											id={field.name}
											name={field.name}
											placeholder={field.placeholder}
											className="bg-slate-800/50 border-slate-600 text-white focus:border-blue-500/50 focus:ring-blue-500/50 transition-all"
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													[field.name]: e.target.value,
												}))
											}
										/>
									</div>
								))}
							</div>
						</div>
					</div>

					<Alert className="bg-blue-500/10 border-blue-400/20 text-blue-300">
						<AlertDescription className="flex items-center gap-2">
							<Check className="h-4 w-4" />
							Payments powered & secured by Stripe
						</AlertDescription>
					</Alert>

					<DialogFooter>
						<Button
							type="submit"
							className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-2.5 px-8 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-900"
						>
							Save Payment Method
						</Button>
					</DialogFooter>
				</form>

				<div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
					<span>Powered by</span>
					<span className="font-semibold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
						Stripe
					</span>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export function SubscriptionPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

	const plans = [
		{
			name: "Free",
			price: "$0",
			period: "forever",
			priceId: "price_free",
			features: ["Basic access", "Limited requests", "Community support"],
			current: true,
		},
		{
			name: "Pro",
			price: "$10",
			period: "month",
			priceId: "price_pro",
			features: [
				"Unlimited access",
				"Priority support",
				"Advanced features",
				"API access",
			],
			highlight: true,
		},
	];

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<div className="p-6 md:p-8 space-y-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 min-h-screen">
			<div className="space-y-3 max-w-2xl mx-auto text-center">
				<h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text">
					Subscription Management
				</h2>
				<p className="text-slate-400 text-lg">
					Manage your plan and payment details
				</p>
			</div>

			<Card className="max-w-3xl mx-auto bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
				<CardHeader>
					<CardTitle className="text-2xl text-white flex items-center gap-2">
						<CreditCard className="h-6 w-6 text-blue-400" />
						Payment Method
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Button
						variant="outline"
						onClick={() => setIsPaymentModalOpen(true)}
						disabled={isLoading}
						className="bg-slate-700/50 border-slate-600 hover:bg-slate-700 text-slate-300 py-3 px-6"
					>
						{isLoading ? (
							<Loader2 className="h-5 w-5 animate-spin mr-2" />
						) : (
							<CreditCard className="h-5 w-5 mr-2" />
						)}
						Manage Payment Methods
					</Button>
				</CardContent>
			</Card>

			<div className="text-center space-y-3 max-w-2xl mx-auto pt-8">
				<h3 className="text-2xl font-bold text-white">Available Plans</h3>
				<p className="text-slate-400">
					Choose the plan that best fits your needs
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
				{plans.map((plan) => (
					<Card
						key={plan.name}
						className={`bg-slate-800/30 border-slate-700/50 backdrop-blur-sm transform transition-all hover:scale-105 ${
							plan.highlight
								? "ring-2 ring-blue-500/50 shadow-xl shadow-blue-500/10"
								: ""
						}`}
					>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
										{plan.name}
										{plan.highlight && (
											<Sparkles className="h-5 w-5 text-blue-400" />
										)}
									</CardTitle>
									<CardDescription className="text-slate-400 mt-1">
										<span className="text-2xl font-bold text-white">
											{plan.price}
										</span>
										<span className="text-slate-400">/{plan.period}</span>
									</CardDescription>
								</div>
								{plan.current && (
									<span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
										Current Plan
									</span>
								)}
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<ul className="space-y-3">
								{plan.features.map((feature) => (
									<li
										key={feature}
										className="flex items-center gap-2 text-slate-300"
									>
										<div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
										{feature}
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							<Button
								className={`w-full py-6 text-lg font-medium rounded-xl transition-all ${
									plan.highlight
										? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
										: "bg-slate-700/50 hover:bg-slate-700 text-slate-300"
								}`}
								disabled={isLoading || (plan.current && plan.name === "Free")}
							>
								{isLoading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
								{plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			<PaymentDialog
				isOpen={isPaymentModalOpen}
				onClose={() => setIsPaymentModalOpen(false)}
				onSubmit={() => {
					setIsPaymentModalOpen(false);
				}}
			/>
		</div>
	);
}
