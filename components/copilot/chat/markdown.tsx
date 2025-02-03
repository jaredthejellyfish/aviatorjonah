import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import MermaidDiagram from "./mermaid";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface CodeProps extends React.HTMLProps<HTMLElement> {
	inline?: boolean;
}

const components: Components = {
	code: ({ inline, className, children, ...props }: CodeProps) => {
		const match = /language-(\w+)/.exec(className || "");

		if (!inline && match?.[1] === "mermaid") {
			return (
				<MermaidDiagram
					chart={String(children)
						.trim()
						.replace(/^```mermaid\n?/, "")
						.replace(/```$/, "")
						.trim()}
				/>
			);
		}

		return !inline && match ? (
			<pre
				{...(props as React.HTMLProps<HTMLPreElement>)}
				className={`${className} text-sm w-[80dvw] md:max-w-[500px] overflow-x-scroll rounded mt-2`}
			>
				<code className={match[1]}>{children}</code>
			</pre>
		) : (
			<code className={`${className} text-sm py-0.5 px-1 rounded`} {...props}>
				{children}
			</code>
		);
	},
	strong: ({ children, ...props }) => {
		return (
			<span className="font-semibold" {...props}>
				{children}
			</span>
		);
	},
};

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm, remarkMath]}
			rehypePlugins={[rehypeKatex]}
			components={components}
		>
			{children}
		</ReactMarkdown>
	);
};

export const Markdown = React.memo(
	NonMemoizedMarkdown,
	(prevProps, nextProps) => prevProps.children === nextProps.children,
);
