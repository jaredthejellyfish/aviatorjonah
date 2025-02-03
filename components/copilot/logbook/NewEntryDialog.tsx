"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLogbook } from "@/hooks/useLogbook";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlightEntry, FlightEntrySchema } from "@/lib/schemas/flight-schema";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type NewEntryDialogProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

function FormError({ message }: { message: string }) {
	return (
		<span className="text-sm font-medium text-red-500 dark:text-red-400">
			{message}
		</span>
	);
}

export default function NewEntryDialog({ open, setOpen }: NewEntryDialogProps) {
	const { createEntry, isCreating } = useLogbook({ enableFetch: false });
	const [statusfulDepartureTime, setStatusfulDepartureTime] = useState("");
	const [statusfulArrivalTime, setStatusfulArrivalTime] = useState("");
	const [statusfulTotalTime, setStatusfulTotalTime] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
		reset,
		setValue,
	} = useForm<FlightEntry>({
		resolver: zodResolver(FlightEntrySchema),
		defaultValues: {
			date: "",
			aircraft_type: "",
			registration: "",
			departure_airport: "",
			arrival_airport: "",
			departure_time: "",
			arrival_time: "",
			total_time: "",
			night_time: "00:00",
			conditions: undefined,
			landings: 1,
			remarks: "",
			status: "completed",
		},
		mode: "onChange",
	});

	// Calculate total time whenever departure or arrival time changes
	useEffect(() => {
		const calculateTotalTime = () => {
			if (!statusfulDepartureTime || !statusfulArrivalTime) {
				setStatusfulTotalTime("");
				setValue("total_time", "", { shouldValidate: true });
				return;
			}

			const [depHours, depMinutes] = statusfulDepartureTime
				.split(":")
				.map(Number);
			const [arrHours, arrMinutes] = statusfulArrivalTime
				.split(":")
				.map(Number);

			let totalMinutes =
				arrHours * 60 + arrMinutes - (depHours * 60 + depMinutes);

			// Handle times crossing midnight
			if (totalMinutes < 0) {
				totalMinutes += 24 * 60;
			}

			const hours = Math.floor(totalMinutes / 60);
			const minutes = totalMinutes % 60;

			const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
			setStatusfulTotalTime(formattedTime);
			setValue("total_time", formattedTime, { shouldValidate: true });
		};

		calculateTotalTime();
	}, [
		statusfulDepartureTime,
		statusfulArrivalTime,
		setStatusfulTotalTime,
		setValue,
	]);

	const onSubmit = async (data: FlightEntry) => {
		try {
			await createEntry(data);
			reset();
			setOpen(false);
			toast.success("Flight entry added successfully", {
				description: "Your flight has been logged successfully.",
			});
		} catch {
			toast.error("Failed to add flight entry", {
				description:
					"There was an error saving your flight entry. Please try again.",
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-200 w-full sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
				<DialogHeader className="px-6 pt-6">
					<DialogTitle className="text-xl font-semibold text-white">
						Add Flight Entry
					</DialogTitle>
					<DialogDescription className="text-slate-400">
						Record the details of your flight in your logbook.
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col flex-1 overflow-hidden"
				>
					<div className="flex-1 overflow-y-auto px-6">
						<div className="space-y-4 py-4">
							{/* Basic Flight Info */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="date" className="text-white">
										Date
									</Label>
									<Input
										{...register("date")}
										type="date"
										className={cn(
											"bg-slate-700/50 border-slate-600/50 text-white w-full",
											errors.date && "border-red-400",
										)}
									/>
									{errors.date && (
										<FormError message={errors.date.message as string} />
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="aircraft_type" className="text-white">
										Aircraft Type
									</Label>
									<Input
										{...register("aircraft_type")}
										placeholder="e.g. C172"
										maxLength={10}
										className={cn(
											"bg-slate-700/50 border-slate-600/50 text-white w-full",
											errors.aircraft_type && "border-red-400",
										)}
									/>
									{errors.aircraft_type && (
										<FormError
											message={errors.aircraft_type.message as string}
										/>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="registration" className="text-white">
										Registration
									</Label>
									<Input
										{...register("registration")}
										placeholder="N-Number"
										maxLength={10}
										className={cn(
											"bg-slate-700/50 border-slate-600/50 text-white w-full",
											errors.registration && "border-red-400",
										)}
									/>
									{errors.registration && (
										<FormError
											message={errors.registration.message as string}
										/>
									)}
								</div>
							</div>

							{/* Route and Times */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
								<div className="space-y-2">
									<Label htmlFor="departure_airport" className="text-white">
										Departure
									</Label>
									<Input
										{...register("departure_airport")}
										placeholder="ICAO"
										maxLength={4}
										className={cn(
											"bg-slate-700/50 border-slate-600/50 text-white w-full uppercase",
											errors.departure_airport && "border-red-400",
										)}
									/>
									{errors.departure_airport && (
										<FormError
											message={errors.departure_airport.message as string}
										/>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="departure_time" className="text-white">
										Time Out
									</Label>
									<Input
										{...register("departure_time", {
											onChange: (e) => {
												setStatusfulDepartureTime(e.target.value);
												setValue("departure_time", e.target.value, {
													shouldValidate: true,
												});
											},
										})}
										type="time"
										className={cn(
											"bg-slate-700/50 border-slate-600/50 text-white w-full",
											errors.departure_time && "border-red-400",
										)}
									/>
									{errors.departure_time && (
										<FormError
											message={errors.departure_time.message as string}
										/>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="arrival_airport" className="text-white">
										Arrival
									</Label>
									<Input
										{...register("arrival_airport")}
										placeholder="ICAO"
										maxLength={4}
										className={cn(
											"bg-slate-700/50 border-slate-600/50 text-white w-full uppercase",
											errors.arrival_airport && "border-red-400",
										)}
									/>
									{errors.arrival_airport && (
										<FormError
											message={errors.arrival_airport.message as string}
										/>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="arrival_time" className="text-white">
										Time In
									</Label>
									<Input
										{...register("arrival_time", {
											onChange: (e) => {
												setStatusfulArrivalTime(e.target.value);
												setValue("arrival_time", e.target.value, {
													shouldValidate: true,
												});
											},
										})}
										type="time"
										className={cn(
											"bg-slate-700/50 border-slate-600/50 text-white w-full",
											errors.arrival_time && "border-red-400",
										)}
									/>
									{errors.arrival_time && (
										<FormError
											message={errors.arrival_time.message as string}
										/>
									)}
								</div>
							</div>

							{/* Flight Details and Conditions */}
							<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
								<div className="space-y-2">
									<Label htmlFor="total_time" className="text-white">
										Total Time
									</Label>
									<Input
										{...register("total_time")}
										placeholder="HH:MM"
										value={statusfulTotalTime}
										readOnly
										className="bg-slate-700/50 border-slate-600/50 text-white w-full cursor-not-allowed"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="night_time" className="text-white">
										Night Time
									</Label>
									<Input
										{...register("night_time")}
										placeholder="HH:MM"
										className={cn(
											"bg-slate-700/50 border-slate-600/50 text-white w-full",
											errors.night_time && "border-red-400",
										)}
									/>
									{errors.night_time && (
										<FormError message={errors.night_time.message as string} />
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="landings" className="text-white">
										Landings
									</Label>
									<Input
										{...register("landings", { valueAsNumber: true })}
										type="number"
										min={1}
										className={cn(
											"bg-slate-700/50 border-slate-600/50 text-white w-full",
											errors.landings && "border-red-400",
										)}
									/>
									{errors.landings && (
										<FormError message={errors.landings.message as string} />
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="conditions" className="text-white">
										Conditions
									</Label>
									<Select
										onValueChange={(value) =>
											setValue("conditions", value as "VFR" | "IFR" | "SVFR")
										}
									>
										<SelectTrigger
											className={cn(
												"bg-slate-700/50 border-slate-600/50 text-white w-full",
												errors.conditions && "border-red-400",
											)}
										>
											<SelectValue placeholder="Select conditions" />
										</SelectTrigger>
										<SelectContent className="bg-slate-800 border-slate-700">
											<SelectItem
												value="VFR"
												className="text-white hover:bg-slate-700"
											>
												VFR
											</SelectItem>
											<SelectItem
												value="IFR"
												className="text-white hover:bg-slate-700"
											>
												IFR
											</SelectItem>
											<SelectItem
												value="SVFR"
												className="text-white hover:bg-slate-700"
											>
												Special VFR
											</SelectItem>
										</SelectContent>
									</Select>
									{errors.conditions && (
										<FormError message={errors.conditions.message as string} />
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="status" className="text-white">
										Status
									</Label>
									<Select
										defaultValue="completed"
										onValueChange={(value) =>
											setValue(
												"status",
												value as "completed" | "pending" | "draft",
											)
										}
									>
										<SelectTrigger
											className={cn(
												"bg-slate-700/50 border-slate-600/50 text-white w-full",
												errors.status && "border-red-400",
											)}
										>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent className="bg-slate-800 border-slate-700">
											<SelectItem
												value="completed"
												className="text-white hover:bg-slate-700"
											>
												Completed
											</SelectItem>
											<SelectItem
												value="pending"
												className="text-white hover:bg-slate-700"
											>
												Pending
											</SelectItem>
											<SelectItem
												value="draft"
												className="text-white hover:bg-slate-700"
											>
												Draft
											</SelectItem>
										</SelectContent>
									</Select>
									{errors.status && (
										<FormError message={errors.status.message as string} />
									)}
								</div>
							</div>

							{/* Remarks */}
							<div className="space-y-2">
								<Label htmlFor="remarks" className="text-white">
									Remarks
								</Label>
								<Textarea
									{...register("remarks")}
									placeholder="Enter any remarks about the flight..."
									className={cn(
										"bg-slate-700/50 border-slate-600/50 text-white min-h-[80px] w-full",
										errors.remarks && "border-red-400",
									)}
								/>
								{errors.remarks && (
									<FormError message={errors.remarks.message as string} />
								)}
							</div>
						</div>
					</div>
					<div className="border-t border-slate-700/50 px-6 py-4 mt-auto">
						<div className="flex flex-col-reverse sm:flex-row justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3">
							<DialogTrigger asChild>
								<Button
									type="button"
									variant="outline"
									className="border-slate-600 text-white hover:bg-slate-700/50 w-full sm:w-auto"
								>
									Cancel
								</Button>
							</DialogTrigger>
							<Button
								type="submit"
								className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={isCreating || !isValid || !isDirty}
							>
								{isCreating ? "Saving..." : "Save Entry"}
							</Button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
