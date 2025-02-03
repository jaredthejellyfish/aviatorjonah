import React from "react";

const BrandLogo = () => {
	return (
		<div className="flex items-center px-2">
			<div className="relative group cursor-pointer">
				{/* Modern gradient background effect */}
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 rounded-lg blur-lg transform group-hover:scale-110 transition-transform duration-500 ease-out" />

				{/* Brand text container */}
				<div className="relative flex items-baseline space-x-2">
					{/* CoPilot text */}
					<span className="text-lg font-semibold tracking-tight">
						<span className="text-white">CoPilot</span>
					</span>

					{/* Animated separator */}
					<span className="text-blue-400 font-light transform group-hover:rotate-180 transition-transform duration-500 ease-out">
						x
					</span>

					{/* AviatorJonah text */}
					<span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300 text-transparent bg-clip-text group-hover:from-blue-300 group-hover:via-indigo-300 group-hover:to-blue-200 transition-all duration-500">
						AviatorJonah
					</span>
				</div>

				{/* Modern underline effect */}
				<div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300 group-hover:w-full transition-all duration-500 ease-out rounded-full" />
			</div>
		</div>
	);
};

export default BrandLogo;
