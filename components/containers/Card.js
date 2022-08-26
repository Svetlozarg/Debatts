import { useRouter } from "next/router";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import ButtonPill from "../buttons/ButtonPill";

export default function Card({ title, body, wide, id }) {
	const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

	// check for overflow to decide if bottom gradient should be shown
	const router = useRouter();

	function goToPost() {
		if (!id) {
			router.push("/");
		} else {
			router.push("/debatt/" + id);
		}
	}

	return (
		<div
			className={`flex flex-col justify-between max-h-[250px] bg-backAccent w-full shadow-md border rounded-md overflow-hidden hover:border-secondary transition-all duration-200 cursor-pointer ${
				wide ? "col-span-6" : "col-span-3"
			}`}
			onClick={goToPost}
		>
			<div className="max-h-[210px] relative overflow-hidden overflow-ellipsis p-2">
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
				/>
			</div>

			<div className="w-full h-auto bg-backAccent p-1 gap-1 border-t-2 flex flex-row justify-between items-center">
				<div className="flex flex-row justify-start items-center gap-1"></div>

				<div className="flex flex-row justify-start items-center gap-1">
					<ButtonPill
						tip="go to discussion"
						className="px-5 py-1.5"
						onClick={(e) => {
							e.stopPropagation();
							goToPost();
						}}
					>
						<svg className="w-5 h-5 " viewBox="0 0 24 24">
							<path
								className="text-gray-700"
								fill="currentColor"
								d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z"
							/>
						</svg>
					</ButtonPill>
					{/* Can add more action buttons + admin dropdown here */}
				</div>
			</div>
		</div>
	);
}
