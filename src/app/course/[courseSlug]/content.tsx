"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Course } from "@/utils/helpers/getCourseBySlugWithProgress";
import Link from "next/link";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";

interface CourseProps {
  title: string;
  instructor: string;
  courseSlug: string;
  modules: NonNullable<Course>["modules"];
}

const formatDuration = (duration: number) => {
  if (duration >= 60) {
    return `${Math.ceil(duration / 60)} hr`;
  }
  return `${Math.ceil(duration / 60)} min`;
};

export default function Content({
  title,
  instructor,
  modules: unsortedModules,
  courseSlug,
}: CourseProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [openModules, setOpenModules] = useState<string[]>([]);

  const modules = unsortedModules
    .sort((a, b) => a.order_index - b.order_index)
    .map((module) => ({
      ...module,
      lessons: module.lessons.sort((a, b) => a.order_index - b.order_index),
    }));

  const currentModule = modules[currentModuleIndex];
  const currentLesson = currentModule.lessons[currentLessonIndex];

  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0,
  );
  const completedLessons = modules.reduce(
    (sum, module) =>
      sum +
      module.lessons.filter((lesson) => lesson.progress.length > 0).length,
    0,
  );
  const progressPercentage = (completedLessons / totalLessons) * 100;

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div className="flex items-center text-muted-foreground">
              <User className="mr-2 h-4 w-4" />
              <span>{instructor}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>Resume Course</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center p-4">
              <BookOpen className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Total Lessons</p>
                <p className="text-2xl font-bold">{totalLessons}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <CheckCircle className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedLessons}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <Clock className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Total Duration</p>
                <p className="text-2xl font-bold">
                  {formatDuration(
                    modules.reduce(
                      (sum, module) =>
                        sum +
                        module.lessons.reduce(
                          (sum, lesson) => sum + (lesson.reading_time ?? 0),
                          0,
                        ),
                      0,
                    ),
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{currentLesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {currentLesson.description}
              </p>
              <Link href={`/lesson/${courseSlug}/${currentLesson.slug}`}>
                <Button>Continue Lesson</Button>
              </Link>
            </CardContent>
          </Card>
          <Tabs defaultValue="content" className="w-full">
            <TabsList>
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <Card>
                <CardContent className="pt-6">
                  {modules.map((module, moduleIndex) => (
                    <Collapsible
                      key={module.id}
                      open={openModules.includes(module.id)}
                      onOpenChange={() => toggleModule(module.id)}
                    >
                      <CollapsibleTrigger className="flex justify-between items-center w-full p-2 rounded-md hover:bg-muted text-start">
                        <h3 className="text-lg font-semibold">
                          {module.title}
                        </h3>
                        {openModules.includes(module.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <ul className="space-y-2 mt-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li
                              key={lesson.id}
                              className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${
                                moduleIndex === currentModuleIndex &&
                                lessonIndex === currentLessonIndex
                                  ? "bg-primary/10 dark:text-white text-black text-primary-foreground"
                                  : "hover:bg-muted"
                              }`}
                              onClick={() => {
                                setCurrentModuleIndex(moduleIndex);
                                setCurrentLessonIndex(lessonIndex);
                              }}
                            >
                              <span className="flex items-center text-primary/70">
                                {lesson.progress.length > 0 ? (
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                ) : (
                                  <BookOpen className="mr-2 h-4 w-4" />
                                )}
                                {lesson.title}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {lesson.reading_time} min
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="discussion">
              <Card>
                <CardContent className="p-0">
                  <div className="p-3">
                    <p className="text-muted-foreground ">
                      Discussion forum for this lesson will be implemented here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <motion.div
            className="sticky top-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <Progress
                        value={progressPercentage}
                        className="mb-2 w-full"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      {((completedLessons / totalLessons) * 100).toFixed(2)}%
                      completed
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <p className="text-sm text-muted-foreground">
                  {completedLessons} of {totalLessons} lessons completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder-avatar.jpg"
                      alt={instructor}
                    />
                    <AvatarFallback>
                      {instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{instructor}</p>
                    <p className="text-sm text-muted-foreground">
                      Aviation Expert
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
