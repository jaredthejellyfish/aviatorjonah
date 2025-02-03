// components/tabs/BugReportTab.tsx
import { useState } from "react";
import { TabProps } from "components/copilot/settings/types";
import { BUILD_VERSION } from "components/copilot/settings/constants";

export function BugReportTab({ isSubmitting, onSubmit }: TabProps) {
	const [bugTitle, setBugTitle] = useState("");
	const [bugDescription, setBugDescription] = useState("");
	const [bugSteps, setBugSteps] = useState("");

	return (
		<div className="space-y-8 max-w-2xl p-6">
			<div className="space-y-6">
				<div className="space-y-2">
					<label className="block text-sm font-medium text-slate-200">
						Issue Title
					</label>
					<input
						type="text"
						value={bugTitle}
						onChange={(e) => setBugTitle(e.target.value)}
						placeholder="Brief description of the issue"
						className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-md text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-medium text-slate-200">
						Description
					</label>
					<textarea
						value={bugDescription}
						onChange={(e) => setBugDescription(e.target.value)}
						placeholder="Detailed description of what happened..."
						rows={4}
						className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-md text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-medium text-slate-200">
						Steps to Reproduce
					</label>
					<textarea
						value={bugSteps}
						onChange={(e) => setBugSteps(e.target.value)}
						placeholder="1. First step&#10;2. Second step&#10;3. ..."
						rows={4}
						className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-md text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-medium text-slate-200">
						Build Version
					</label>
					<input
						type="text"
						value={BUILD_VERSION}
						disabled
						className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-md text-slate-400 cursor-not-allowed"
					/>
				</div>

				<button
					onClick={onSubmit}
					disabled={isSubmitting}
					className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				>
					{isSubmitting ? "Submitting..." : "Submit Bug Report"}
				</button>
			</div>
		</div>
	);
}
