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
}) {
	return (
		<div className={containerClassName}>
			{label && (
				<label
					htmlFor={id}
					className="block mb-2 text-sm font-medium select-none"
				>
					{label}
				</label>
			)}
			<textarea
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
		</div>
	);
}
