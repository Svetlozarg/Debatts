import { useRouter } from "next/router";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import ButtonPill from "../buttons/ButtonPill";

export default function Card({ title, body, wide, id, author, createdAt }) {
	const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

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
				wide ? "col-span-3 sm:col-span-6 lg:col-span-6" : "col-span-3"
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

			<div className="w-full h-auto bg-backAccent p-1 gap-1 border-t-2 flex flex-row justify-between items-center text-sm [&>*]:text-opacity-60">
				<p>{author}</p>
				<p>{createdAt}</p>
			</div>
		</div>
	);
}
