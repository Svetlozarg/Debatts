import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ButtonOutline from "../../components/buttons/ButtonOutline";
import CardSmall from "../../components/containers/CardSmall";
import LargeContainer from "../../components/containers/LargeContainer";
import TextInputContainerless from "../../components/inputs/TextInputContainerless";
import {
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function Debatt({}) {
	const router = useRouter();
	// Get user and register function
	const { user } = useAuth();
	// Post title
	const { pid } = router.query;
	// State for follow
	const [isFollowing, setIsFollowing] = useState(false);
	// State for comment box
	const [isCommentMode, setIsCommentMode] = useState(false);
	// State for posting comments
	const [comment, setComment] = useState("");
	const [isAgreeing, setIsAgreeing] = useState(false);
	const [isDisagreeing, setIsDisagreeing] = useState(false);
	// State to hold post data
	const [info, setInfo] = useState();

	// Handle follow button clicked
	async function followDebatt(e) {
		e.stopPropagation();

		setIsFollowing(!isFollowing);

		const debattDoc = doc(db, "Users", user?.email);
		if (!isFollowing) {
			await updateDoc(debattDoc, {
				debatts: arrayUnion({
					author: info?.author,
					title: info?.title,
				}),
			});
		} else if (isFollowing) {
			await updateDoc(debattDoc, {
				debatts: arrayRemove({
					author: info?.author,
					title: info?.title,
				}),
			});
		}
	}

	// Fetch post data
	const handlePostData = async () => {
		const docRef = doc(db, "Debatts", pid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setInfo(docSnap.data());
		} else {
			console.log("No such document!");
		}

		const docRef2 = doc(db, "Users", user.email);
		const docSnap2 = await getDoc(docRef2);

		if (docSnap2.exists()) {
			docSnap2.data().debatts.map((debat) => {
				if (debat.title === pid) {
					setIsFollowing(true);
					return;
				}
			});
		}
	};

	// Handle post comment
	const handlePostComment = async () => {
		const debattDoc = doc(db, "Debatts", info.title);

		if (isAgreeing) {
			await updateDoc(debattDoc, {
				agree: arrayUnion({
					author: user.email,
					comment: comment,
				}),
			});
		} else if (isDisagreeing) {
			await updateDoc(debattDoc, {
				disagree: arrayUnion({
					author: user.email,
					comment: comment,
				}),
			});
		}
		handlePostData();
		setIsCommentMode(false);
	};

	useEffect(() => {
		if (isAgreeing) setIsDisagreeing(false);
	}, [isAgreeing]);

	useEffect(() => {
		if (isDisagreeing) setIsAgreeing(false);
	}, [isDisagreeing]);

	useEffect(() => {
		handlePostData();
	}, []);

	return (
		<main className="max-w-xl !h-full">
			<div className="col-span-full flex justify-start items-center flex-col ">
				<h1 className="font-bold underline underline-offset-1 decoration-black">
					{info?.title}
				</h1>
				<h2 className="text-xl italic">{info?.author}</h2>
				<div className="rounded-md bg-backAccent w-full  min-h-[200px] p-2 shadow">
					<p>{info?.body}</p>
				</div>
				<div className="w-full flex flex-row justify-between items-center mt-4 mb-8">
					{/* Comment Button */}
					{user?.email !== info?.author && user && (
						<ButtonOutline
							onClick={() => {
								setIsCommentMode(!isCommentMode);
							}}
						>
							{isCommentMode ? "View Comments" : "Add Comment"}
						</ButtonOutline>
					)}

					{/* Follow Button */}
					{user?.email !== info?.author && user && (
						<ButtonOutline
							active={isFollowing}
							onClick={followDebatt}
						>
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
					)}
				</div>
				{/* Comment Box */}
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
							characterLimit={100}
						/>
						<ButtonOutline onClick={handlePostComment}>
							<div className="text-inherit flex flex-row justify-start items-center ">
								Post Comment
							</div>
						</ButtonOutline>
					</LargeContainer>
				) : (
					<div className="w-full grid grid-cols-2 max-h-[500px] overflow-scroll">
						{/* Disagree */}
						<div className="w-full border-r h-full flex flex-col justify-start items-center gap-2 px-2 ">
							<h3 className="italic">Disagree</h3>
							{info?.disagree?.map((e, i) => {
								return (
									<CardSmall
										title={e.author}
										body={e.comment}
										key={i}
									/>
								);
							})}
						</div>
						{/* Agree */}
						<div className="w-full border-l h-full flex flex-col justify-start items-center gap-2 px-2">
							<h3 className="italic">Agree</h3>
							{info?.agree?.map((e, i) => {
								return (
									<CardSmall
										title={e.author}
										body={e.comment}
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
