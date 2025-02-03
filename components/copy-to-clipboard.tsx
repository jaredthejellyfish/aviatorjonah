"use client";

import { Clipboard, ClipboardCheck } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

type Props = {
	text: string;
};

function CopyToClipboard({ text }: Props) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) {
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		}
	}, [copied]);

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => {
				navigator.clipboard.writeText(text);
				setCopied(true);
			}}
			className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-200"
		>
			{copied ? (
				<ClipboardCheck className="w-4 h-4 mt-2 mr-2 text-gray-400" />
			) : (
				<Clipboard className="w-4 h-4 mt-2 mr-2 text-gray-400" />
			)}
		</Button>
	);
}

export default CopyToClipboard;
