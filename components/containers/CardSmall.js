export default function CardSmall({ title, body, onClick }) {
	return (
		<div
			className="bg-backAccent w-full min-h-[150px] shadow-sm rounded-md p-2 "
			onClick={onClick}
		>
			<div className="relative w-full mb-2 italic">
				<h4 className="text-center">{title}</h4>
				<div className="absolute h-1 w-1/5 -right-2 bottom-0 bg-secondary"></div>
			</div>
			<p className="text-sm">{body}</p>
		</div>
	);
}
