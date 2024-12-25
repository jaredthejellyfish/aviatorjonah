import Script from "next/script";
import React from "react";

function OneDollarStats() {
	return (
		<Script
			src="https://assets.onedollarstats.com/tracker.js"
			data-site-id="aviatorjonah.com"
			defer
		/>
	);
}

export default OneDollarStats;
