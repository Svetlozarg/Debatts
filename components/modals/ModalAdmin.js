import ButtonOutline from "../buttons/ButtonOutline";
import Modal from "./Modal";

export default function ModalAdmin({
	isOpen,
	onClose,
	userID,
	postID,
	commentID,
}) {
	function banUser(id) {}

	function deletePost(id) {}

	function deleteComment(id) {}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h2>Admin Controls</h2>
			<div className="flex flex-col gap-2">
				{userID && (
					<ButtonOutline onClick={() => banUser(userID)}>
						Ban user
					</ButtonOutline>
				)}
				{postID && (
					<ButtonOutline onClick={() => deletePost(postID)}>
						Remove post
					</ButtonOutline>
				)}
				{commentID && (
					<ButtonOutline onClick={() => deleteComment(commentID)}>
						Remove comment
					</ButtonOutline>
				)}
				<ButtonOutline onClick={onClose} negative>
					Close
				</ButtonOutline>
			</div>
		</Modal>
	);
}
