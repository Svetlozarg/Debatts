import Modal from "./Modal";

export default function ModalStandard({ isOpen, onClose, title, body }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="w-full flex flex-col justify-start items-center">
				<div className="w-full text-center relative">
					<div className="absolute -right-4 bottom-0 h-1 w-[30%] bg-secondary"></div>

					<h2>{title}</h2>
				</div>

				<p>{body}</p>
			</div>
		</Modal>
	);
}
