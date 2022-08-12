export default function Button({ onClick, type, children }) {
	return (
		<button
			onClick={onClick ?? null}
			type={type ?? "button"}
			className="rounded-md bg-transparent shadow py-1 px-3 hover:bg-white/40  transition-all duration-200 ease-in-out"
		>
			<span className="text-currentColor">{children}</span>
		</button>
	);
}
