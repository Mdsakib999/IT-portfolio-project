import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > 300);
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		isVisible && (
			<button
				onClick={scrollToTop}
				className="cursor-pointer fixed bottom-5 right-5 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition"
			>
				<FaArrowUp />
			</button>
		)
	);
}
