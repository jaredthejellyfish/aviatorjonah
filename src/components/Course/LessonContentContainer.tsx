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
			className={`grid grid-cols-1 md:grid-cols-[300px_1fr] transition-[grid-template-columns] duration-300 ease-in-out lg:grid-cols-[300px_1fr_${isSectionsOpen ? "250px" : "0px"}]`}
		>
			{children}
		</div>
	);
}

export default LessonContentContainer;
