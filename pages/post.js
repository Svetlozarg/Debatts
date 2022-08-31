import React, { useState, useRef, useEffect } from "react";
import ReactModal from "react-modal";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../config/firebase";

import Button from "../components/buttons/Button";
import LargeContainer from "../components/containers/LargeContainer";
import TextInputContainerless from "../components/inputs/TextInputContainerless";
import useOnScreen from "../components/hooks/useOnScreen";
import { useRouter } from "next/router";

export default function Post() {
	// Router
	const router = useRouter();
	// User obj
	const { user } = useAuth();
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

	useEffect(() => {
		setRulesModalOpen(false);
	}, [isSidebarVisible]);

	// Handle post submit
	async function submitPost(e) {
		e.preventDefault();

		// Here can be performed title, body text limit

		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = today.getFullYear();

		await setDoc(doc(db, "Debatts", title), {
			title: title,
			body: body,
			author: user.email,
			agree: [],
			disagree: [],
			createdAt: (today = mm + "/" + dd + "/" + yyyy),
		});

		const debattDoc = doc(db, "Users", user.email);

		await updateDoc(debattDoc, {
			debatts: arrayUnion({
				author: user.email,
				title: title,
			}),
		});

		router.push("/");
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
				<div className="hidden flex-grow lg:flex"></div>
				<main className="max-w-xl">
					<h1 className="text-center decoration-secondary select-none mb-0 col-span-full">
						Post a Debatts
					</h1>
					<form className="col-span-full" onSubmit={submitPost}>
						<LargeContainer className=" text-center mb-2">
							<div className="relative">
								{/* Title */}
								<TextInputContainerless
									required
									placeholder="Title..."
									className="text-xl text-center overflow-hidden underline decoration-black"
									containerClassName="pb-2 mb-2 overflow-none"
									onChange={(e) => {
										// auto adjust height
										e.currentTarget.style.height = "";
										e.currentTarget.style.height =
											e.currentTarget.scrollHeight + "px";
										setTitle(e.target.value);
									}}
									characterLimit={100}
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
								characterLimit={400}
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
				<ReactModal
					overlayClassName="absolute top-0 left-0 w-full h-full bg-black/20 z-50 flex justify-center items-center"
					className="w-fit h-fit bg-back p-4 rounded-md flex flex-col justify-start items-center relative min-w-[40%] max-w-[80%] shadow"
					isOpen={isSidebarVisible ? false : isRulesModalOpen}
					shouldCloseOnEsc={true}
					shouldCloseOnOverlayClick={true}
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
				</ReactModal>
				{/* Confirmation modal*/}
				<ReactModal
					overlayClassName="absolute top-0 left-0 w-full h-full bg-black/20 z-50 flex justify-center items-center"
					className="w-fit h-fit bg-back p-4 rounded-md flex flex-col justify-start items-center relative min-w-[40%] max-w-[80%] shadow"
					isOpen={isConfirmModalOpen}
					shouldCloseOnEsc={true}
					shouldCloseOnOverlayClick={true}
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
				</ReactModal>
			</div>
		);
	} else {
		router.push("/login");
	}
}
