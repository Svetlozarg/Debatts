import Head from "next/head";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Home */}
			<main className="h-[1500px]">
				<h1>Home Page</h1>
			</main>
		</div>
	);
}
