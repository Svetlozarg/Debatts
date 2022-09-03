import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useRouter } from "next/router";
import ButtonOutline from "../components/buttons/ButtonOutline";
import LargeContainer from "../components/containers/LargeContainer";
import TextInput from "../components/inputs/TextInput";
import Checkbox from "../components/inputs/Checkbox";
import Head from "next/head";
import ModalStandard from "../components/modals/ModalStandard";
import ModalError from "../components/modals/ModalError";

export default function Register() {
	const router = useRouter();
	// Get user and register function
	const { user, register } = useAuth();
	// State for data
	const [data, setData] = useState({
		fullName: "",
		userName: "",
		email: "",
		password: "",
		rpassword: "",
	});

	// error modal
	const [errorToShow, setErrorToShow] = useState("");
	const [isErrorShowing, setIsErrorShowing] = useState(false);

	// Handle register on submit
	const handleRegister = async (e) => {
		e.preventDefault();

		// Try register with email and password
		// Else error
		try {
			if (data.password === data.rpassword) {
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, "0");
				var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
				var yyyy = today.getFullYear();

				await setDoc(doc(db, "Users", data.email), {
					fullName: data.fullName,
					userName: data.userName,
					email: data.email,
					role: "user",
					debatts: [],
					createdAt: (today = mm + "/" + dd + "/" + yyyy),
				});

				await register(data.email, data.password);

				router.push("/");
			} else {
				setErrorToShow("Passwords do not match!");
				setIsErrorShowing(true);
				return;
			}
		} catch (e) {
			setErrorToShow(e);
			setIsErrorShowing(true);
		}
	};

	if (!user) {
		return (
			<main className="max-w-lg">
				<Head>
					<title>Debatts · Register</title>
				</Head>
				<LargeContainer className="col-span-full">
					<h1 className="text-center underline decoration-secondary select-none">
						Register Page
					</h1>
					<form className="grid gap-6" onSubmit={handleRegister}>
						{/* Full Name */}
						<TextInput
							id="fullName"
							type="text"
							label="Full Name"
							onChange={(e) => {
								setData({
									...data,
									fullName: e.target.value,
								});
							}}
							required
							placeholder="Full name"
						></TextInput>

						{/* Username */}
						<TextInput
							id="username"
							type="text"
							label="Username"
							onChange={(e) => {
								setData({
									...data,
									userName: e.target.value,
								});
							}}
							required
							placeholder="Username"
						></TextInput>

						{/* Email Address */}
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

						{/* Password */}
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
							placeholder="password"
							required
						></TextInput>

						{/* Repeat Password */}
						<TextInput
							id="rpassword"
							type="password"
							label="Repeat Password"
							onChange={(e) => {
								setData({
									...data,
									rpassword: e.target.value,
								});
							}}
							placeholder="Repeat password"
							required
						></TextInput>
						<Checkbox required id="TnCs">
							I agree with the{" "}
							<Link href="/TermsAndConditions" passHref>
								<a>terms and conditions</a>
							</Link>
						</Checkbox>
						<ButtonOutline type="submit">Submit</ButtonOutline>
					</form>
				</LargeContainer>
				<div className="col-span-full flex flex-col justify-center items-center w-full">
					<span>Already have an account?</span>
					<Link
						href={{
							pathname: "/login",
						}}
						passHref={true}
					>
						<a>Go to login page</a>
					</Link>
				</div>
				<ModalError
					isOpen={isErrorShowing}
					onClose={() => {
						setErrorToShow("");
						setIsErrorShowing(false);
					}}
					error={errorToShow}
				/>
			</main>
		);
	} else {
		router.push("/");
	}
}
