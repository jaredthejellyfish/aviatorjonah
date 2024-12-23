import { CreatorCourse } from "@/utils/helpers/getCreatorCourses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, BookOpen } from "lucide-react";

export function CreatorStats({ courses }: { courses: CreatorCourse[] }) {
  const totalRevenue = courses.reduce(
    (sum, course) => sum + (course.price || 0) * (course.enrollment_count || 0),
    0,
  );

  const totalStudents = courses.reduce(
    (sum, course) => sum + (course.enrollment_count || 0),
    0,
  );
  const publishedCourses = courses.filter((course) => !course.draft).length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Published Courses
          </CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{publishedCourses}</div>
        </CardContent>
      </Card>
    </div>
  );
}
