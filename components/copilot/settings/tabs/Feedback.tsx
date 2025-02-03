// components/tabs/FeedbackTab.tsx
import { useState } from "react";
import { TabProps } from "components/copilot/settings/types";

export function FeedbackTab({ isSubmitting, onSubmit }: TabProps) {
	const [feedbackType, setFeedbackType] = useState("");
	const [feedback, setFeedback] = useState("");

	return (
		<div className="space-y-8 max-w-2xl p-6">
			<div className="space-y-2">
				<label className="block text-sm font-medium text-slate-200">
					Feedback Type
				</label>
				<select
					value={feedbackType}
					onChange={(e) => setFeedbackType(e.target.value)}
					className="w-full h-10 pl-3 pr-10 bg-slate-700/50 border border-slate-600/50 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
				>
					<option value="" disabled>
						Select feedback type
					</option>
					<option value="bug" className="bg-slate-800">
						Bug Report
					</option>
					<option value="feature" className="bg-slate-800">
						Feature Request
					</option>
					<option value="improvement" className="bg-slate-800">
						Improvement Suggestion
					</option>
					<option value="other" className="bg-slate-800">
						Other
					</option>
				</select>
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-slate-200">
					Your Feedback
				</label>
				<textarea
					value={feedback}
					onChange={(e) => setFeedback(e.target.value)}
					placeholder="Tell us what you think..."
					rows={6}
					className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-md text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
				/>
			</div>

			<div className="pt-4">
				<button
					onClick={onSubmit}
					disabled={isSubmitting}
					className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				>
					{isSubmitting ? "Submitting..." : "Submit Feedback"}
				</button>
			</div>
		</div>
	);
}
