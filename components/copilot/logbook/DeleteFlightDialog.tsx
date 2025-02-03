"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface DeleteFlightDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => Promise<void>;
	isDeleting: boolean;
	flightDetails: {
		date: string;
		departure_airport: string;
		arrival_airport: string;
	};
}

export function DeleteFlightDialog({
	isOpen,
	onClose,
	onConfirm,
	isDeleting,
	flightDetails,
}: DeleteFlightDialogProps) {
	const handleConfirm = async () => {
		await onConfirm();
		onClose();
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700/50">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-slate-200">
						Delete Flight Entry
					</AlertDialogTitle>
					<AlertDialogDescription className="text-slate-400">
						Are you sure you want to delete your flight from{" "}
						{flightDetails.departure_airport} to {flightDetails.arrival_airport}{" "}
						on {flightDetails.date}? This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							handleConfirm();
						}}
						className="bg-red-600 hover:bg-red-700 text-slate-100"
						disabled={isDeleting}
					>
						{isDeleting ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							"Delete"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
