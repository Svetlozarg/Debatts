import { useRef } from "react";

export default function TextInputContainerless({
	placeholder,
	onChange,
	label,
	id,
	type,
	containerClassName,
	className,
	required,
	pattern,
	characterLimit,
}) {
	const textRef = useRef();

	return (
		<div className={"relative " + containerClassName}>
			{label && (
				<label
					htmlFor={id}
					className="block mb-2 text-sm font-medium select-none"
				>
					{label}
				</label>
			)}
			<textarea
				ref={textRef}
				type={type}
				name={id}
				onChange={onChange}
				placeholder={placeholder}
				required={required ?? false}
				rows={1}
				className={
					" placeholder:text-black/80 focus:border-main focus:outline p-2 transition-all duration-150 w-full resize-none " +
					className
				}
				pattern={pattern ?? null}
			></textarea>
			<div className="absolute right-4 bottom-4">
				{textRef.current && characterLimit && (
					<p
						className={`${
							textRef.current.value.length / characterLimit > 0.4
								? "aboslute"
								: "hidden"
						} ${
							textRef.current.value.length / characterLimit > 0.8
								? "text-orange-600"
								: ""
						} ${
							textRef.current.value.length / characterLimit >= 1
								? "!text-warning"
								: "text-black"
						} text-opacity-60 p-0.5 bg-black bg-opacity-5 rounded-md`}
					>
						{textRef.current.value.length}/{characterLimit}
					</p>
				)}
			</div>
		</div>
	);
}
