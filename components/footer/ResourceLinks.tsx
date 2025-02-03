"use client";

import Link from "next/link";
import { useState } from "react";
import { ReportIssueForm } from "./ReportIssueForm";

export function ResourceLinks() {
	const [isReportFormOpen, setIsReportFormOpen] = useState(false);

	return (
		<>
			<div className="resources-links">
				<h6 className="text-white font-semibold mb-4">Resources</h6>
				<ul className="space-y-2">
					<li>
						<button
							onClick={() => setIsReportFormOpen(true)}
							className="py-1 transition-colors duration-300 hover:text-white"
						>
							Report an Issue
						</button>
					</li>
					<li>
						<Link
							href="/legal"
							className="py-1 transition-colors duration-300 hover:text-white"
						>
							Policy Center
						</Link>
					</li>
					<li>
						<Link
							href="/coming-soon"
							className="py-1 transition-colors duration-300 hover:text-white"
						>
							Brand Kit
						</Link>
					</li>
				</ul>
			</div>
			<ReportIssueForm
				isOpen={isReportFormOpen}
				onClose={() => setIsReportFormOpen(false)}
			/>
		</>
	);
}
