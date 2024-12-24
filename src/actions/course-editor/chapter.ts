"use server";

import {
	AddChapterSchema,
	DeleteChapterSchema,
	UpdateChapterSchema,
} from "@/lib/schemas";
import canEdit from "@/utils/helpers/canEdit";
import { createClient } from "@/utils/supabase/server";

export async function addChapter(formData: FormData) {
	const rawData = {
		title: formData.get("title"),
		description: formData.get("description"),
		courseId: formData.get("courseId"),
		orderIndex: formData.get("orderIndex"),
	};

	const parsed = AddChapterSchema.safeParse(rawData);

	if (!parsed.success) {
		console.error(parsed.error);
		return { success: false };
	}

	const { allowed } = await canEdit();

	if (!allowed) return { success: false };

	const supabase = await createClient();

	const { title, description, courseId, orderIndex } = parsed.data;

	const { error } = await supabase.from("modules").insert({
		title,
		description,
		course_id: courseId,
		order_index: orderIndex,
	});

	if (error) {
		console.error(error);
		return { success: false };
	}

	return { success: true };
}

export async function removeChapter(formData: FormData) {
	const moduleId = formData.get("moduleId");

	const parsed = DeleteChapterSchema.safeParse({ moduleId });

	if (!parsed.success) {
		console.error(parsed.error);
		return { success: false };
	}

	const { allowed } = await canEdit();

	if (!allowed) return { success: false };

	const supabase = await createClient();

	const { error } = await supabase
		.from("modules")
		.delete()
		.eq("id", parsed.data.moduleId);

	if (error) {
		console.error(error);
		return { success: false };
	}

	return { success: true };
}

export async function updateChapter(formData: FormData) {
	const rawData = {
		title: formData.get("title"),
		description: formData.get("description"),
		moduleId: formData.get("moduleId"),
		orderIndex: formData.get("orderIndex"),
	};

	const parsed = UpdateChapterSchema.safeParse(rawData);

	if (!parsed.success) {
		console.error(parsed.error);
		return { success: false };
	}

	const { allowed } = await canEdit();

	if (!allowed) return { success: false };

	const supabase = await createClient();

	const { error } = await supabase
		.from("modules")
		.update({
			title: parsed.data.title,
			description: parsed.data.description,
			order_index: parsed.data.orderIndex,
		})
		.eq("id", parsed.data.chapterId);

	if (error) {
		console.error(error);
		return { success: false };
	}

	return { success: true };
}
