import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
	return (
		<div className="m-0 min-h-screen flex flex-col" id="main-wrapper">
			<Header />
			<div className="lg:container mx-auto">{children}</div>
			<Footer />
		</div>
	);
}
