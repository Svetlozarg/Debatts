import Link from "next/link";
import ButtonOutline from "../components/buttons/ButtonOutline";

export default function FourZeroFour() {
	return (
		<div className="h-[calc(100vh-155px-184px)] w-full flex justify-center items-center text-center">
			<div>
				<h1 className="font-mono">404</h1>
				<h2 className="">How did you end up here?</h2>
				<Link href="/" passHref>
					<ButtonOutline>
						Click here to go to the main page
					</ButtonOutline>
				</Link>
			</div>
		</div>
	);
}
