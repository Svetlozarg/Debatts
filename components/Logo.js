import Link from "next/link";

export default function Logo({ className }) {
	return (
		<Link
			href={{
				pathname: "/",
			}}
			passHref={true}
			className="cursor-pointer"
		>
			<h1 className={"mb-0 select-none " + className}>
				De
				<span className="underline decoration-main">batts.&nbsp;</span>
			</h1>
		</Link>
	);
}
