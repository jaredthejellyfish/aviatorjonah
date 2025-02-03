import CourseContent from "@/components/courses/course-content";

export const metadata = {
	title: "AviatorJonah | Courses",
	description: "Learn to fly with AviatorJonah",
};

export default function CoursesPage() {
	return (
		<div className="flex flex-col min-h-screen bg-gray-900 text-white">
			<main className="flex-grow">
				<div className="relative">
					<div className="absolute inset-0 z-0 opacity-20 animate-runway-move"></div>
					<div className="relative z-10">
						<CourseContent />
					</div>
				</div>
			</main>
		</div>
	);
}
