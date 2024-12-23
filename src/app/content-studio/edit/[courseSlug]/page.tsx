import React from "react";
import LeftSidebar from "@/components/CreatorStudio/Sidebar";
import { notFound } from "next/navigation";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";
import { BookOpen, CheckCircle, Clock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  params: Promise<{ courseSlug: string }>;
};

async function EditCoursePage({ params }: Props) {
  const courseSlug = (await params).courseSlug;

  const course = await getCourseBySlugWithProgress(courseSlug);

  if (!course) {
    return notFound();
  }
  return (
    <div className="grid md:grid-cols-[300px_1fr] grid-cols-1">
      <LeftSidebar course={course} courseSlug={courseSlug} />
      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="w-full">
                <Input
                  className="text-3xl h-9 font-bold mb-2 p-0 w-4/5"
                  defaultValue={course.title}
                  style={{ fontSize: "2.25rem" }}
                />
                <div className="flex items-center text-muted-foreground">
                  <User className="mr-2 h-4 w-4" />
                  <span>{course.instructor_name}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>
                  <span className="mr-2">Update Course</span>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex items-center p-4">
                  <BookOpen className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Lessons
                    </p>
                    <p className="text-2xl font-bold">
                      {course.modules.reduce(
                        (sum, module) => sum + module.lessons.length,
                        0,
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-4">
                  <CheckCircle className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {course.modules.reduce(
                        (sum, module) =>
                          sum +
                          module.lessons.filter(
                            (lesson) => lesson.progress.length > 0,
                          ).length,
                        0,
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-4">
                  <Clock className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Duration
                    </p>
                    <p className="text-2xl font-bold">
                      {formatDuration({
                        hours: Math.floor(
                          course.modules.reduce(
                            (sum, module) =>
                              sum +
                              module.lessons.reduce(
                                (sum, lesson) =>
                                  sum + (lesson.reading_time ?? 0),
                                0,
                              ),
                            0,
                          ) / 3600,
                        ),
                        minutes: Math.floor(
                          (course.modules.reduce(
                            (sum, module) =>
                              sum +
                              module.lessons.reduce(
                                (sum, lesson) =>
                                  sum + (lesson.reading_time ?? 0),
                                0,
                              ),
                            0,
                          ) %
                            3600) /
                            60,
                        ),
                        seconds:
                          course.modules.reduce(
                            (sum, module) =>
                              sum +
                              module.lessons.reduce(
                                (sum, lesson) =>
                                  sum + (lesson.reading_time ?? 0),
                                0,
                              ),
                            0,
                          ) % 60,
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="h-32"
                    defaultValue={course.description || ""}
                  />
                </CardContent>
              </Card>
              <Tabs defaultValue="content" className="w-full">
                <TabsList>
                  <TabsTrigger value="content">Course Content</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>
                <TabsContent value="discussion">
                  <Card>
                    <CardContent className="p-0">
                      <div className="p-3">
                        <p className="text-muted-foreground ">
                          Discussion forum for this lesson will be implemented
                          here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <div className="sticky top-8">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <Progress value={0} className="mb-2 w-full" />
                        </TooltipTrigger>
                        <TooltipContent>% completed</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <p className="text-sm text-muted-foreground">
                      {0} of {0} lessons completed
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
                          alt={course.instructor_name || "Instructor"}
                        />
                        <AvatarFallback>
                          {course.instructor_name
                            ? course.instructor_name.charAt(0)
                            : "AI"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{course.instructor_name}</p>
                        <p className="text-sm text-muted-foreground">
                          Aviation Expert
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCoursePage;
