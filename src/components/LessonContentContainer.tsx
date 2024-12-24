"use client";

import { cn } from "@/lib/utils";
import { $isSectionsOpen } from "@/stores/sections-store";
import { useStore } from "@nanostores/react";
import React from "react";

type Props = { children: React.ReactNode };

function LessonContentContainer({ children }: Props) {
	const isSectionsOpen = useStore($isSectionsOpen);
 
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-[300px_1fr] ",
				isSectionsOpen ? "lg:grid-cols-[300px_1fr_250px]" : "grid-cols-[300px_1fr_0fr]",
			)}
		>
			{children}
		</div>
	);
}

export default LessonContentContainer;
