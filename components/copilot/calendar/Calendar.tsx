"use client";

import type React from "react";
import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import { getDaysInMonth } from "components/utils/dateUtils";
import { mockFlights, mockCurrencies } from "components/utils/mockData";
import type { Flight, Currency } from "types/calendar";
import FlightDetailsPopup from "./FlightDetailsPopup";
import CurrencyDetailsPopup from "./CurrencyDetailsPopup";

const Calendar: React.FC = () => {
	const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // Set to January 2024
	const [selectedFlights, setSelectedFlights] = useState<Flight[]>([]);
	const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
		null,
	);
	const [isFlightPopupOpen, setIsFlightPopupOpen] = useState(false);
	const [isCurrencyPopupOpen, setIsCurrencyPopupOpen] = useState(false);

	const handlePrevMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
		);
	};

	const handleNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
		);
	};

	const handleDayClick = (date: Date, dayFlights: Flight[]) => {
		setSelectedFlights(dayFlights);
		setIsFlightPopupOpen(true);
	};

	const handleCurrencyClick = (currency: Currency) => {
		setSelectedCurrency(currency);
		setIsCurrencyPopupOpen(true);
	};

	const days = getDaysInMonth(
		currentDate.getFullYear(),
		currentDate.getMonth(),
	);

	return (
		<div className="max-w-6xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg text-gray-100">
			<CalendarHeader
				currentDate={currentDate}
				onPrevMonth={handlePrevMonth}
				onNextMonth={handleNextMonth}
			/>
			<CalendarDays
				days={days}
				currentMonth={currentDate.getMonth()}
				flights={mockFlights}
				currencies={mockCurrencies}
				onDayClick={handleDayClick}
				onCurrencyClick={handleCurrencyClick}
			/>
			{isFlightPopupOpen && (
				<FlightDetailsPopup
					flights={selectedFlights}
					onClose={() => setIsFlightPopupOpen(false)}
				/>
			)}
			{isCurrencyPopupOpen && selectedCurrency && (
				<CurrencyDetailsPopup
					currency={selectedCurrency}
					onClose={() => setIsCurrencyPopupOpen(false)}
				/>
			)}
		</div>
	);
};

export default Calendar;
