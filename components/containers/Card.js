import { useRef } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import ButtonPill from "../buttons/ButtonPill";

export default function Card({ title, body, wide, agrees, disagrees }) {
	const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

	// check for overflow to decide if bottom gradient should be shown
	const conatinerRef = useRef();

	return (
		<div
			className={`flex flex-col justify-between max-h-[250px] bg-backAccent w-full shadow-md border rounded-md overflow-hidden ${
				wide ? "col-span-6" : "col-span-3"
			}`}
			onClick={() => {}}
		>
			<div
				ref={conatinerRef}
				className="max-h-[210px] relative overflow-hidden overflow-ellipsis p-2"
			>
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
				<div className="flex flex-row justify-start items-center gap-1">
					<ButtonPill className="hover:bg-green-200">
						<svg className="w-5 h-5 " viewBox="0 0 24 24">
							<path
								className="text-green-600"
								fill="currentColor"
								d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
							/>
						</svg>
						{agrees ?? "---"}
					</ButtonPill>
					<ButtonPill className="hover:bg-red-200">
						<svg className="w-5 h-5 " viewBox="0 0 24 24">
							<path
								className="text-red-400"
								fill="currentColor"
								d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
							/>
						</svg>
						{disagrees ?? "---"}
					</ButtonPill>
				</div>

				<div className="flex flex-row justify-start items-center gap-1">
					<ButtonPill tip="go to discussion" className="px-5 py-1.5">
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
