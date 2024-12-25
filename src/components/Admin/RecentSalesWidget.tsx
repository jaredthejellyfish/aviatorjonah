import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import stripe from "@/utils/stripe";
import { UserIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function RecentSalesWidget() {
	const getMostRecentSales = async () => {
		const response = await stripe.charges.list({
			limit: 6,
		});

		return response.data;
	};

	const sales = await getMostRecentSales();

	return (
		<div className="space-y-8">
			{sales.map((sale) => (
				<div key={sale.id} className="flex items-center">
					<Avatar className="h-9 w-9">
						<AvatarFallback>
							<UserIcon className="opacity-50" />
						</AvatarFallback>
					</Avatar>
					<HoverCard>
						<HoverCardTrigger asChild>
							<div className="ml-4 space-y-1 cursor-pointer">
								<p className="text-sm font-medium leading-none group-hover:text-aviatorjonah-600">
									{sale.billing_details?.email}
								</p>
								<p className="text-xs text-muted-foreground">
									{new Date(sale.created * 1000).toLocaleString()}
								</p>
							</div>
						</HoverCardTrigger>
						<HoverCardContent className="w-80">
							<div className="space-y-4">
								<div className="space-y-2">
									<h4 className="text-sm font-semibold">Transaction Details</h4>
									<div className="grid grid-cols-2 gap-2 text-sm">
										<div className="text-muted-foreground">Amount:</div>
										<div className="font-medium">${sale.amount / 100}</div>
										<div className="text-muted-foreground">Date:</div>
										<div className="font-medium">
											{new Date(sale.created * 1000).toLocaleDateString()}
										</div>
										<div className="text-muted-foreground">Time:</div>
										<div className="font-medium">
											{new Date(sale.created * 1000).toLocaleTimeString()}
										</div>
									</div>
								</div>
								<Link
									href={sale.receipt_url ?? ""}
									target="_blank"
									className="block"
								>
									<Button
										variant="outline"
										className="w-full hover:bg-aviatorjonah-50 hover:text-aviatorjonah-600 transition-colors"
									>
										View Receipt
									</Button>
								</Link>
							</div>
						</HoverCardContent>
					</HoverCard>
					<div className="ml-auto font-medium">${sale.amount / 100}</div>
				</div>
			))}
		</div>
	);
}

export function RecentSalesWidgetSkeleton() {
	return (
		<div className="space-y-8">
			{[...Array(6)].map((_, i) => (
				<div key={i} className="flex items-center">
					{/* Avatar skeleton */}
					<Avatar className="h-9 w-9">
						<AvatarFallback>
							<UserIcon className="opacity-50" />
						</AvatarFallback>
					</Avatar>

					{/* Email skeleton */}
					<div className="ml-4 space-y-1">
						<Skeleton className="h-4 w-48" />
						<Skeleton className="h-3 w-36" />
					</div>

					{/* Amount skeleton */}
					<div className="ml-auto">
						<Skeleton className="h-4 w-10" />
					</div>
				</div>
			))}
		</div>
	);
}
