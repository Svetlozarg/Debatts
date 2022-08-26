export default function ButtonOutline({ type, onClick, children, active }) {
	return (
		<button
			onClick={onClick ?? null}
			type={type ?? "button"}
			className={`rounded-md bg-white border-2 border-main py-1 px-3 text-main fill-main hover:fill-white hover:bg-main hover:text-white transition-all duration-200 ease-in-out"
                ${active ? "!fill-white !text-white !bg-main" : ""}`}
		>
			{children}
		</button>
	);
}
