import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function LogbookLoading() {
	// Create an array of 5 items for skeleton rows
	const skeletonRows = Array.from({ length: 2 }, (_, i) => i);

	return (
		<div>
			<CardHeader className="px-4 sm:px-6">
				<CardTitle className="flex flex-col md:flex-row md:items-center justify-between text-white">
					<span className="text-lg sm:text-xl mb-4 md:mb-0">Flight Log</span>
					<div className="flex gap-2">
						<Button
							disabled
							className="bg-blue-500 hover:bg-blue-600 text-white"
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Flight
						</Button>

						<Button
							disabled
							variant="outline"
							className="bg-white/5 text-slate-300 hover:bg-white/10 border-slate-700/30"
						>
							Show Calendar
						</Button>
					</div>
				</CardTitle>
			</CardHeader>

			<CardContent className="px-4 sm:px-6">
				<div className="rounded-md border border-slate-700/30">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-white/5 border-slate-700/30">
								<TableHead className="text-slate-300">Date</TableHead>
								<TableHead className="text-slate-300">Aircraft</TableHead>
								<TableHead className="text-slate-300">Route</TableHead>
								<TableHead className="text-slate-300">Duration</TableHead>
								<TableHead className="text-slate-300">Night</TableHead>
								<TableHead className="text-slate-300">Conditions</TableHead>
								<TableHead className="text-slate-300">Remarks</TableHead>
								<TableHead className="text-slate-300">Status</TableHead>
								<TableHead className="text-slate-300 w-[50px]" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{skeletonRows.map((index) => (
								<TableRow
									key={index}
									className="hover:bg-white/5 border-slate-700/30 group animate-pulse"
								>
									<TableCell>
										<div className="h-4 w-24 bg-slate-700/50 rounded" />
									</TableCell>
									<TableCell>
										<div className="space-y-2">
											<div className="h-4 w-20 bg-slate-700/50 rounded" />
											<div className="h-3 w-16 bg-slate-700/50 rounded" />
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center space-x-2">
											<div className="h-4 w-16 bg-slate-700/50 rounded" />
											<div className="h-4 w-4 bg-slate-700/50 rounded" />
											<div className="h-4 w-16 bg-slate-700/50 rounded" />
										</div>
									</TableCell>
									<TableCell>
										<div className="h-4 w-16 bg-slate-700/50 rounded" />
									</TableCell>
									<TableCell>
										<div className="h-4 w-12 bg-slate-700/50 rounded" />
									</TableCell>
									<TableCell>
										<div className="h-6 w-16 bg-slate-700/50 rounded-full" />
									</TableCell>
									<TableCell>
										<div className="h-4 w-32 bg-slate-700/50 rounded" />
									</TableCell>
									<TableCell>
										<div className="h-6 w-20 bg-slate-700/50 rounded-full" />
									</TableCell>
									<TableCell>
										<div className="h-8 w-8 bg-slate-700/50 rounded" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</div>
	);
}
