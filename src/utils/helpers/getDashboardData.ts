import { auth } from "@clerk/nextjs/server";
import { createClient } from "../supabase/server";
import { Course, CoursesProgress, ModuleProgress } from "@/lib/types";

export async function getDashboardData() {
  try {
    const supabase = await createClient();
    const authData = await auth();

    if (!authData.userId) {
      return { error: "User not authenticated" };
    }

    // Fetch enrolled courses and their details in a single query
    const [
      enrolledCoursesResult,
      recommendedCoursesResult,
      currentStreakResult,
      userPercentileResult,
    ] = await Promise.all([
      supabase
        .from("enrollments")
        .select(
          `*,
            course:course_id(*)
          `
        )
        .eq("user_id", authData.userId),
      supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase.rpc("get_current_streak", { p_user_id: authData.userId }),
      supabase.rpc("get_user_percentile", { p_user_id: authData.userId }),
    ]);

    if (enrolledCoursesResult.error) {
      throw new Error(
        `Error fetching enrolled courses: ${enrolledCoursesResult.error.message}`
      );
    }

    const enrolledCourses = enrolledCoursesResult.data
      .map((enrollment) => ({
        ...enrollment,
        course: enrollment.course as unknown as Course,
      }))
      .filter((enrollment) => !enrollment.course.draft);

    // Get course IDs and fetch progress data
    const enrolledCourseIds = enrolledCourses.map(
      (enrollment) => enrollment.course.id
    );

    const { data: courseProgress, error: courseProgressError } =
      await supabase.rpc("get_courses_progress", {
        p_course_ids: enrolledCourseIds,
        p_user_id: authData.userId,
      });

    if (courseProgressError) {
      throw new Error(
        `Error fetching course progress: ${courseProgressError.message}`
      );
    }

    // Process enrolled courses with progress
    const enrolledCoursesWithProgress = enrolledCourses.map((enrollment) => {
      const courseProgressData = (
        courseProgress as unknown as CoursesProgress
      )?.find((progress) => progress.course === enrollment.course.id);
      const progressItems = courseProgressData?.progress || [];

      return {
        ...enrollment,
        progressItems,
        totalProgress: calculateTotalProgress(progressItems),
        lastCompletedLessonDate: findLastCompletionDate(progressItems),
        totalTime: courseProgressData?.total_time || 0,
      };
    });

    // Filter out already enrolled courses from recommendations
    const enrolledIds = new Set(enrolledCourseIds);
    const filteredRecommendations = recommendedCoursesResult.data?.filter(
      (course) => !enrolledIds.has(course.id)
    );

    const overallProgress = enrolledCoursesWithProgress.reduce(
      (acc, curr) => acc + curr.totalProgress,
      0
    );

    const overallProgressPercentage = (
      overallProgress / enrolledCoursesWithProgress.length
    ).toFixed(0);

    return {
      enrolledCourses: enrolledCoursesWithProgress,
      recommendedCourses: filteredRecommendations,
      currentStreak: currentStreakResult.data,
      userPercentile: userPercentileResult.data,
      totalTime: enrolledCoursesWithProgress.reduce(
        (acc, curr) => acc + curr.totalTime,
        0
      ),
      overallProgress: overallProgressPercentage,
    };
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      enrolledCourses: null,
      recommendedCourses: null,
      currentStreak: null,
      userPercentile: null,
      overallProgress: null,
    };
  }
}

// Helper functions for cleaner code
function calculateTotalProgress(progressItems: ModuleProgress[]): number {
  if (!progressItems.length) return 0;
  return (
    progressItems.reduce((acc, curr) => acc + curr.progress_percentage, 0) /
    progressItems.length
  );
}

function findLastCompletionDate(
  progressItems: ModuleProgress[]
): string | null {
  return progressItems.reduce((latest: string | null, current) => {
    if (!current.completed_at) return latest;
    if (!latest) return current.completed_at;
    return new Date(current.completed_at) > new Date(latest)
      ? current.completed_at
      : latest;
  }, null);
}

export type EnrolledCourses = Awaited<
  ReturnType<typeof getDashboardData>
>["enrolledCourses"];
export type RecommendedCourses = Awaited<
  ReturnType<typeof getDashboardData>
>["recommendedCourses"];
