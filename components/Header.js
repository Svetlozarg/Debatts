import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import ButtonHeader from "./buttons/ButtonHeader";
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

	const collapse = scrollPosition > 110;

	return (
		<header className="w-full bg-backAccent fixed flex flex-col">
			{/* top logo */}
			<div
				className={`${
					collapse
						? "h-[0px] -translate-y-[110px]"
						: "h-[110px] translate-y-0"
				} w-full relative flex justify-center items-center transition-all duration-300`}
			>
				<div className="bg-main fixed left-0 top-7 w-[30%] h-1.5"></div>
				<div className="bg-main fixed top-0 left-[70%] w-1.5 h-10"></div>

				<Logo className={"text-4xl"} />
			</div>

			{/* Navigation */}
			{router.pathname === "/login" ||
			router.pathname === "/register" ? null : (
				<nav
					className={`h-[45px] w-full transition-all duration-300 flex flex-row justify-between align-center ${
						collapse ? "bg-backAccent" : "bg-main"
					}`}
				>
					<div
						className={`w-fit h-full mx-4 flex justify-center items-center transition-all duration-300 ${
							collapse ? "translate-x-0" : "-translate-x-52"
						}`}
					>
						<Logo></Logo>
					</div>

					{user ? (
						// logged in
						<div className="h-full flex flex-row justify-end items-center gap-6">
							<Link
								href={{
									pathname: "/",
								}}
								passHref={true}
							>
								<ButtonHeader collapsed={collapse}>
									My Debatts
								</ButtonHeader>
							</Link>
							<Link
								href={{
									pathname: "/",
								}}
								passHref={true}
							>
								<ButtonHeader collapsed={collapse}>
									Post a Debatts
								</ButtonHeader>
							</Link>
						</div>
					) : (
						// logged out
						<div className="h-full flex flex-row justify-send items-center">
							<Link
								href={{
									pathname: "/login",
								}}
								passHref={true}
							>
								<ButtonHeader collapsed={collapse}>
									Log in
								</ButtonHeader>
							</Link>

							{/* Register */}
							<Link
								href={{
									pathname: "/register",
								}}
								passHref={true}
							>
								<ButtonHeader collapsed={collapse}>
									Register
								</ButtonHeader>
							</Link>
						</div>
					)}
				</nav>
			)}
		</header>
	);
}
