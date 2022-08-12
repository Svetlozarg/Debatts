export default function ButtonHeader({ children, onClick, collapsed }) {
	return (
		<button
			type="button"
			onClick={onClick ?? null}
			className={`h-full px-2 md:px-4 mx-2 md:mx-4  transition-all duration-300 border-b-4 border-t-4 ${
				collapsed
					? "border-b-main hover:border-b hover:border-t  text-black"
					: "hover:bg-backAccent text-white hover:text-black"
			}`}
		>
			<span
				className={` text-currentColor whitespace-nowrap ${
					collapsed ? " " : ""
				}`}
			>
				{children}
			</span>
		</button>
	);
}
