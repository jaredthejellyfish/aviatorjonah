"use client";

import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { PlayCircle, Book, Clock, BookOpen, BarChart } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  EnrolledCourses,
  RecommendedCourses,
} from "@/utils/helpers/getDashboardData";
import PlaceholderImage from "@/public/placeholder.svg";
import { motion } from "motion/react";

const MotionCard = motion.create(Card);
const MotionTableRow = motion.create(TableRow);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const CourseTable = ({
  enrolledCourses,
  recommendedCourses,
}: {
  enrolledCourses: EnrolledCourses;
  recommendedCourses: RecommendedCourses;
}) => {
  if (!enrolledCourses) return null;
  if (!recommendedCourses) return null;

  return (
    <Tabs defaultValue="enrolled" className="space-y-4">
      <TabsList>
        <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
        <TabsTrigger value="recommended">Recommended</TabsTrigger>
      </TabsList>
      <TabsContent value="enrolled" className="space-y-4">
        <motion.div
          className="space-y-5"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight"
            variants={fadeInUp}
          >
            Your Enrolled Courses
          </motion.h2>

          {/* Desktop view */}
          <motion.div
            className="hidden md:block rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
            variants={fadeInUp}
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-50 dark:bg-neutral-800/50">
                  <TableHead className="text-sm font-semibold">
                    Course
                  </TableHead>
                  <TableHead className="text-sm font-semibold">
                    Progress
                  </TableHead>
                  <TableHead className="text-sm font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-sm font-semibold text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrolledCourses?.map((enrolledCourse, index) => (
                  <MotionTableRow
                    key={enrolledCourse.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                    variants={fadeInUp}
                    custom={index}
                    initial="initial"
                    animate="animate"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Image
                            src={
                              enrolledCourse.course.image ?? PlaceholderImage
                            }
                            alt={enrolledCourse.course.title}
                            width={64}
                            height={64}
                            className="rounded-lg object-cover w-16 h-16"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-base">
                            {enrolledCourse.course.title}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-neutral-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {enrolledCourse.course.completion_time}m
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {enrolledCourse.progressItems.reduce(
                                (acc, item) => acc + item.total_lessons,
                                0,
                              )}{" "}
                              lessons
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {enrolledCourse.totalProgress.toFixed(0)}% Complete
                          </span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `66%`,
                          }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        >
                          <Progress
                            value={enrolledCourse.totalProgress}
                            className="h-2.5 bg-neutral-100 dark:bg-neutral-700 w-full"
                          />
                        </motion.div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {enrolledCourse.lastCompletedLessonDate ? (
                          <>
                            <div className="text-sm font-medium text-green-600 dark:text-green-500">
                              In Progress
                            </div>
                            <div className="text-xs text-neutral-500">
                              Last accessed{" "}
                              {formatDistanceToNow(
                                new Date(
                                  enrolledCourse.lastCompletedLessonDate,
                                ),
                                { addSuffix: true },
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm font-medium text-neutral-600">
                            Not Started
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <motion.div>
                        <Button
                          size="sm"
                          className={`transition-all duration-200 ${
                            enrolledCourse.totalProgress === 0
                              ? "bg-indigo-600 hover:bg-indigo-700"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white space-x-2 min-w-[120px]`}
                          asChild
                        >
                          <Link href={`/course/${enrolledCourse.course.slug}`}>
                            <PlayCircle className="w-4 h-4" />
                            <span>
                              {enrolledCourse.totalProgress === 0
                                ? "Start Course"
                                : "Continue"}
                            </span>
                          </Link>
                        </Button>
                      </motion.div>
                    </TableCell>
                  </MotionTableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>

          {/* Mobile and tablet view */}
          <motion.div
            className="lg:hidden grid gap-6 sm:grid-cols-2"
            variants={stagger}
          >
            {enrolledCourses.map((course, index) => (
              <MotionCard key={course.id} variants={fadeInUp} custom={index}>
                <CardHeader>
                  <Image
                    src={course.course.image ?? PlaceholderImage}
                    alt={course.course.title}
                    width={300}
                    height={200}
                    className="rounded-md object-cover w-full h-40"
                  />
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle>{course.course.title}</CardTitle>
                  <CardDescription>{course.course.category}</CardDescription>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      <Book className="w-3 h-3 mr-1" />
                      {course.course.level}
                    </Badge>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      {course.course.completion_time} mins
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">
                        {course.totalProgress.toFixed(0)}%
                      </span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `100%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    >
                      <Progress
                        value={course.totalProgress}
                        className="h-2 w-full"
                      />
                    </motion.div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last accessed:{" "}
                    {course.lastCompletedLessonDate
                      ? formatDistanceToNow(
                          new Date(course.lastCompletedLessonDate),
                          {
                            addSuffix: true,
                          },
                        )
                      : "Not started"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Time spent: {course.totalTime} mins
                  </p>
                </CardContent>
                <CardFooter>
                  <motion.div className="w-full">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      {course.totalProgress === 0 ? "Start Course" : "Continue"}
                    </Button>
                  </motion.div>
                </CardFooter>
              </MotionCard>
            ))}
          </motion.div>
        </motion.div>
      </TabsContent>
      <TabsContent value="recommended" className="space-y-4">
        <motion.h2
          className="text-3xl font-bold tracking-tight"
          variants={fadeInUp}
        >
          Recommended Courses
        </motion.h2>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {recommendedCourses?.map((course, index) => (
            <MotionCard key={course.id} variants={fadeInUp} custom={index}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  {course.image && (
                  <Image
                    src={course.image ?? PlaceholderImage}
                    alt={course.title ?? ""}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                    />
                  )}
                  <div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <BarChart className="w-4 h-4 mr-1" />
                    {course.level}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.completion_time} min
                  </div>
                </div>
                <motion.div>
                  <Link href={`/courses/view/${course.slug}`}>
                    <Button className="w-full">View Course</Button>
                  </Link>
                </motion.div>
              </CardContent>
            </MotionCard>
          ))}
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default CourseTable;
