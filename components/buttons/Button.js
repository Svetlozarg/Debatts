export default function Button({ onClick, type, children }) {
	return (
		<button
			onClick={onClick ?? null}
			type={type ?? "button"}
			className="rounded-md bg-main border-2 border-white py-1 px-3 text-white hover:bg-white hover:text-main transition-all duration-200 ease-in-out"
		>
			<strong className="text-currentColor">{children}</strong>
		</button>
	);
}
