"use server";

import {
	AddLessonSchema,
	DeleteLessonSchema,
	UpdateLessonSchema,
} from "@/lib/schemas";
import canEdit from "@/utils/helpers/canEdit";
import { createClient } from "@/utils/supabase/server";

export async function addLesson(formData: FormData) {
	const rawData = {
		title: formData.get("title"),
		description: formData.get("description"),
		moduleId: formData.get("moduleId"),
	};

	const parsed = AddLessonSchema.safeParse(rawData);

	if (!parsed.success) {
		console.error(parsed.error);
		return { success: false };
	}

	const { allowed } = await canEdit();

	if (!allowed) return { success: false };

	const supabase = await createClient();

	const { error } = await supabase.from("lessons").insert({
		title: parsed.data.title,
		description: parsed.data.description,
		module_id: parsed.data.moduleId,
		content: "",
		order_index: 0,
	});

	if (error) {
		console.error(error);
		return { success: false };
	}

	return { success: true };
}

export async function removeLesson(formData: FormData) {
	const rawData = {
		lessonId: formData.get("lessonId"),
	};

	const parsed = DeleteLessonSchema.safeParse(rawData);

	if (!parsed.success) {
		console.error(parsed.error);
		return { success: false };
	}

	const { allowed } = await canEdit();

	if (!allowed) return { success: false };

	const supabase = await createClient();

	const { error } = await supabase
		.from("lessons")
		.delete()
		.eq("id", parsed.data.lessonId);

	if (error) {
		console.error(error);
		return { success: false };
	}

	return { success: true };
}

export async function updateLesson(formData: FormData) {
	const rawData = {
		lessonId: formData.get("lessonId"),
		title: formData.get("title") || undefined,
		description: formData.get("description") || undefined,
		content: formData.get("content") || undefined,
		orderIndex: formData.get("orderIndex") || 0,
	};

	const parsed = UpdateLessonSchema.safeParse(rawData);

	if (!parsed.success) {
		console.error(parsed.error);
		return { success: false, newSlug: null };
	}

	const { allowed } = await canEdit();

	if (!allowed) return { success: false, newSlug: null };

	const supabase = await createClient();

	const { error, data } = await supabase
		.from("lessons")
		.update({
			title: parsed.data.title,
			description: parsed.data.description,
			content: parsed.data.content,
			order_index: parsed.data.orderIndex,
		})
		.eq("id", parsed.data.lessonId)
		.select();

	if (error) {
		console.error(error);
		return { success: false, newSlug: null };
	}

	return {
		success: true,
		newSlug: rawData.title !== undefined ? data[0].slug : null,
	};
}
