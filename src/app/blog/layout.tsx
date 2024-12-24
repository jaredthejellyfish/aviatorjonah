import React from "react";

type Props = {
	children: React.ReactNode;
	article: React.ReactNode;
};

function BlogLayout({ children, article }: Props) {
	return (
		<div>
			{article}
			{children}
		</div>
	);
}

export default BlogLayout;
