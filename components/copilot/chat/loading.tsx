import { Settings } from "lucide-react";
import BrandLogo from "./CoPilotLogo";

export const SidebarLoading = () => {
	return (
		<nav className="hidden lg:flex flex-col w-[280px] bg-slate-800/90 backdrop-blur-xl border-r border-slate-700 h-screen fixed top-0 left-0 z-30">
			{/* Logo Section */}
			<div className="border-b border-slate-800">
				<div className="h-14 flex items-center px-4">
					<BrandLogo />
				</div>
			</div>

			{/* Action Buttons */}
			<div className="p-2 space-y-1.5">
				<div className="flex items-center gap-2 w-full px-4 h-10 bg-blue-500/30 animate-pulse rounded-lg" />
				<div className="flex items-center gap-2 w-full px-4 h-10 bg-slate-700/30 animate-pulse rounded-lg" />
			</div>

			{/* Conversations List */}
			<div className="flex-1 py-2 overflow-y-auto scrollbar-hide space-y-4">
				{/* Today Section */}
				<div>
					<div className="px-4 py-2">
						<div className="h-3 w-16 bg-slate-700/30 animate-pulse rounded" />
					</div>
					<div className="space-y-1">
						{[1, 2, 3].map((i) => (
							<div key={i} className="px-4 py-2">
								<div className="h-5 w-full bg-slate-700/30 animate-pulse rounded" />
							</div>
						))}
					</div>
				</div>

				{/* Yesterday Section */}
				<div>
					<div className="px-4 py-2">
						<div className="h-3 w-20 bg-slate-700/30 animate-pulse rounded" />
					</div>
					<div className="space-y-1">
						{[1, 2].map((i) => (
							<div key={i} className="px-4 py-2">
								<div className="h-5 w-full bg-slate-700/30 animate-pulse rounded" />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Settings Button */}
			<div className="border-t border-slate-800">
				<div className="h-14 w-full flex items-center px-4">
					<div className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-800/50">
						<Settings className="w-4 h-4 text-slate-400" />
					</div>
					<div className="ml-3 h-4 w-16 bg-slate-700/30 animate-pulse rounded" />
				</div>
			</div>
		</nav>
	);
};
