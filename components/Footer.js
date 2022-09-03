import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function Footer() {
	const { user, logout } = useAuth();

	return (
		<footer className="bg-backAccent p-8 mt-auto">
			<div className="grid grid-cols-3 gap-6">
				{/* Logo area */}
				<div className="flex justify-center items-center">
					<Logo className={"w-[90%] md:w-[60%] max-w-[200px]"} />
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
								pathname: "/account",
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
							<a>Post a Debatts</a>
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
					<ul>
						<a className="cursor-pointer" onClick={() => logout()}>
							Log out DEV ONLY
						</a>
					</ul>
				</li>

				{/* Line */}
				<div className="relative">
					<div className="absolute -right-8 h-1.5 w-[90%] bg-main "></div>
				</div>
			</div>
		</footer>
	);
}
