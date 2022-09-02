import ReactModal from "react-modal";

export default function Modal({ isOpen, onClose, children }) {
	return (
		<ReactModal
			overlayClassName="fixed top-0 left-0 w-full h-full bg-black/20 z-50 flex justify-center items-center"
			className="max-w-2xl w-fit h-fit bg-back p-4 rounded-md flex flex-col justify-start items-center relative min-w-[40%] shadow"
			isOpen={isOpen}
			shouldCloseOnEsc={true}
			shouldCloseOnOverlayClick={true}
			onRequestClose={onClose}
		>
			{children}
		</ReactModal>
	);
}
