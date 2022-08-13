import { useState } from "react";

import Button from "../components/buttons/Button";
import ButtonOutline from "../components/buttons/ButtonOutline";
import LargeContainer from "../components/containers/LargeContainer";
import TextInputContainerless from "../components/inputs/TextInputContainerless";

export default function Post() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	return (
		<div className="flex flex-row justify-between items-start">
			<div className="hidden flex-grow lg:flex"></div>
			<main className="max-w-xl">
				<h1 className="text-center underline decoration-secondary select-none mb-0 col-span-full">
					Post a Debatts
				</h1>
				<form className="col-span-full">
					<LargeContainer className=" text-center mb-2">
						<div className="relative">
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
							/>
							<div className="absolute h-1.5 w-[30%] bg-secondary -left-4 bottom-0"></div>
						</div>

						<TextInputContainerless
							required
							placeholder="Say something about it"
							className="text-md  text-left max-h-[40vh] bg-backAccent rounded-md shadow-inner"
							containerClassName="pb-2 mb-2 overflow-none "
							onChange={(e) => {
								// auto adjust height
								e.currentTarget.style.height = "";
								e.currentTarget.style.height =
									e.currentTarget.scrollHeight + "px";
								setTitle(e.target.value);
							}}
						/>
					</LargeContainer>

					<div className="col-span-full flex justify-between">
						<Button className="lg:hidden">Read Rules</Button>
						<div className="hidden lg:block"></div>
						<Button type="submit">Post</Button>
					</div>
				</form>
			</main>
			<div className="relative hidden flex-grow lg:flex">
				{/* Rules section */}
				<div className="w-full absolute left-0 top-[4.5rem] right-0 p-2">
					<LargeContainer className="max-w-[300px]">
						<h2 className="text-center">Rules</h2>
					</LargeContainer>
				</div>
			</div>
		</div>
	);
}
