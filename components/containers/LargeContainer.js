export default function LargeContainer({ children, className }) {
	return (
		<div className={"p-4 shadow-lg border-2 rounded-md " + className}>
			{children}
		</div>
	);
}
