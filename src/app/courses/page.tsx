import CoursesSection from "@/components/Courses/courses-section";
import FiltersSection from "@/components/Courses/filters-section";
import { getAllCourses } from "@/utils/helpers/getAllCourses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AviatorJonah | Courses",
  description: "All courses available on AviatorJonah.",
};

export default async function AllCoursesPage() {
  const courses = await getAllCourses(true);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All Courses</h1>

      <FiltersSection />

      <CoursesSection courses={courses} />
    </main>
  );
}
