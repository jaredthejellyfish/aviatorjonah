import React from "react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import PostLink from "./link";
import PostImage from "./image";
import rehypePrettyCode from "rehype-pretty-code";
import { DetailedHTMLProps, HTMLAttributes } from "react";

const transformToSlug = (input: string) => {
	return input
		.toLowerCase()
		.trim()
		.split(" ")
		.join("-")
		.split("&")
		.join("-and-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-");
};

type HeadingProps = DetailedHTMLProps<
	HTMLAttributes<HTMLHeadingElement>,
	HTMLHeadingElement
>;

const generateHeading = (headingLevel: number) => {
	return function HeadingComponent(props: HeadingProps) {
		const { children, ...rest } = props;
		const textContent = React.Children.toArray(children).join("");
		const slug = transformToSlug(textContent);

		return React.createElement(`h${headingLevel}`, { id: slug, ...rest }, [
			React.createElement("a", {
				href: `#${slug}`,
				key: `link-${slug}`,
				className: "anchor-link",
			}),
			children,
		]);
	};
};

const mdxComponents = {
	h1: generateHeading(1),
	h2: generateHeading(2),
	h3: generateHeading(3),
	h4: generateHeading(4),
	Link: PostLink,
	Image: PostImage,
};

// Removed empty interface and just using MDXRemoteProps directly

interface RehypeNode {
	children: Array<{ type: string; value: string }>;
	properties: {
		className: string[];
	};
}

export function CustomMDX(props: MDXRemoteProps) {
	const rehypePrettyCodeOptions = {
		theme: "one-dark-pro",
		keepBackground: false,
		onVisitLine(node: RehypeNode) {
			if (node.children.length === 0) {
				node.children = [{ type: "text", value: " " }];
			}
		},
		onVisitHighlightedLine(node: RehypeNode) {
			node.properties.className.push("line--highlighted");
		},
		onVisitHighlightedWord(node: RehypeNode) {
			node.properties.className = ["word--highlighted"];
		},
	};

	return (
		<MDXRemote
			{...props}
			components={mdxComponents}
			options={{
				mdxOptions: {
					rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
				},
			}}
		/>
	);
}
