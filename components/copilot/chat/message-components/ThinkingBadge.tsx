export function ThinkingBadge() {
	return (
		<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700">
			<div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
			<span className="text-sm text-gray-300">Thinking...</span>
		</div>
	);
}
