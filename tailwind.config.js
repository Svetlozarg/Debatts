/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			main: "#0050f5",
			back: "#fff",
			backAccent: "#f8f8f8",
			warning: "#f50000",
			black: "#000",
			white: "#fff",
		},
		extend: {},
	},
	plugins: [],
};
