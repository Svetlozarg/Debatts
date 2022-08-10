import Link from "next/link";
import Logo from "/public/logo.svg";

export default function Footer() {
	return (
		<footer className="bg-backAccent p-8 mt-auto">
			<div className="grid grid-cols-3 gap-6">
				{/* Logo area */}
				<div className="flex justify-center items-center">
					<div className="w-full h-[40px] bg-black">
						<span className="text-back">Logo</span>
					</div>
				</div>

				{/* Link area */}
				<li className="flex flex-col justify-start items-start [&>ul]:whitespace-nowrap">
					<ul>
						<Link
							href={{
								pathname: "/",
							}}
							passHref={true}
						>
							<a>Home</a>
						</Link>
					</ul>
					<ul>
						<Link
							href={{
								pathname: "/",
							}}
							passHref={true}
						>
							<a>My Account</a>
						</Link>
					</ul>
					<ul>
						<Link
							href={{
								pathname: "/",
							}}
							passHref={true}
						>
							<a>Post a Debatt</a>
						</Link>
					</ul>
					<ul>
						<Link
							href={{
								pathname: "/",
							}}
							passHref={true}
						>
							<a>Instagram</a>
						</Link>
					</ul>
				</li>

				{/* Line */}
				<div className="relative">
					<div className="absolute -right-8 h-1.5 w-28 bg-main "></div>
				</div>
			</div>
		</footer>
	);
}
