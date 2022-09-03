import ButtonOutline from "../buttons/ButtonOutline";
import Modal from "./Modal";

export default function ModalStandard({
	isOpen,
	onClose,
	title,
	body,
	closeButton = false,
	confirmButton = false,
	onConfirm,
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="w-full flex flex-col justify-start items-center">
				<div className="w-full text-center relative mb-2">
					<div className="absolute -right-4 bottom-0 h-1 w-[30%] bg-secondary"></div>

					<h2>{title}</h2>
				</div>

				<p>{body}</p>
				{closeButton || confirmButton ? (
					<div className="w-full flex flex-row justify-around items-center mt-3">
						{closeButton && (
							<ButtonOutline onClick={onClose} negative>
								Close
							</ButtonOutline>
						)}
						{confirmButton && (
							<ButtonOutline onClick={onConfirm}>
								Submit
							</ButtonOutline>
						)}
					</div>
				) : null}
			</div>
		</Modal>
	);
}
