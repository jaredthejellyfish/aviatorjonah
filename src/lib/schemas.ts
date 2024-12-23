import { z } from "zod";

export const AddChapterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  courseId: z.string().min(1),
  orderIndex: z.coerce.number().int().positive(),
});

export const DeleteChapterSchema = z.object({
  moduleId: z.string(),
});

export const UpdateChapterSchema = z.object({
  chapterId: z.string().min(1),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  orderIndex: z.number().min(0).optional(),
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
  lessonId: z.string(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  orderIndex: z.coerce.number().int(),
});

export const SelectedCourseSchema = z.object({
  id: z.string().optional(),
  price: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  slug: z.string(),
});

export const CreateCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.string().transform((val) => parseFloat(val)),
  category: z.enum(["programming", "design", "business", "marketing"]),
  level: z.enum(["beginner", "intermediate", "advanced"]),
});

export const UpdateCourseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .optional(),
  category: z
    .enum(["programming", "design", "business", "marketing"])
    .optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  draft: z.boolean().optional(),
  image: z.string().optional(),
});

export const CreateChapterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  courseId: z.string().min(1),
  orderIndex: z.number().min(0),
});
