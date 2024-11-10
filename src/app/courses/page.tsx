import Navigation from "@/components/Navigation";
import CoursesSection from "@/components/Courses/courses-section";
import FiltersSection from "@/components/Courses/filters-section";
import { getAllCourses } from "@/utils/helpers/getAllCourses";

export default async function AllCoursesPage() {
  const courses = await getAllCourses();
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900/40 text-neutral-800 dark:text-neutral-200">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">All Courses</h1>

        <FiltersSection />

        <CoursesSection courses={courses} />
      </main>
    </div>
  );
}
