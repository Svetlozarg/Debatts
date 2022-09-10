import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ButtonOutline from "../../components/buttons/ButtonOutline";
import CardSmall from "../../components/containers/CardSmall";
import LargeContainer from "../../components/containers/LargeContainer";
import TextInputContainerless from "../../components/inputs/TextInputContainerless";
import {
<<<<<<< HEAD
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import ModalStandard from '../../components/modals/ModalStandard';
import Head from 'next/head';
import ModalError from '../../components/modals/ModalError';
import ButtonActionRound from '../../components/buttons/ButtonActionRound';
import ModalAdmin from '../../components/modals/ModalAdmin';
import { checkApproved } from '../../utils/checkApproved';
import { checkBanned } from '../../utils/checkBanned';
import { checkAdmin } from '../../utils/checkAdmin';
=======
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import ModalStandard from "../../components/modals/ModalStandard";
import Head from "next/head";
import ModalError from "../../components/modals/ModalError";
import ButtonActionRound from "../../components/buttons/ButtonActionRound";
import ModalAdmin from "../../components/modals/ModalAdmin";
>>>>>>> 7b13a75143836b873d62bce71cf3db905c285f61

export default function Debatt({}) {
	const router = useRouter();
	// Get user and register function
	const { user, logout } = useAuth();
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

	//comment modal
	const [commentToShow, setCommentToShow] = useState({});
	const [isCommentModalShowing, setCommentModalShowing] = useState(false);

	const [errorToShow, setErrorToShow] = useState("");
	const [isErrorShowing, setIsErrorShowing] = useState(false);

	const [isAdmin, setIsAdmin] = useState(false);
	const [isAdminModalShown, setIsAdminModalShown] = useState(false);

  // Handle follow button clicked
  async function followDebatt(e) {
    if (user && user?.displayName !== undefined) {
      e.stopPropagation();

      setIsFollowing(!isFollowing);

      const debattDoc = doc(db, 'Users', user?.displayName);
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
  }

  // Fetch post data
  const handlePostData = async () => {
    // Chech if Approved
    if ((await checkApproved(user)) === false) {
      alert(
        'You are not approved. Please wait for an admin to go through your request and approve your profile. Thank you for your patience!'
      );
      logout();
      return;
      // Check if banned
    } else if ((await checkBanned(user)) === true) {
      alert('You are banned');
      logout();
      return;
    } else {
      setIsAdmin(await checkAdmin(user));

      const docRef = doc(db, 'Debatts', pid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setInfo(docSnap.data());
      } else {
        console.log('No such document!');
      }

      if (user && user?.displayName !== undefined) {
        const docRef2 = doc(db, 'Users', user?.displayName);
        const docSnap2 = await getDoc(docRef2);

        if (docSnap2.exists()) {
          docSnap2.data().debatts.map((debat) => {
            if (debat?.title === pid) {
              setIsFollowing(true);
              return;
            }
          });
        }
      }
    }
  };

  // Handle post comment
  const handlePostComment = async () => {
    if (user && user?.displayName !== undefined) {
      if (!(isAgreeing || isDisagreeing)) {
        setErrorToShow('You have not decided if you disagree or not!');
        setIsErrorShowing(true);

        return;
      }
      if (!comment) {
        setErrorToShow('You have not commented!');
        setIsErrorShowing(true);
        return;
      }

      try {
        const debattDoc = doc(db, 'Debatts', info?.title);

        if (isAgreeing) {
          await updateDoc(debattDoc, {
            agree: arrayUnion({
              author: user?.displayName,
              comment: comment,
            }),
          });
        } else if (isDisagreeing) {
          await updateDoc(debattDoc, {
            disagree: arrayUnion({
              author: user?.displayName,
              comment: comment,
            }),
          });
        }
        handlePostData();
        setIsCommentMode(false);
      } catch (e) {
        setErrorToShow(e);
        setIsErrorShowing(true);
      }
    }
  };

	useEffect(() => {
		if (isAgreeing) setIsDisagreeing(false);
	}, [isAgreeing]);

	useEffect(() => {
		if (isDisagreeing) setIsAgreeing(false);
	}, [isDisagreeing]);

<<<<<<< HEAD
  useEffect(() => {
    handlePostData();
  }, []);
=======
	useEffect(() => {
		handlePostData();
		checkAdmin();
		checkBannedUser();
	}, []);
>>>>>>> 7b13a75143836b873d62bce71cf3db905c285f61

	return (
		<main className="max-w-2xl !h-full">
			<Head>
				<title>Debatts · {info?.title}</title>
			</Head>
			<div className="col-span-full flex justify-start items-center flex-col ">
				<h1 className="font-bold underline underline-offset-1 decoration-black">
					{info?.title}
				</h1>
				<h2 className="text-xl italic">{info?.author}</h2>
				<div className="rounded-md bg-backAccent w-full  min-h-[200px] p-2 shadow">
					<p className="font-mono text-sm">{info?.body}</p>
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

					{/* Admin Button */}
					{isAdmin && (
						<ButtonActionRound
							onClick={(e) => {
								e.stopPropagation();
								setIsAdminModalShown(!isAdminModalShown);
							}}
							className="dropdown"
						>
							<svg viewBox="0 0 24 24" className="w-6">
								<path
									className="fill-gray-500"
									fill="currentColor"
									d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"
								/>
							</svg>
						</ButtonActionRound>
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
							characterLimit={1000}
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
							{info?.disagree?.length > 0 ? (
								info?.disagree?.map((e, i) => {
									return (
										<CardSmall
											title={e.author}
											body={e.comment}
											post={info?.title}
											type="disagree"
											key={i}
											onClick={() => {
												setCommentToShow({
													author: e.author,
													comment: e.comment,
												});
												setCommentModalShowing(true);
											}}
										/>
									);
								})
							) : (
								<h4 className="text-opacity-50">
									No one disagrees!
								</h4>
							)}
						</div>
						{/* Agree */}
						<div className="w-full border-l h-full flex flex-col justify-start items-center gap-2 px-2">
							<h3 className="italic">Agree</h3>
							{info?.agree?.length > 0 ? (
								info?.agree?.map((e, i) => {
									return (
										<CardSmall
											title={e.author}
											body={e.comment}
											post={info?.title}
											type="agree"
											key={i}
											onClick={() => {
												setCommentToShow({
													author: e.author,
													comment: e.comment,
												});
												setCommentModalShowing(true);
											}}
										/>
									);
								})
							) : (
								<h4 className="text-opacity-50">
									No one agrees!
								</h4>
							)}
						</div>
					</div>
				)}
			</div>
			<ModalStandard
				isOpen={isCommentModalShowing}
				onClose={() => {
					setCommentToShow({});
					setCommentModalShowing(false);
				}}
				title={commentToShow.author}
				body={commentToShow.comment}
			/>
			<ModalError
				isOpen={isErrorShowing}
				onClose={() => {
					setErrorToShow("");
					setIsErrorShowing(false);
				}}
				error={errorToShow}
			/>
			<ModalAdmin
				isOpen={isAdmin && isAdminModalShown}
				onClose={(e) => {
					e.stopPropagation();
					setIsAdminModalShown(false);
				}}
				userID={info?.author}
				postID={info?.title}
			/>
		</main>
	);
}
