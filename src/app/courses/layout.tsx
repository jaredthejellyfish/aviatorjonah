import React from "react";

type Props = {
	children: React.ReactNode;
	modal: React.ReactNode;
};

function layout({ children, modal }: Props) {
	return (
		<div>
			{modal}
			{children}
		</div>
	);
}

export default layout;
