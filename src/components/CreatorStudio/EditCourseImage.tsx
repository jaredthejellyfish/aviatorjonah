"use client";

import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Pencil, Loader2 } from "lucide-react";
import Image from "next/image";
import PlaceholderImage from "@/public/placeholder.svg";
import { toast } from "sonner";
import { useSupabaseClientWithAuth } from "@/hooks/useSupabaseClientWithAuth";
import { useRouter } from "next/navigation";

type Props = {
	courseTitle: string;
	courseImage: string | null;
	courseId: string;
};

function EditCourseImage({ courseTitle, courseImage, courseId }: Props) {
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const supabase = useSupabaseClientWithAuth();
	const router = useRouter();

	const handleEditImage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Get file extension from original file
		const fileExtension = file.name.split(".").pop();

		// Validate file type
		if (!file.type.startsWith("image/")) {
			toast.error("Please select an image file");
			return;
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			toast.error("Image size should be less than 5MB");
			return;
		}

		setIsUploading(true);
		try {
			// Upload to Supabase storage with new filename
			const { error: uploadError } = await supabase.storage
				.from("course-photos")
				.upload(`${courseId}/header.${fileExtension}`, file, {
					cacheControl: "3600",
					upsert: true,
				});

			if (uploadError) throw uploadError;

			// Get public URL with new filename
			const {
				data: { publicUrl },
			} = supabase.storage
				.from("course-photos")
				.getPublicUrl(`${courseId}/header.${fileExtension}`);

			// Update course record with new image URL
			const { error: updateError } = await supabase
				.from("courses")
				.update({ image: publicUrl })
				.eq("id", courseId);

			if (updateError) throw updateError;

			toast.success("Course image updated successfully");
			// Force a page refresh to show the new image
			router.refresh();
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("Failed to upload image");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4 bg-black p-4 mb-4 rounded-md">
			<div className="flex justify-between items-center">
				<h3 className="text-2xl font-bold">Course Image</h3>
				<Button onClick={handleEditImage} disabled={isUploading}>
					{isUploading ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							<span className="ml-2">Uploading...</span>
						</>
					) : (
						<>
							<Pencil className="h-4 w-4" />
							<span className="ml-2">Edit Image</span>
						</>
					)}
				</Button>
			</div>
			<div className="w-full h-[200px] relative">
				<Image
					src={courseImage ?? PlaceholderImage}
					alt={courseTitle}
					fill
					className="object-cover rounded-md"
				/>
			</div>
			<input
				type="file"
				ref={fileInputRef}
				className="hidden"
				accept="image/*"
				onChange={handleFileChange}
			/>
		</div>
	);
}

export default EditCourseImage;
