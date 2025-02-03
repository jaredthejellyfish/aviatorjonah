"use client";

import React, { useEffect, useState, useCallback, useId, useMemo } from "react";
import mermaid from "mermaid";
import { LoaderCircle, AlertTriangle } from "lucide-react";
import { debounce } from "lodash";

const MermaidDiagram = ({ chart }: { chart: string }) => {
	const [svg, setSvg] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isClient, setIsClient] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const uniqueId = useId();
	const diagramId = `mermaid-diagram-${uniqueId.replace(/:/g, "")}`;

	const renderDiagram = useCallback(
		async (chartData: string) => {
			try {
				// Initialize mermaid with default config
				mermaid.initialize({
					startOnLoad: false,
					theme: "neutral",
					securityLevel: "strict",
				});

				// Generate SVG
				const { svg } = await mermaid.render(diagramId, chartData);
				setSvg(svg);
				setIsLoading(false);
			} catch (err) {
				setError((err as Error).message);
				setIsLoading(false);
			}
		},
		[diagramId],
	);

	const debouncedRender = useMemo(
		() => debounce(renderDiagram, 500),
		[renderDiagram],
	);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (chart) {
			setIsLoading(true);
			debouncedRender(chart);
		}

		return () => {
			debouncedRender.cancel();
		};
	}, [chart, debouncedRender]);

	// Server-side or loading state
	if (!isClient || isLoading) {
		return (
			<div className="w-full p-4 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center h-[300px] gap-x-2">
				<LoaderCircle className="animate-spin" />
				<span className="text-sm text-slate-400">
					Getting your chart ready...
				</span>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="w-full p-4 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center h-[300px] text-red-500">
				<AlertTriangle className="w-4 h-4 mr-2" />
				<span>There was an error rendering the diagram.</span>
			</div>
		);
	}

	// Success state
	return (
		<div
			className="w-full overflow-auto p-4 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center"
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
};

export default MermaidDiagram;
