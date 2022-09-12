export default function CardContainer({
	children,
	wide,
	onClick,
	hover = true,
	className,
}) {
	return (
		<div
			className={
				`flex flex-col justify-between max-h-[250px] bg-backAccent w-full shadow-md border overflow-hidden transition-all duration-200 cursor-pointer p-2 ${
					wide
						? "col-span-3 sm:col-span-6 lg:col-span-6"
						: "col-span-3"
				} ${hover ? "hover:border-secondary" : ""} ${
					!onClick ? "cursor-default" : ""
				} ` + className
			}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
