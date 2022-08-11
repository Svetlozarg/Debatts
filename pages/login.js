import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import { useAuth } from "../context/AuthContext";
import ButtonOutline from "../components/buttons/ButtonOutline";
import LargeContainer from "../components/containers/LargeContainer";
import TextInput from "../components/inputs/TextInput";

/*
Test login:
admin@admin.com
admin1234
*/

export default function Login() {
	// User router
	const router = useRouter();
	// Get user and login function
	const { user, login } = useAuth();
	// State for data
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	// Handle login on submit
	const handleLogin = async (e) => {
		e.preventDefault();

		// Try login with email and password
		// Else error
		try {
			await login(data.email, data.password);
			router.push("/");
		} catch (err) {
			console.log(err);
			// TODO: need to handle login failure
		}
	};

	return (
		<main>
			<LargeContainer className="col-span-full">
				<h1 className="text-center underline decoration-main select-none">
					Login Page
				</h1>
				<form className="grid gap-6" onSubmit={handleLogin}>
					<TextInput
						id="email"
						type="email"
						label="Email"
						onChange={(e) => {
							setData({
								...data,
								email: e.target.value,
							});
						}}
						required
						placeholder="email@example.com"
					></TextInput>
					<TextInput
						id="password"
						type="password"
						label="Password"
						onChange={(e) => {
							setData({
								...data,
								password: e.target.value,
							});
						}}
						placeholder="email@example.com"
						required
					></TextInput>
					<ButtonOutline type="submit">Submit</ButtonOutline>
				</form>
			</LargeContainer>
			<div className="col-span-full flex justify-center items-center w-full">
				<Link
					href={{
						pathname: "/register",
					}}
					passHref={true}
				>
					<ButtonOutline>Go to register page</ButtonOutline>
				</Link>
			</div>
		</main>
	);
}
