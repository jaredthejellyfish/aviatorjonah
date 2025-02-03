"use client";

import type React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getMonthName } from "components/utils/dateUtils";

interface CalendarHeaderProps {
	currentDate: Date;
	onPrevMonth: () => void;
	onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
	currentDate,
	onPrevMonth,
	onNextMonth,
}) => {
	return (
		<div className="flex items-center justify-between mb-4">
			<button
				onClick={onPrevMonth}
				className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-full transition-colors"
			>
				<ChevronLeft size={24} />
			</button>
			<h2 className="text-2xl font-bold text-gray-100">
				{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
			</h2>
			<button
				onClick={onNextMonth}
				className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-full transition-colors"
			>
				<ChevronRight size={24} />
			</button>
		</div>
	);
};

export default CalendarHeader;
