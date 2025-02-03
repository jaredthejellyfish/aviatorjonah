// components/tabs/PoliciesTab.tsx
import Link from "next/link";
import Cookies from "js-cookie";

export function PoliciesTab() {
	const handleClearData = () => {
		const confirmed = window.confirm(
			"Are you sure you want to clear all data? This cannot be undone.",
		);
		if (!confirmed) return;

		try {
			// Get all cookies
			const cookies = Cookies.get();

			// Remove each cookie
			Object.keys(cookies).forEach((cookie) => {
				Cookies.remove(cookie);
			});

			// Clear localStorage
			localStorage.clear();

			alert("All cookies and local storage data have been cleared.");
		} catch (error) {
			console.error("Error clearing data:", error);
			alert("Failed to clear data. Please try again.");
		}
	};

	return (
		<div className="space-y-8 max-w-2xl p-6">
			<div className="space-y-6">
				{/* Links Section */}
				<div className="space-y-4">
					<h4 className="text-sm font-medium text-slate-200">
						Legal Documents
					</h4>
					<div className="space-y-3">
						<Link
							href="/privacy"
							className="block text-blue-400 hover:text-blue-300 transition-colors"
							target="_blank"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="block text-blue-400 hover:text-blue-300 transition-colors"
							target="_blank"
						>
							Terms of Service
						</Link>
					</div>
				</div>

				{/* Divider */}
				<div className="h-px bg-slate-700/50" />

				{/* Cookie Management */}
				<div className="space-y-4">
					<div className="space-y-1">
						<h4 className="text-sm font-medium text-slate-200">
							Cookie Preferences
						</h4>
						<p className="text-sm text-slate-400">
							Clear all cookies and local storage data stored by CoPilot on this
							device.
						</p>
					</div>

					<button
						onClick={handleClearData}
						className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-lg font-medium transition-all"
					>
						Clear Data
					</button>
				</div>
			</div>
		</div>
	);
}
