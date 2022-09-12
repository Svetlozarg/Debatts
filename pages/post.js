import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Button from "../components/buttons/Button";
import LargeContainer from "../components/containers/LargeContainer";
import TextInputContainerless from "../components/inputs/TextInputContainerless";
import useOnScreen from "../components/hooks/useOnScreen";
import { useRouter } from "next/router";
import Head from "next/head";
import Modal from "../components/modals/Modal";
import ModalStandard from "../components/modals/ModalStandard";
import { checkApproved } from "../utils/checkApproved";
import { checkBanned } from "../utils/checkBanned";

export default function Post() {
	// Router
	const router = useRouter();
	// User obj
	const { user, logout } = useAuth();
	// State for post title
	const [title, setTitle] = useState("");
	// State for post description
	const [body, setBody] = useState("");

	// Modal States
	const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
	const [isRulesModalOpen, setRulesModalOpen] = useState(false);

	// Used to check if the rules sidebar is showing or not
	const sidebarRulesRef = useRef();
	const isSidebarVisible = useOnScreen(sidebarRulesRef);

	// Check if user is banned
	const checkUser = async () => {
		// Chech if Approved
		if ((await checkApproved(user)) === false) {
			alert(
				"You are not approved. Please wait for an admin to go through your request and approve your profile. Thank you for your patience!"
			);
			logout();
			return;
			// Check if banned
		} else if ((await checkBanned(user)) === true) {
			alert("You are banned");
			logout();
			return;
		}
	};

	useEffect(() => {
		setRulesModalOpen(false);
	}, [isSidebarVisible]);

	useEffect(() => {
		checkUser();
	}, []);

	// Confirm Post Popup
	function confirmPost(e) {
		e.preventDefault();

		setConfirmModalOpen(true);
	}

	// Handle post submit
	async function submitPost() {
		if (user && user.displayName !== undefined) {
			setConfirmModalOpen(false);

			// Here can be performed title, body text limit

			try {
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, "0");
				var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
				var yyyy = today.getFullYear();
				var hour =
					(today.getHours() < 10 ? "0" : "") + today.getHours();
				var minutes =
					(today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
				var seconds =
					(today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
				var time = hour + ":" + minutes + ":" + seconds;

				// Create Post
				await setDoc(doc(db, "Debatts", title), {
					title: title,
					body: body,
					author: user?.displayName,
					agree: [],
					disagree: [],
					createdAt: (today =
						mm + "/" + dd + "/" + yyyy + " " + time),
				}).then(async () => {
					// Update user debatt's array
					const debattDoc = doc(db, "Users", user?.displayName);

					await updateDoc(debattDoc, {
						debatts: arrayUnion({
							author: user?.displayName,
							title: title,
							body: body,
						}),
					}).then(() => {
						router.push("/");
					});
				});
			} catch (e) {
				// setErrorToShow(`${e.name}: ${e.message}`);
			}
		}
	}

	const rules = (
		<div className="w-full ">
			<h1 className="text-center underline">Rules</h1>
			<p className="font-bold">write your rules here...</p>
			<ul className="list-decimal ml-6">
				<ul className="list-disc">
					<li>rule 1</li>
					<li>rule 2</li>
					<li>rule 3</li>
				</ul>
			</ul>
		</div>
	);

	if (user) {
		return (
			<div className="flex flex-row justify-between items-start">
				<Head>
					<title>Debatts · Post</title>
				</Head>
				<div className="hidden flex-grow lg:flex"></div>
				<main className="max-w-xl">
					<h1 className="text-center decoration-secondary select-none mb-0 col-span-full">
						Post a Debatts
					</h1>
					{/* Post Debatts Form */}
					<form className="col-span-full" onSubmit={confirmPost}>
						<LargeContainer className=" text-center mb-2">
							<div className="relative">
								{/* Title */}
								<TextInputContainerless
									required
									placeholder="Add Short Title..."
									className="text-xl text-center overflow-hidden underline decoration-black"
									containerClassName="pb-2 mb-2 overflow-none"
									onChange={(e) => {
										// auto adjust height
										e.currentTarget.style.height = "";
										e.currentTarget.style.height =
											e.currentTarget.scrollHeight + "px";
										setTitle(e.target.value);
									}}
									characterLimit={50}
								/>
								<div className="absolute h-1.5 w-[30%] bg-secondary -left-4 bottom-0"></div>
							</div>

							{/* Description */}
							<TextInputContainerless
								required
								placeholder="Say something about it"
								className="text-md text-left max-h-[40vh] bg-backAccent rounded-md shadow-inner"
								containerClassName="pb-2 mb-2 overflow-none "
								onChange={(e) => {
									// auto adjust height
									e.currentTarget.style.height = "";
									e.currentTarget.style.height =
										e.currentTarget.scrollHeight + "px";
									setBody(e.target.value);
								}}
								characterLimit={2000}
							/>
						</LargeContainer>

						<div className="col-span-full flex justify-between">
							<Button
								className="lg:hidden"
								onClick={() => {
									setRulesModalOpen(true);
								}}
							>
								Read Rules
							</Button>
							<div className="hidden lg:block"></div>
							<Button type="submit">Post</Button>
						</div>
					</form>
				</main>
				<div
					className="relative hidden flex-grow lg:flex"
					ref={sidebarRulesRef}
				>
					{/* Rules section */}
					<div className="w-full absolute left-0 top-[4.5rem] right-0 p-2">
						<LargeContainer className="max-w-[300px]">
							{rules}
						</LargeContainer>
					</div>
				</div>
				{/* Rules Modal */}
				<Modal
					isOpen={isSidebarVisible ? false : isRulesModalOpen}
					shouldCloseOnEsc={true}
					shouldCloseOnOverlayClick
					onRequestClose={() => {
						setRulesModalOpen(false);
					}}
				>
					<div className="relative w-full flex flex-col justify-start items-start gap-2 p-4 ">
						{rules}
						<Button
							className="place-self-center"
							onClick={() => {
								setRulesModalOpen(false);
							}}
						>
							Close
						</Button>
					</div>
				</Modal>
				{/* Confirmation modal*/}
				<ModalStandard
					isOpen={isConfirmModalOpen}
					onClose={() => setConfirmModalOpen(false)}
					shouldCloseOnEsc
					shouldCloseOnOverlayClick
					title="Are You Sure?"
					body="Once posted, your Debatt will not be able to be edited, so double check for spelling, grammar and coherence!"
					confirmButton
					closeButton
					onConfirm={submitPost}
				/>
			</div>
		);
	} else {
		router.push("/login");
	}
}
