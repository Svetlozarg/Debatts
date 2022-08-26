import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ButtonOutline from "../../components/buttons/ButtonOutline";
import CardSmall from "../../components/containers/CardSmall";
import LargeContainer from "../../components/containers/LargeContainer";
import TextInputContainerless from "../../components/inputs/TextInputContainerless";

export default function Debatt({}) {
	const router = useRouter();
	const { pid } = router.query;

	function followDebatt(e) {
		e.stopPropagation();
		// function to follow debatt
		setIsFollowing(!isFollowing);
	}

	// set info here, use setInfo to set data
	const [info, setInfo] = useState({
		title: "Discussion Title",
		author: "Author",
		description: "Complete description of the discussion",
		agrees: [
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
		],
		disagrees: [
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
			{ author: "User name", content: "content of comment" },
		],
	});
	const [isFollowing, setIsFollowing] = useState(false);
	const [isCommentMode, setIsCommentMode] = useState(false);

	// posting comments
	const [comment, setComment] = useState("");
	const [isAgreeing, setIsAgreeing] = useState(false);
	const [isDisagreeing, setIsDisagreeing] = useState(false);

	useEffect(() => {
		if (isAgreeing) setIsDisagreeing(false);
	}, [isAgreeing]);
	useEffect(() => {
		if (isDisagreeing) setIsAgreeing(false);
	}, [isDisagreeing]);

	return (
		<main className="max-w-xl !h-full">
			<div className="col-span-full flex justify-start items-center flex-col ">
				<h1 className="font-bold underline underline-offset-1 decoration-black">
					{info.title}
				</h1>
				<h2 className="text-xl italic">{info.author}</h2>
				<div className="rounded-md bg-backAccent w-full  min-h-[200px] p-2 shadow">
					<p>{info.description}</p>
				</div>
				<div className="w-full flex flex-row justify-between items-center mt-4 mb-8">
					<ButtonOutline
						onClick={() => {
							setIsCommentMode(!isCommentMode);
						}}
					>
						{isCommentMode ? "View Comments" : "Add Comment"}
					</ButtonOutline>
					<ButtonOutline active={isFollowing} onClick={followDebatt}>
						<div className="text-inherit flex flex-row justify-start items-center ">
							<svg
								className="w-6 h-6 text-inherit"
								viewBox="0 0 24 24"
							>
								<path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
							</svg>
							Follow
						</div>
					</ButtonOutline>
				</div>
				{isCommentMode ? (
					<LargeContainer className="w-full flex flex-col justify-start items-center border shadow-sm">
						<div className="w-full flex justify-around items-center">
							<ButtonOutline
								onClick={() => setIsAgreeing(!isAgreeing)}
								active={isAgreeing}
							>
								<div className="text-inherit flex flex-row justify-start items-center ">
									<svg
										className="w-6 h-6 text-inherit"
										viewBox="0 0 24 24"
									>
										<path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
									</svg>
									Agree
								</div>
							</ButtonOutline>
							<ButtonOutline
								onClick={() => setIsDisagreeing(!isDisagreeing)}
								active={isDisagreeing}
							>
								<div className="text-inherit flex flex-row justify-start items-center ">
									<svg
										className="w-6 h-6 text-inherit"
										viewBox="0 0 24 24"
									>
										<path d="M19,13H5V11H19V13Z" />
									</svg>
									Disagree
								</div>
							</ButtonOutline>
						</div>
						<TextInputContainerless
							placeholder="Comment on the post..."
							className="text-md  text-left min-h-[150px]  max-h-[40vh] bg-backAccent rounded-md shadow-inner"
							containerClassName="pb-2 mt-4 overflow-none w-full"
							onChange={(e) => {
								setComment(e.target.value);
							}}
						/>
					</LargeContainer>
				) : (
					<div className="w-full grid grid-cols-2 max-h-[500px] overflow-scroll">
						{/* Disagree */}
						<div className="w-full border-r h-full flex flex-col justify-start items-center gap-2 px-2 ">
							<h3 className="italic">Disagree</h3>
							{info.disagrees.map((e, i) => {
								return (
									<CardSmall
										title={e.author}
										body={e.content}
										key={i}
									/>
								);
							})}
						</div>
						{/* Agree */}
						<div className="w-full border-l h-full flex flex-col justify-start items-center gap-2 px-2">
							<h3 className="italic">Agree</h3>
							{info.agrees.map((e, i) => {
								return (
									<CardSmall
										title={e.author}
										body={e.content}
										key={i}
									/>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</main>
	);
}
