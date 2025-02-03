import React from "react";
import { Plane } from "lucide-react";
import { toast } from "sonner";

const CompletionStep: React.FC = () => {
	return (
		<div className="space-y-6">
			<div className="flex justify-center mb-6">
				<div className="bg-cyan-500 p-4 rounded-full">
					<Plane className="w-12 h-12 text-black" />
				</div>
			</div>

			<h3 className="text-2xl font-bold text-center text-cyan-500 mb-4">
				You&apos;re All Set!
			</h3>

			<p className="text-gray-300 text-center mb-6">
				Your CoPilot is configured and ready to assist you with your aviation
				journey.
			</p>

			<div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
				<h4 className="text-lg font-semibold text-cyan-500 mb-3">
					Important: Complete Your Profile
				</h4>
				<p className="text-gray-300 mb-4">
					To unlock all features and get personalized recommendations, please
					upload your pilot documentation (certificates, medical, and logbook)
					in the Documents section.
				</p>
				<button
					onClick={() => {
						try {
							window.location.href = "/documents";
						} catch (error) {
							console.error("Navigation error:", error);
							toast.error("Failed to navigate to documents. Please try again.");
						}
					}}
					className="w-full bg-cyan-500 text-black py-3 px-4 rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center space-x-2 font-semibold"
				>
					<span>Upload Documents →</span>
				</button>
			</div>
		</div>
	);
};

export default CompletionStep;
