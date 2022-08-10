export default function Logo({ className }) {
	return (
		<h1 className={"mb-0 " + className ?? ""}>
			De
			<span className="underline decoration-main">batts.&nbsp;</span>
		</h1>
	);
}
