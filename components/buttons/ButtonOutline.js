export default function ButtonOutline({
	type,
	onClick,
	children,
	active,
	negative = false,
}) {
	return (
		<button
			onClick={onClick ?? null}
			type={type ?? "button"}
			className={`rounded-md bg-white border-2  py-1 px-3  hover:fill-white  hover:text-white transition-all duration-200 ease-in-out"
                ${active ? "!fill-white !text-white " : ""} ${
				negative
					? "border-warning text-warning fill-warning hover:bg-warning"
					: "border-main text-main fill-main hover:bg-main"
			} ${active ? (negative ? "!bg-warning" : "!bg-main") : ""}`}
		>
			{children}
		</button>
	);
}
