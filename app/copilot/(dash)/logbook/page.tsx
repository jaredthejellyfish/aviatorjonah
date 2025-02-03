import { Suspense } from "react";
import { LogbookLoading } from "@/components/copilot/logbook/LogbookLoading";
import StatisticsCards from "@/components/copilot/logbook/StatisticsCards";
import StatisticsCardsLoading from "@/components/copilot/logbook/StatisticsCardsLoading";
import LogbookWrapper from "@/components/copilot/logbook/LogbookWrapper";
import { LogbookSearch } from "@/components/copilot/logbook/LogbookSearch";

export const metadata = {
	title: "Copilot | Logbook",
	description: "Track and manage your flight history",
};

export default async function LogbookPage() {
	return (
		<div className="space-y-6 p-3">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div className="flex flex-col items-start justify-center">
					<h2 className="text-2xl font-semibold text-slate-200">
						Flight Logbook
					</h2>
					<p className="text-slate-400 text-sm">
						Track and manage your flight history
					</p>
				</div>
				<LogbookSearch />
			</div>

			{/* Main Content */}
			<div className="space-y-6">
				{/* Statistics Cards */}
				<Suspense fallback={<StatisticsCardsLoading />}>
					<StatisticsCards />
				</Suspense>

				{/* Main Logbook Component */}
				<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg">
					<Suspense fallback={<LogbookLoading />}>
						<LogbookWrapper />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
