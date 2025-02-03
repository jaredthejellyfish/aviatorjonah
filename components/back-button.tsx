"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton() {
	const router = useRouter();
	return (
		<Button
			variant="ghost"
			className="text-gray-300 hover:text-gray-50 hover:bg-gray-800/50 group"
			onClick={() => router.back()}
		>
			<ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
			Go Back
		</Button>
	);
}

export default BackButton;
