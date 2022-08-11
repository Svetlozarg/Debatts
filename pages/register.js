import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

import ButtonOutline from "../components/buttons/ButtonOutline";
import LargeContainer from "../components/containers/LargeContainer";
import TextInput from "../components/inputs/TextInput";
import Checkbox from "../components/inputs/Checkbox";

export default function Register() {
	// Get user and register function
	const { user, register } = useAuth();
	// State for data
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	// Handle register on submit
	const handleRegister = async (e) => {
		e.preventDefault();

		// Try register with email and password
		// Else error
		try {
			await register(data.email, data.password);
		} catch (err) {
			// TODO: handle register failure
			console.log(err);
		}
	};

	return (
		<main>
			<LargeContainer className="col-span-full">
				<h1 className="text-center underline decoration-main select-none">
					Register Page
				</h1>
				<form className="grid gap-6" onSubmit={handleRegister}>
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
					<Checkbox required id="TnCs">
						I agree with the terms and conditions
					</Checkbox>
					<ButtonOutline type="submit">Submit</ButtonOutline>
				</form>
			</LargeContainer>
			<div className="col-span-full flex justify-center items-center w-full">
				<Link
					href={{
						pathname: "/login",
					}}
					passHref={true}
				>
					<ButtonOutline>Go to to login page</ButtonOutline>
				</Link>
			</div>
		</main>
	);
}
