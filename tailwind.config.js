/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			sans: "Helvetica",
			mono: "Courier",
		},
		extend: {
			colors: {
				main: "#0050f5",
				secondary: "#2D848A",
				back: "#fff",
				backAccent: "#f8f8f8",
				warning: "#f50000",
				currentColor: "currentColor",
			},
		},
	},
	plugins: [],
};
