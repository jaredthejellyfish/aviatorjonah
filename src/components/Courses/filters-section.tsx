"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";
import { CategoryFilters, LevelFilters } from "@/lib/types";
import {
	$searchTerm,
	$categoryFilter,
	$levelFilter,
	setSearchTerm,
	setCategoryFilter,
	setLevelFilter,
} from "@/stores/course-filters";

function FiltersSection() {
	const searchTerm = useStore($searchTerm);
	const categoryFilter = useStore($categoryFilter);
	const levelFilter = useStore($levelFilter);

	return (
		<div className="flex flex-col md:flex-row gap-4 mb-8">
			<div className="flex-grow relative">
				<Input
					type="text"
					placeholder="Search courses..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-indigo-400"
				/>
				<Search className="h-5 w-5 text-indigo-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
			</div>
			<Select
				value={categoryFilter}
				onValueChange={(value) => setCategoryFilter(value as CategoryFilters)}
			>
				<SelectTrigger className="w-full md:w-[200px] rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-indigo-400">
					<SelectValue placeholder="Category" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="All">All Categories</SelectItem>
					<SelectItem value="Fundamentals">Fundamentals</SelectItem>
					<SelectItem value="Navigation">Navigation</SelectItem>
					<SelectItem value="Technical">Technical</SelectItem>
					<SelectItem value="Meteorology">Meteorology</SelectItem>
					<SelectItem value="Safety">Safety</SelectItem>
					<SelectItem value="Legal">Legal</SelectItem>
					<SelectItem value="Physics">Physics</SelectItem>
					<SelectItem value="Career">Career</SelectItem>
				</SelectContent>
			</Select>
			<Select
				value={levelFilter}
				onValueChange={(value) => setLevelFilter(value as LevelFilters)}
			>
				<SelectTrigger className="w-full md:w-[200px] rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-indigo-400">
					<SelectValue placeholder="Level" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="All">All Levels</SelectItem>
					<SelectItem value="Beginner">Beginner</SelectItem>
					<SelectItem value="Intermediate">Intermediate</SelectItem>
					<SelectItem value="Advanced">Advanced</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}

export default FiltersSection;
