"use client";

import type React from "react";
import { Plane, AlertCircle } from "lucide-react";
import type { Flight, Currency } from "types/calendar";

interface CalendarDaysProps {
	days: Date[];
	currentMonth: number;
	flights: Flight[];
	currencies: Currency[];
	onDayClick: (date: Date, flights: Flight[]) => void;
	onCurrencyClick: (currency: Currency) => void;
}

const CalendarDays: React.FC<CalendarDaysProps> = ({
	days,
	currentMonth,
	flights,
	currencies,
	onDayClick,
	onCurrencyClick,
}) => {
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const getFlightsForDay = (day: Date) => {
		return flights.filter(
			(flight) =>
				flight.date.getDate() === day.getDate() &&
				flight.date.getMonth() === day.getMonth() &&
				flight.date.getFullYear() === day.getFullYear(),
		);
	};

	const getCurrenciesForDay = (day: Date) => {
		return currencies.filter(
			(currency) =>
				currency.expirationDate.getDate() === day.getDate() &&
				currency.expirationDate.getMonth() === day.getMonth() &&
				currency.expirationDate.getFullYear() === day.getFullYear(),
		);
	};

	return (
		<div className="grid grid-cols-7 gap-2">
			{weekdays.map((day) => (
				<div key={day} className="text-center font-semibold text-gray-400 p-2">
					{day}
				</div>
			))}
			{days.map((day, index) => {
				const dayFlights = getFlightsForDay(day);
				const dayCurrencies = getCurrenciesForDay(day);
				return (
					<div
						key={index}
						className={`p-2 h-32 text-left rounded-lg transition-all duration-200 ease-in-out
              ${
								day.getMonth() === currentMonth
									? "bg-gray-800 text-gray-100 hover:bg-gray-700"
									: "bg-gray-900 text-gray-500 hover:bg-gray-800"
							} ${
								day.getDate() === new Date().getDate() &&
								day.getMonth() === new Date().getMonth()
									? "border-2 border-blue-500"
									: ""
							}`}
					>
						<div className="font-semibold">{day.getDate()}</div>
						{dayFlights.length > 0 && (
							<div
								className="mt-1 cursor-pointer hover:text-blue-400"
								onClick={() => onDayClick(day, dayFlights)}
							>
								<Plane size={16} className="inline-block mr-1 text-blue-500" />
								<span className="text-xs">
									{dayFlights.length} flight{dayFlights.length > 1 ? "s" : ""}
								</span>
							</div>
						)}
						{dayCurrencies.map((currency) => (
							<div
								key={currency.id}
								className="mt-1 cursor-pointer hover:text-yellow-400"
								onClick={() => onCurrencyClick(currency)}
							>
								<AlertCircle
									size={16}
									className="inline-block mr-1 text-yellow-500"
								/>
								<span className="text-xs">{currency.name} expiring</span>
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
};

export default CalendarDays;
