const ExampleQuestions = ({
	submitExampleQuestion,
}: {
	submitExampleQuestion: (question: string) => Promise<void>;
}) => {
	const exampleQuestions = [
		"What's the weather like at KBOS right now?",
		"Help me plan my cross-country flight",
		"What are the current conditions at KSFO?",
		"Explain the latest TAF at KJFK",
		"What is the weather in San Francisco right now?",
		"What does the PHAK say about PAVE?",
		"What is the best way to land in a C172?",
	];

	const randomQuestions = exampleQuestions
		.sort(() => Math.random() - 0.5)
		.slice(0, 4);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submitExampleQuestion((e.target as HTMLFormElement).question.value);
			}}
			className="flex justify-center items-center py-4 px-6"
		>
			<div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
				{randomQuestions.map((question, index) => (
					<button
						key={index}
						onClick={() => submitExampleQuestion(question)}
						className="p-4 text-sm text-gray-300 bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 rounded-lg transition-colors duration-200 text-left hover:border-gray-600"
					>
						<input
							type="text"
							name="question"
							defaultValue={question}
							className="hidden"
						/>
						{question}
					</button>
				))}
			</div>
		</form>
	);
};

export default ExampleQuestions;
