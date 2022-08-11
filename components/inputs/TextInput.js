export default function TextInput({
	placeholder,
	onChange,
	label,
	id,
	type,
	containerClassName,
	required,
	pattern,
}) {
	return (
		<div className={containerClassName}>
			<label htmlFor={id} className="block mb-2 text-sm font-medium ">
				{label}
			</label>
			<input
				type={type}
				name={id}
				onChange={onChange}
				placeholder={placeholder}
				required={required ?? false}
				className="bg-gray-200 border-0 text-sm rounded-md focus:ring-main/30 focus:border-main border-opacity-40 p-2 transition-all duration-150 w-full"
				pattern={pattern ?? null}
			></input>
		</div>
	);
}
