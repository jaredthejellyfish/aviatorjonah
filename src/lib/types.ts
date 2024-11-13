import { Database } from "@/utils/supabase/db-types";

export type CategoryFilters =
  | "All"
  | "Fundamentals"
  | "Navigation"
  | "Technical"
  | "Meteorology"
  | "Safety"
  | "Legal"
  | "Physics"
  | "Career";
export type LevelFilters = "All" | "Beginner" | "Intermediate" | "Advanced";

export type Course = Database["public"]["Tables"]["courses"]["Row"];

export type CoursesProgress = {
  course: string;
  progress: ModuleProgress[];
  total_time: number;
}[];

export type ModuleProgress = {
  module_id: string;
  completed_at: string | null;
  module_title: string;
  total_lessons: number;
  completed_lessons: number;
  progress_percentage: number;
};
