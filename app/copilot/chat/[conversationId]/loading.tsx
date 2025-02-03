import React from "react";

export default function Loading() {
	return (
		<div className="flex flex-col h-[calc(100vh)] pl-[20rem] pr-6 mx-auto w-full">
			{/* Messages Container */}
			<div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
				{/* Loading Messages */}
				{[...Array(3)].map((_, i) => (
					<div key={i} className="space-y-6">
						{/* User Message */}
						<div className="message p-4 rounded-lg bg-gray-800/50 shadow-sm animate-pulse">
							<div className="font-medium text-gray-300 mb-2">User:</div>
							<div className="h-4 bg-gray-700 rounded w-3/4" />
						</div>

						{/* Assistant Message */}
						<div className="space-y-4">
							{/* Tool Call Loading State */}
							<div className="border border-gray-700 rounded-lg p-4 my-2 bg-gray-800/50 animate-pulse">
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 rounded-full bg-gray-600" />
									<div className="h-4 bg-gray-700 rounded w-1/4" />
								</div>
							</div>

							{/* Assistant Response Loading State */}
							<div className="message p-4 rounded-lg bg-gray-800/50 shadow-sm animate-pulse">
								<div className="font-medium text-gray-300 mb-2">Assistant:</div>
								<div className="space-y-2">
									<div className="h-4 bg-gray-700 rounded w-full" />
									<div className="h-4 bg-gray-700 rounded w-5/6" />
									<div className="h-4 bg-gray-700 rounded w-4/6" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Input and Controls Container */}
			<div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm py-4">
				<div className="flex gap-2">
					<div className="relative flex-1">
						<div className="w-full px-4 py-3 bg-gray-800/90 border border-gray-700 rounded-lg animate-pulse h-[46px]" />
					</div>
					<div className="w-[58px] h-[46px] bg-blue-600/50 rounded-lg animate-pulse" />
				</div>
			</div>
		</div>
	);
}
