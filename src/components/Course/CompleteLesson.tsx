"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Course } from "@/utils/helpers/getCourseBySlugWithProgress";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function completeLesson(
  takeaway: string,
  lesson_id: string,
  course_id?: string
) {
  if (!course_id) {
    throw new Error("Course ID is required");
  }

  try {
    const response = await fetch("/api/complete-lesson", {
      method: "POST",
      body: JSON.stringify({ takeaway, lesson_id, course_id }),
    });

    return (await response.json()) as { message: string; details?: string };
  } catch (error) {
    console.error("Error completing lesson:", error);
    throw error;
  }
}

function CompleteLesson({
  course,
  currentLessonSlug,
}: {
  course: Course;
  currentLessonSlug: string;
}) {
  const router = useRouter();
  const [takeaway, setTakeaway] = useState("");
  const { mutate: createComment } = useMutation({
    mutationFn: (takeaway: string) => {
      const currentLesson = sortedLessons[currentLessonIndex];
      return completeLesson(takeaway, currentLesson.id, course?.id);
    },
    onSuccess: () => {
      toast.success("Lesson completed successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to complete lesson");
    },
  });

  if (!course) {
    return null;
  }

  // Sort modules and lessons by their order_index
  const sortedModules = [...course.modules].sort(
    (a, b) => a.order_index - b.order_index
  );

  // Find the index of the module containing the current lesson
  const currentModuleIndex = sortedModules.findIndex((module) =>
    module.lessons.some((lesson) => lesson.slug === currentLessonSlug)
  );

  if (currentModuleIndex === -1) {
    return null;
  }

  // Extract and sort the lessons of the current module
  const currentModule = sortedModules[currentModuleIndex];
  const sortedLessons = [...currentModule.lessons].sort(
    (a, b) => a.order_index - b.order_index
  );

  // Find the index of the current lesson within the current module
  const currentLessonIndex = sortedLessons.findIndex(
    (lesson) => lesson.slug === currentLessonSlug
  );

  const isLastModuleLesson = currentLessonIndex === sortedLessons.length - 1;
  const isLastModule = currentModuleIndex === sortedModules.length - 1;
  const isCourseComplete = isLastModuleLesson && isLastModule;

  let nextDestination = { href: "", text: "" };

  if (!isCourseComplete) {
    if (!isLastModuleLesson) {
      // Move to the next lesson in the same module
      const nextLesson = sortedLessons[currentLessonIndex + 1];
      nextDestination = {
        href: `/lesson/${course.slug}/${nextLesson.slug}`,
        text: "Next Lesson",
      };
    } else {
      // Move to the first lesson of the next module
      const nextModule = sortedModules[currentModuleIndex + 1];
      const nextModuleLessons = [...nextModule.lessons].sort(
        (a, b) => a.order_index - b.order_index
      );
      const firstLessonOfNextModule = nextModuleLessons[0];
      nextDestination = {
        href: `/lesson/${course.slug}/${firstLessonOfNextModule.slug}`,
        text: "Next Module",
      };
    }
  } else {
    // Course completed
    nextDestination = {
      href: `/course/${course.slug}`,
      text: "Back to Course",
    };
  }

  const currentLesson = sortedLessons[currentLessonIndex];

  const currentLessonProgress = currentLesson.progress;

  console.log(currentLessonProgress[0]);

  return (
    <Card className="mt-10 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          {currentLessonProgress?.[0]?.completed ? (
            <>
              <CheckCircle className="h-6 w-6 text-green-500" />
              {isCourseComplete ? "Course Completed!" : "Lesson Completed!"}
            </>
          ) : (
            <>
              <CheckCircle className="h-6 w-6 text-gray-400" />
              Complete this lesson
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentLessonProgress?.[0]?.completed ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Completed on{" "}
              {currentLessonProgress[0].completed_at
                ? new Date(
                    currentLessonProgress[0].completed_at
                  ).toLocaleDateString()
                : ""}
            </p>
            <Textarea
              value={currentLessonProgress[0].takeaways}
              className="min-h-[100px]"
              disabled
            />
          </div>
        ) : (
          <Textarea
            placeholder="What did you learn from this lesson?"
            value={takeaway}
            onChange={(e) => setTakeaway(e.target.value)}
            className="min-h-[100px]"
          />
        )}
      </CardContent>
      <CardFooter>
        {currentLessonProgress?.[0]?.completed ? (
          <Button size="lg" className="w-full sm:w-auto dark:text-black text-white" asChild>
            <Link
              href={nextDestination.href}
              className="flex items-center justify-center gap-2"
            >
              {nextDestination.text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full sm:w-auto dark:text-black text-white"
            onClick={() => createComment(takeaway)}
          >
            Complete Lesson
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default CompleteLesson;
