"use client";

import Hero from "./hero";
import CourseCategories from "./course-categories";
import CourseList from "./course-list";
import NeedHelp from "./need-help";

export default function CourseContent() {
	return (
		<div className="pt-16">
			<Hero />
			<CourseCategories />
			<CourseList />
			<NeedHelp />
		</div>
	);
}
