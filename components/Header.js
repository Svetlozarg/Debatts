import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Button from "./buttons/Button";
import Logo from "./Logo";

export default function Header() {
	const { user, logout } = useAuth();
	const router = useRouter();

	// scroll event listeners to minify the top part of the header
	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header className="w-full bg-backAccent fixed flex flex-col">
			{/* top logo */}
			<div
				className={`${
					scrollPosition > 110
						? "h-[0px] opacity-0"
						: "h-[110px] opacity-100"
				} w-full relative flex justify-center items-center transition-all duration-300`}
			>
				<div className="bg-main fixed left-0 top-7 w-[30%] h-2"></div>
				<div className="bg-main fixed top-0 left-[70%] w-2 h-10"></div>

				<Logo className={"text-4xl"} />
			</div>

			{/* Navigation */}
			<div className="h-[45px] w-full bg-main ">
				{user ? (
					// logged in
					<div className="h-full max-w-[350px] mx-auto  flex flex-row justify-around items-center">
						<Link
							href={{
								pathname: "/",
							}}
							passHref={true}
						>
							<Button>My Debatts</Button>
						</Link>
						<Link
							href={{
								pathname: "/",
							}}
							passHref={true}
						>
							<Button>Post a Debatts</Button>
						</Link>
					</div>
				) : (
					// logged out
					<div className="h-full max-w-[350px] mx-auto flex flex-row justify-around items-center">
						<Link
							href={{
								pathname: "/login",
							}}
							passHref={true}
						>
							<Button>Login</Button>
						</Link>

						{/* Register */}
						<Link
							href={{
								pathname: "/register",
							}}
							passHref={true}
						>
							<Button>Register</Button>
						</Link>
					</div>
				)}
			</div>
		</header>
	);
}
