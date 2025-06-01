import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Bar } from "../Shared/Bar";
import { servicesData } from "../../Data/serviceData";

export const OfferedServices = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage] = useState(3);

	const nextSlide = () => {
		setCurrentIndex((prev) =>
			prev + itemsPerPage >= servicesData.length ? 0 : prev + itemsPerPage
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) =>
			prev === 0
				? Math.max(0, servicesData.length - itemsPerPage)
				: Math.max(0, prev - itemsPerPage)
		);
	};

	const getCurrentServices = () => {
		return servicesData.slice(currentIndex, currentIndex + itemsPerPage);
	};

	const totalPages = Math.ceil(servicesData.length / itemsPerPage);
	const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;

	return (
		<div className="min-h-screen bg-slate-100  px-4 relative overflow-hidden my-10 pb-10">
			{/* Decorative Elements */}
			<div className="absolute -top-10 left-10 w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full z-10" />
			<div className="absolute -bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full z-10" />

			<div className="max-w-7xl mx-auto mt-20 md:mt-0">
				{/* Header */}
				<Bar />
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
						Services we offer
					</h2>
				</div>

				{/* Services Cards */}
				<div className="relative">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
						{getCurrentServices().map((service, index) => {
							const IconComponent = service.icon;
							const isCenter = index === 1 && getCurrentServices().length === 3;

							return (
								<div
									key={service.id}
									className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
										isCenter
											? "lg:scale-105 border-2 border-purple-200"
											: "hover:scale-105"
									}`}
								>
									{/* Card Background Gradient */}
									<div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

									{/* Content */}
									<div className="relative z-10">
										{/* Icon */}
										<div
											className={`inline-flex items-center justify-center w-16 h-16 ${service.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
										>
											<IconComponent size={24} />
										</div>

										{/* Title */}
										<h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
											{service.title}
										</h3>

										{/* Description */}
										<p className="text-gray-600 leading-relaxed text-sm">
											{service.description}
										</p>

										{/* Hover Arrow */}
										<div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="inline-flex items-center text-purple-600 font-medium">
												Learn More
												<ChevronRight
													size={16}
													className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
												/>
											</div>
										</div>
									</div>

									{/* Decorative Corner */}
									<div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</div>
							);
						})}
					</div>
					{/* Navigation Arrows */}
					<div className="flex justify-center items-center gap-6">
						<button
							onClick={prevSlide}
							className="cursor-pointer flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-100 hover:border-purple-300 transition-all duration-300 group"
							disabled={currentIndex === 0}
						>
							<ChevronLeft
								size={20}
								className={`transition-colors duration-300 ${
									currentIndex === 0
										? "text-gray-400"
										: "text-gray-600 group-hover:text-purple-600"
								}`}
							/>
						</button>

						{/* Page Indicators */}
						<div className="flex gap-3">
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i}
									onClick={() => setCurrentIndex(i * itemsPerPage)}
									className={`w-3 h-3 rounded-full transition-all duration-300 ${
										i === currentPage - 1
											? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125"
											: "bg-gray-300 hover:bg-purple-300"
									}`}
								/>
							))}
						</div>

						<button
							onClick={nextSlide}
							className="cursor-pointer flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-100 hover:border-purple-300 transition-all duration-300 group"
							disabled={currentIndex + itemsPerPage >= servicesData.length}
						>
							<ChevronRight
								size={20}
								className={`transition-colors duration-300 ${
									currentIndex + itemsPerPage >= servicesData.length
										? "text-gray-400"
										: "text-gray-600 group-hover:text-purple-600"
								}`}
							/>
						</button>
					</div>
					{/* Page Counter */}
					<div className="text-center mt-6">
						<span className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
							{String(currentPage).padStart(2, "0")} /{" "}
							{String(totalPages).padStart(2, "0")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
