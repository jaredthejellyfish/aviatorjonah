"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function BackButton() {
	const router = useRouter();

	return (
		<Button
			onClick={() => router.back()}
			className="absolute top-5 left-5 inline-flex items-center transition-colors mb-8 z-20"
		>
			<ArrowLeft className="mr-2 h-4 w-4" />
			Back to Blog
		</Button>
	);
}

export default BackButton;
