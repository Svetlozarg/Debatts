export default function Checkbox({
	children,
	onChange,
	id,
	required,
	containerClassName,
}) {
	return (
		<div
			className={
				"flex flex-row justify-start items-center " + containerClassName
			}
		>
			<input
				onChange={onChange}
				type="checkbox"
				id={id}
				className=" w-4 h-4 bg-gray-50 rounded-md border border-gray-300 text-black"
				required={required}
			></input>
			<label
				htmlFor={id}
				className="ml-2 text-sm h-4 font-medium select-none"
			>
				{children}
			</label>
		</div>
	);
}
