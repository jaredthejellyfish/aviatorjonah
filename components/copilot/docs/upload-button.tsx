"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";

const UploadModal = dynamic(() => import("./upload-modal"), {
	ssr: false,
});

export function UploadButton() {
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

	return (
		<>
			<Button
				className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white gap-2"
				onClick={() => setIsUploadModalOpen(true)}
			>
				<Upload className="h-4 w-4" />
				Upload Document
			</Button>
			{isUploadModalOpen && (
				<UploadModal
					isOpen={isUploadModalOpen}
					onClose={() => setIsUploadModalOpen(false)}
				/>
			)}
		</>
	);
}
