export const getDaysInMonth = (year: number, month: number): Date[] => {
	const date = new Date(year, month, 1);
	const days: Date[] = [];
	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return days;
};

export const getMonthName = (month: number): string => {
	return new Date(0, month).toLocaleString("default", { month: "long" });
};
