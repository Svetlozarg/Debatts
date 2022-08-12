export default function ButtonHeader({ children, onClick, collapsed }) {
	return (
		<button
			type="button"
			onClick={onClick ?? null}
			className={`h-full px-4 mx-2 transition-all duration-300 border-b-4 border-transparent ${
				collapsed
					? "border-main hover:border-b hover:-mt-[2.5px] text-black"
					: "hover:bg-backAccent text-white hover:text-black"
			}`}
		>
			<span className={` text-currentColor ${collapsed ? " " : ""}`}>
				{children}
			</span>
		</button>
	);
}
