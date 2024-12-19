import { Progress } from "@/components/ui/progress"

export default function PopularCoursesWidget() {
  const popularCourses = [
    { id: 1, title: "Introduction to Flight", enrollments: 1234, progress: 80 },
    { id: 2, title: "Advanced Navigation", enrollments: 987, progress: 65 },
    { id: 3, title: "Weather Patterns for Pilots", enrollments: 756, progress: 50 },
    { id: 4, title: "Aircraft Systems", enrollments: 543, progress: 35 },
  ]

  return (
    <div className="space-y-8">
      {popularCourses.map((course) => (
        <div key={course.id} className="space-y-2">
          <div className="flex items-center">
            <span className="text-sm font-medium">{course.title}</span>
            <span className="ml-auto text-sm text-muted-foreground">{course.enrollments} enrollments</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      ))}
    </div>
  )
}

