import { useState } from "react";
import { useRouter } from "next/router";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import CardContainer from "./CardContainer";
import ButtonActionRound from "../buttons/ButtonActionRound";
import ModalAdmin from "../modals/ModalAdmin";

export default function Card({ title, body, wide, id, author, createdAt }) {
	const [isAdmin, setIsAdmin] = useState(true);
	const [isAdminModalShown, setIsAdminModalShown] = useState(false);

	const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

	const router = useRouter();

	function goToPost() {
		if (isAdminModalShown) return;
		if (!id) {
			router.push("/");
		} else {
			router.push("/debatt/" + id);
		}
	}

	return (
		<CardContainer
			wide={wide}
			onClick={goToPost}
			className="relative [&:not(:hover)>#adminButton]:hidden"
		>
			<div className="max-h-[210px] relative overflow-ellipsis">
				<div className="relative px-6">
					<h2 className="text-lg text-center font-medium pb-2">
						{title.length > 47
							? title.substring(0, 47) + "..."
							: title}
					</h2>
					<div
						className={`absolute h-1 w-[30%] bottom-0 -left-6 bg-secondary`}
					></div>
				</div>
				<ResponsiveEllipsis
					text={body}
					maxLine={title.length > 25 ? "5" : "6"}
					ellipsis="..."
					trimRight
					basedOn="letters"
					className="overflow-hidden"
				/>
			</div>

			<div className="w-full h-auto bg-backAccent p-1 gap-1 border-t-2 flex flex-row justify-between items-center text-sm [&>*]:text-opacity-60">
				<p>{author}</p>
				<p>{createdAt}</p>
			</div>

			{isAdmin && (
				<div className="absolute top-1 left-1 " id="adminButton">
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
				</div>
			)}
			<ModalAdmin
				isOpen={isAdmin && isAdminModalShown}
				onClose={(e) => {
					e.stopPropagation();
					setIsAdminModalShown(false);
				}}
				userID={123}
				postID={123}
			/>
		</CardContainer>
	);
}
