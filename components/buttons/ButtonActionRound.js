import Tippy from "@tippyjs/react";

export default function ButtonActionRound({ children, onClick, tip }) {
	return tip ? (
		<Tippy content={tip} delay={1000}>
			<button
				type="button"
				className="bg-white border-1 rounded-full w-8 h-8 flex justify-center items-center shadow hover:bg-gray-200 transition-all duration-200"
				onClick={onClick ?? null}
			>
				{children}
			</button>
		</Tippy>
	) : (
		<button
			type="button"
			className="bg-white border-1 rounded-full w-8 h-8 flex justify-center items-center shadow hover:bg-gray-200 transition-all duration-200"
			onClick={onClick ?? null}
		>
			{children}
		</button>
	);
}
