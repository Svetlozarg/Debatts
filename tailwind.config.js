/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			sans: "Open Sans",
			mono: "Open Sans",
		},
		extend: {
			colors: {
				main: "#0050f5",
				secondary: "#e93f08",
				back: "#fff",
				backAccent: "#f8f8f8",
				warning: "#f50000",
				currentColor: "currentColor",
			},
		},
	},
	plugins: [],
};
