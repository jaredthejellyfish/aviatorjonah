"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	ArrowUpDown,
	Clock,
	Plus,
	Loader2,
	MoreVertical,
	Trash2,
	Eye,
} from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { useLogbook } from "@/hooks/useLogbook";
import type { FlightEntry } from "@/hooks/useLogbook";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteFlightDialog } from "./DeleteFlightDialog";

const ViewFlightModal = dynamic(() => import("./ViewFlightModal"), {
	ssr: false,
});

const NewEntryDialog = dynamic(() => import("./NewEntryDialog"), {
	ssr: false,
});

type SortField = "date" | "aircraft_type" | "total_time";
type SortDirection = "asc" | "desc";

export function Logbook({ initialEntries }: { initialEntries: FlightEntry[] }) {
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [sortField, setSortField] = useState<SortField>("date");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [open, setOpen] = useState(false);
	const [selectedFlight, setSelectedFlight] = useState<FlightEntry | null>(
		null,
	);
	const [flightToDelete, setFlightToDelete] = useState<FlightEntry | null>(
		null,
	);

	const { entries, isLoading, error, deleteEntry, isDeleting } = useLogbook({
		initialEntries,
	});

	const sortEntries = (entries: FlightEntry[]) => {
		return [...entries].sort((a, b) => {
			if (sortField === "date") {
				return sortDirection === "asc"
					? new Date(a.date).getTime() - new Date(b.date).getTime()
					: new Date(b.date).getTime() - new Date(a.date).getTime();
			}
			return sortDirection === "asc"
				? a[sortField].localeCompare(b[sortField])
				: b[sortField].localeCompare(a[sortField]);
		});
	};

	const toggleSort = (field: SortField) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-500/20 text-green-400";
			case "pending":
				return "bg-yellow-500/20 text-yellow-400";
			default:
				return "bg-slate-500/20 text-slate-400";
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteEntry(id);
			setFlightToDelete(null);
		} catch (error) {
			console.error("Failed to delete entry:", error);
		}
	};

	if (error) {
		return (
			<div className="p-8 text-center">
				<p className="text-red-400">Failed to load flight entries</p>
			</div>
		);
	}

	return (
		<div>
			<CardHeader className="px-4 sm:px-6">
				<CardTitle className="flex flex-col md:flex-row md:items-center justify-between text-white">
					<span className="text-lg sm:text-xl mb-4 md:mb-0">Flight Log</span>
					<div className="flex gap-2">
						<Button
							className="bg-blue-500 hover:bg-blue-600 text-white"
							onClick={() => setOpen(true)}
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Flight
						</Button>
						{open && <NewEntryDialog open={open} setOpen={setOpen} />}

						<Button
							onClick={() => setShowCalendar(!showCalendar)}
							variant="outline"
							className="bg-white/5 text-slate-300 hover:bg-white/10 border-slate-700/30"
						>
							{showCalendar ? "Hide Calendar" : "Show Calendar"}
						</Button>
					</div>
				</CardTitle>
			</CardHeader>

			<CardContent className="px-4 sm:px-6">
				{showCalendar && (
					<div className="mb-6 p-4 rounded-lg bg-white/5 border border-slate-700/30">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={setSelectedDate}
							className="rounded-md border-none bg-transparent"
						/>
					</div>
				)}

				<div className="rounded-md border border-slate-700/30">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-white/5 border-slate-700/30">
								<TableHead
									className="text-slate-300 cursor-pointer"
									onClick={() => toggleSort("date")}
								>
									<div className="flex items-center gap-2">
										Date
										<ArrowUpDown className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead
									className="text-slate-300 cursor-pointer"
									onClick={() => toggleSort("aircraft_type")}
								>
									<div className="flex items-center gap-2">
										Aircraft
										<ArrowUpDown className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead className="text-slate-300">Route</TableHead>
								<TableHead
									className="text-slate-300 cursor-pointer"
									onClick={() => toggleSort("total_time")}
								>
									<div className="flex items-center gap-2">
										Duration
										<ArrowUpDown className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead className="text-slate-300">Night</TableHead>
								<TableHead className="text-slate-300">Conditions</TableHead>
								<TableHead className="text-slate-300">Remarks</TableHead>
								<TableHead className="text-slate-300">Status</TableHead>
								<TableHead className="text-slate-300 w-[50px]" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell colSpan={8} className="h-24 text-center">
										<div className="flex items-center justify-center">
											<Loader2 className="h-6 w-6 animate-spin text-blue-500" />
										</div>
									</TableCell>
								</TableRow>
							) : entries.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={8}
										className="h-24 text-center text-slate-400"
									>
										No flight entries yet. Add your first flight!
									</TableCell>
								</TableRow>
							) : (
								sortEntries(entries).map((entry) => (
									<TableRow
										key={entry.id}
										className="hover:bg-white/5 border-slate-700/30 group"
									>
										<TableCell className="font-medium text-white">
											{entry.date}
										</TableCell>
										<TableCell>
											<div className="flex flex-col">
												<span className="text-blue-400">
													{entry.aircraft_type}
												</span>
												<span className="text-xs text-slate-400">
													{entry.registration}
												</span>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-2">
												<span className="text-white">
													{entry.departure_airport}
												</span>
												<ArrowRight className="h-4 w-4 text-slate-500" />
												<span className="text-white">
													{entry.arrival_airport}
												</span>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-1 text-white">
												<Clock className="h-4 w-4 text-blue-400" />
												{entry.total_time}
											</div>
										</TableCell>
										<TableCell className="text-slate-300">
											{entry.night_time}
										</TableCell>
										<TableCell>
											<Badge
												variant="secondary"
												className="bg-white/10 text-slate-300"
											>
												{entry.conditions}
											</Badge>
										</TableCell>
										<TableCell className="text-slate-300 max-w-[200px] truncate">
											{entry.remarks}
										</TableCell>
										<TableCell>
											<Badge className={getStatusColor(entry.status)}>
												{entry.status}
											</Badge>
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" className="h-8 w-8 p-0">
														<MoreVertical className="h-4 w-4 text-slate-400" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent
													align="end"
													className="bg-slate-900 border-slate-800"
												>
													<DropdownMenuItem
														className="text-slate-200 focus:text-purple-400 focus:bg-purple-400/10 cursor-pointer"
														onClick={() => setSelectedFlight(entry)}
													>
														<Eye className="h-4 w-4 mr-2" />
														View Details
													</DropdownMenuItem>
													<DropdownMenuItem
														className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer"
														onClick={() => setFlightToDelete(entry)}
													>
														<Trash2 className="h-4 w-4 mr-2" />
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>

			{!!selectedFlight && (
				<ViewFlightModal
					isOpen={!!selectedFlight}
					onClose={() => setSelectedFlight(null)}
					flight={selectedFlight}
				/>
			)}

			{!!flightToDelete && (
				<DeleteFlightDialog
					isOpen={!!flightToDelete}
					onClose={() => setFlightToDelete(null)}
					onConfirm={async () => {
						if (flightToDelete) {
							await handleDelete(flightToDelete.id);
						}
					}}
					isDeleting={isDeleting}
					flightDetails={
						flightToDelete
							? {
									date: flightToDelete.date,
									departure_airport: flightToDelete.departure_airport,
									arrival_airport: flightToDelete.arrival_airport,
								}
							: {
									date: "",
									departure_airport: "",
									arrival_airport: "",
								}
					}
				/>
			)}
		</div>
	);
}
