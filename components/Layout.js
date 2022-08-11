import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
	const router = useRouter();
	return (
		<div className="m-0 min-h-screen flex flex-col" id="main-wrapper">
			<Header />
			<div
				className={
					router.pathname === "/login" ||
					router.pathname === "/register"
						? "mt-[110px]"
						: "mt-[155px]"
				}
			>
				{children}
			</div>
			<Footer />
		</div>
	);
}
