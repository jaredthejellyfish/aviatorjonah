interface LoadingStepProps {
	toolName: string;
}

export function LoadingStep({ toolName }: LoadingStepProps) {
	return (
		<div className="border border-gray-700 rounded-lg p-4 my-2 bg-gray-800/50">
			<div className="flex items-center gap-2">
				<div className="w-4 h-4 rounded-full bg-gray-600 animate-pulse" />
				<div className="text-gray-400 text-sm">Processing {toolName}...</div>
			</div>
		</div>
	);
}
