export default function ButtonOutline({ type, onClick, children }) {
	return (
		<button
			onClick={onClick ?? null}
			type={type ?? "button"}
			className="rounded-md bg-white border-2 border-main py-1 px-3 text-main hover:bg-main hover:text-white transition-all duration-200 ease-in-out"
		>
			<strong className="text-currentColor">{children}</strong>
		</button>
	);
}
