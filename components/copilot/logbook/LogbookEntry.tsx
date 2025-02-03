import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, ArrowRight, Clock } from "lucide-react";

interface LogbookEntryProps {
	entry: {
		id: number;
		date: string;
		aircraft: string;
		from: string;
		to: string;
		duration: string;
	};
}

export function LogbookEntry({ entry }: LogbookEntryProps) {
	return (
		<Card className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border-slate-700/30 hover:border-blue-500/30 transition-all duration-500">
			<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
			<CardHeader className="bg-blue-950/50 px-4 sm:px-6">
				<CardTitle className="flex items-center justify-between text-white">
					<span className="text-base">{entry.date}</span>
					<Plane className="h-5 w-5 text-blue-400" />
				</CardTitle>
			</CardHeader>
			<CardContent className="px-4 sm:px-6 pt-4">
				<p className="text-lg font-medium text-blue-400 mb-3">
					{entry.aircraft}
				</p>
				<div className="space-y-3">
					<div className="flex items-center justify-between text-sm">
						<span className="text-slate-400">Route</span>
						<div className="flex items-center space-x-2 text-white">
							<span>{entry.from}</span>
							<ArrowRight className="h-4 w-4 text-slate-500" />
							<span>{entry.to}</span>
						</div>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-slate-400">Duration</span>
						<div className="flex items-center space-x-2">
							<Clock className="h-4 w-4 text-slate-500" />
							<span className="text-white">{entry.duration}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
