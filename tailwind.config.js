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
				back: "#fff",
				backAccent: "#ebebeb",
				warning: "#f50000",
				currentColor: "currentColor",
			},
		},
	},
	plugins: [],
};
