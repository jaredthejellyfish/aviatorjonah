/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@clerk/nextjs/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ["var(--font-inter)", "sans-serif"],
			},
			animation: {
				"bounce-small": "bounce 0.5s ease-in-out infinite",
				endless: "endless 20s linear infinite",
				shine: "shine 5s linear 500ms infinite",
				float: "float 2s ease-in-out infinite",
				"infinite-scroll": "infinite-scroll 40s linear infinite",
				"runway-move": "runway-move 10s linear infinite",
				"fade-in-up": "fade-in-up 0.8s ease-out forwards",
				"fade-in": "fade-in 1s ease-out forwards",
				"fade-in-delay-1": "fade-in 1s ease-out 0.2s forwards",
				"feature-card-1": "feature-card 0.8s ease-out forwards",
				"feature-card-2": "feature-card 0.8s ease-out 0.1s forwards",
				"feature-card-3": "feature-card 0.8s ease-out 0.2s forwards",
				"feature-card-4": "feature-card 0.8s ease-out 0.3s forwards",
				"feature-card-5": "feature-card 0.8s ease-out 0.4s forwards",
				"feature-card-6": "feature-card 0.8s ease-out 0.5s forwards",
			},
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1.5" }],
				sm: ["0.875rem", { lineHeight: "1.5715" }],
				base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.017em" }],
				lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.017em" }],
				xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.017em" }],
				"2xl": ["1.5rem", { lineHeight: "1.415", letterSpacing: "-0.017em" }],
				"3xl": ["1.875rem", { lineHeight: "1.333", letterSpacing: "-0.017em" }],
				"4xl": ["2.25rem", { lineHeight: "1.277", letterSpacing: "-0.017em" }],
				"5xl": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.017em" }],
				"6xl": ["3.5rem", { lineHeight: "1", letterSpacing: "-0.017em" }],
				"7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.017em" }],
			},
			letterSpacing: {
				tighter: "-0.02em",
				tight: "-0.01em",
				normal: "0",
				wide: "0.01em",
				wider: "0.02em",
				widest: "0.4em",
			},
			keyframes: {
				endless: {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-245px)" },
				},
				shine: {
					"0%": {
						top: "0",
						transform: "translateY(-100%) scaleY(10)",
						opacity: "0",
					},
					"2%": { opacity: ".5" },
					"40%": {
						top: "100%",
						transform: "translateY(0) scaleY(200)",
						opacity: "0",
					},
					"100%": {
						top: "100%",
						transform: "translateY(0) scaleY(1)",
						opacity: "0",
					},
				},
				float: {
					"0%": { transform: "translateY(3%)" },
					"50%": { transform: "translateY(-3%)" },
					"100%": { transform: "translateY(3%)" },
				},
				"infinite-scroll": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-100%)" },
				},
				"runway-move": {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-66.67%)" },
				},
				"fade-in-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(20px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"feature-card": {
					"0%": {
						opacity: "0",
						transform: "translateY(20px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
