import { useState, useEffect } from "react";
//https:stackoverflow.com/a/65008608/9296938

export default function useOnScreen(ref) {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = new IntersectionObserver(([entry]) =>
		setIntersecting(entry.isIntersecting)
	);

	useEffect(() => {
		observer.observe(ref.current);
		// Remove the observer as soon as the component is unmounted
		return () => {
			observer.disconnect();
		};
	}, []);

	return isIntersecting;
}
