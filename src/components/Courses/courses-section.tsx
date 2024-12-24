"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Clock, BarChart } from "lucide-react";
import Image from "next/image";
import {
  $searchTerm,
  $categoryFilter,
  $levelFilter,
} from "@/stores/course-filters";
import { useStore } from "@nanostores/react";
import { Courses } from "@/utils/helpers/getAllCourses";

type Props = {
  courses: Courses;
};

function CoursesSection({ courses }: Props) {
  const searchTerm = useStore($searchTerm);
  const categoryFilter = useStore($categoryFilter);
  const levelFilter = useStore($levelFilter);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "All" || course.category === categoryFilter) &&
      (levelFilter === "All" || course.level === levelFilter),
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredCourses.map((course) => (
        <motion.div key={course.id} variants={itemVariants}>
          <Card className="overflow-hidden bg-white dark:bg-neutral-900 shadow-lg">
            {course.image && (
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
            )}
            <CardHeader className="pb-2 pt-5">
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <BookOpen className="h-4 w-4" />
                <span>{course.category || "Unknown"}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                <Clock className="h-4 w-4" />
                <span>
                  {Math.ceil((course.completion_time ?? 0) / 60) + " hours" ||
                    "Unknown"}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                <BarChart className="h-4 w-4" />
                <span>{course.level || "Unknown"}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/courses/view/${course.slug}`}>View Course</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
      {filteredCourses.length === 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-neutral-600 dark:text-neutral-400">
            No courses found.
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CoursesSection;
