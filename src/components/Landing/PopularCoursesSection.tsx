import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "../ui/card";
import { BookOpen, Clock, BarChart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePopularCourses } from "@/hooks/usePopularCourses";
import { Skeleton } from "../ui/skeleton";
import PlaceholderImage from "@/public/placeholder.svg";

function PopularCoursesSection() {
  const { data: courses, isLoading, error } = usePopularCourses();

  if (isLoading)
    return [...Array(3)].map((_, index) => (
      <Card
        key={index}
        className="overflow-hidden bg-white dark:bg-neutral-900 shadow-lg"
      >
        <Skeleton className="w-full h-48" />
        <CardHeader className="pb-2 pt-5">
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full rounded-md" />
        </CardFooter>
      </Card>
    ));

  if (error) return <div>Error: {error.message}</div>;

  return courses?.map((course) => (
    <div key={course.id}>
      <Card className="overflow-hidden bg-white dark:bg-neutral-900 shadow-lg h-full">
        <Image
          src={course.image ?? PlaceholderImage}
          alt={course.title}
          width={800}
          height={600}
          className="w-full h-48 object-cover"
        />
        <CardHeader className="pb-2 pt-5">
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
            <BookOpen className="h-4 w-4" />
            <span>{course.category}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            <Clock className="h-4 w-4" />
            <span>
              {Math.ceil((course?.completion_time ?? 30) / 60)}{" "}
              {Math.ceil((course?.completion_time ?? 30) / 60) < 1.01
                ? "hour"
                : "hours"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            <BarChart className="h-4 w-4" />
            <span>{course.level}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={`/courses/view/${course.slug}`}>View Course</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  ));
}

export default PopularCoursesSection;
