export default function LargeContainer({ children, className }) {
	return (
		<div className={"p-4 border-2 border-main rounded-md " + className}>
			{children}
		</div>
	);
}
