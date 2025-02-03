import Calendar from "components/copilot/calendar/Calendar";

export default function CalendarPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
			<h1 className="text-4xl font-bold text-center text-blue-400 mb-8">
				CoPilot Flight Calendar
			</h1>
			<Calendar />
		</div>
	);
}
