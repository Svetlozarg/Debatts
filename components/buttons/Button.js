export default function Button({ onClick, type, children, className }) {
	return (
		<button
			onClick={onClick ?? null}
			type={type ?? "button"}
			className={
				"rounded-md bg-white shadow py-1 px-3 hover:bg-secondary/40  transition-all duration-200 border " +
				className
			}
		>
			<span className="text-currentColor">{children}</span>
		</button>
	);
}
