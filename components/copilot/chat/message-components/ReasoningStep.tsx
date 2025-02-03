interface ReasoningStepProps {
	title: string;
	content: string;
}

export function ReasoningStep({ title, content }: ReasoningStepProps) {
	return (
		<div className="border border-blue-500/20 rounded-lg p-4 my-2 bg-blue-500/5">
			<div className="flex items-center gap-2 mb-2">
				<div className="w-4 h-4 rounded-full bg-blue-500/20 animate-pulse" />
				<div className="font-medium text-blue-400">{title}</div>
			</div>
			<div className="text-gray-300 text-sm pl-6 line-clamp-4">{content}</div>
		</div>
	);
}
