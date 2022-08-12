import Tippy from "@tippyjs/react";

export default function ButtonPill({ children, onClick, className, tip }) {
	return tip ? (
		<Tippy content={tip} delay={1000}>
			<button
				className={
					"flex flex-row justify-start items-center gap-1 p-1 bg-white border rounded-full hover:bg-gray-300 transition-all duration-200 " +
					className
				}
				onClick={onClick ?? null}
			>
				{children}
			</button>
		</Tippy>
	) : (
		<button
			className={
				"flex flex-row justify-start items-center gap-1 p-1 bg-white border rounded-full hover:bg-gray-300 transition-all duration-200 " +
				className
			}
			onClick={onClick ?? null}
		>
			{children}
		</button>
	);
}
