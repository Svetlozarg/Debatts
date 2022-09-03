import { useState } from "react";
import ModalAdmin from "../modals/ModalAdmin";
import ButtonActionRound from "../buttons/ButtonActionRound";

export default function CardSmall({ title, body, onClick }) {
	const [isAdmin, setIsAdmin] = useState(true);
	const [isAdminModalShown, setIsAdminModalShown] = useState(false);

	return (
		<div
			className="bg-backAccent w-full min-h-[150px] shadow-sm rounded-md p-2 relative [&:not(:hover)>#adminButton]:hidden"
			onClick={onClick}
		>
			<div className="relative w-full mb-2 italic">
				<h4 className="text-center">{title}</h4>
				<div className="absolute h-1 w-1/5 -right-2 bottom-0 bg-secondary"></div>
			</div>
			<p className="text-sm">{body}</p>
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
				commentID={123}
			/>
		</div>
	);
}
