import { useRouter } from "next/router";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import CardContainer from "./CardContainer";

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
		<CardContainer wide={wide} onClick={goToPost}>
			<div className="max-h-[210px] relative overflow-ellipsis">
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
					className="overflow-hidden"
				/>
			</div>

			<div className="w-full h-auto bg-backAccent p-1 gap-1 border-t-2 flex flex-row justify-between items-center text-sm [&>*]:text-opacity-60">
				<p>{author}</p>
				<p>{createdAt}</p>
			</div>
		</CardContainer>
	);
}
