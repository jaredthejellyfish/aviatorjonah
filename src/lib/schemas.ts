import { z } from "zod";

export const AddModuleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  courseId: z.string().min(1),
  orderIndex: z.number().min(0),
});

export const DeleteModuleSchema = z.object({
  moduleId: z.string(),
});

export const AddLessonSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  moduleId: z.string().min(1),
});

export const DeleteLessonSchema = z.object({
  lessonId: z.string(),
});

export const UpdateLessonSchema = z.object({
  lessonId: z.string().optional(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  orderIndex: z.number().min(0).optional(),
});

export const SelectedCourseSchema = z.object({
  id: z.string().optional(),
  price: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  slug: z.string(),
});
