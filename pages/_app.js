import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthContextProvider>
	);
}

export default MyApp;
