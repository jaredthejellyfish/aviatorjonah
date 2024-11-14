
import CoursesSection from "@/components/Courses/courses-section";
import FiltersSection from "@/components/Courses/filters-section";
import { getAllCourses } from "@/utils/helpers/getAllCourses";

export default async function AllCoursesPage() {
  const courses = await getAllCourses();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All Courses</h1>

      <FiltersSection />

      <CoursesSection courses={courses} />
    </main>
  );
}
