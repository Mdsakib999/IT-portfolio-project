import { TiTick } from "react-icons/ti";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Pricing = () => {
	const [selectedPlan, setSelectedPlan] = useState(2);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const pricingPlans = [
		{
			id: 1,
			name: "Starter",
			price: "$49.99",
			period: "per month",
			features: [
				"Basic Website Development",
				"Email Support",
				"1 Domain Included",
				"5GB Storage",
				"Basic Analytics",
			],
			isPopular: false,
		},
		{
			id: 2,
			name: "Professional",
			price: "$99.99",
			period: "per month",
			features: [
				"Advanced Web Development",
				"24/7 Priority Support",
				"5 Domains Included",
				"50GB Storage",
				"Advanced Analytics",
				"SEO Optimization",
				"Mobile App Development",
			],
			isPopular: true,
		},
		{
			id: 3,
			name: "Enterprise",
			price: "$199.99",
			period: "per month",
			features: [
				"Custom Solutions",
				"Dedicated Account Manager",
				"Unlimited Domains",
				"500GB Storage",
				"Real-time Analytics",
				"Complete Digital Marketing",
				"Cloud Infrastructure",
			],
			isPopular: false,
		},
	];

	const handleCardSelect = (planId) => {
		setSelectedPlan(planId);
	};

	const handleCardLeave = () => {
		setSelectedPlan(2);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		reset(); // Clear form fields
	};

	const handleModalBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const onSubmit = (data) => {
		console.log("Form submitted:", data);
		// Handle form submission here
		closeModal();
	};

	return (
		<div className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
			<div className="text-center space-y-3 mb-12 md:mb-16">
				<h1 className="text-2xl sm:text-3xl md:text-4xl bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent font-bold">
					Pricing
				</h1>
				<p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
					Choose a Plan That Fits Your Growth
				</p>
			</div>

			{/* Card Grid - All Screen Sizes */}
			<div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
				onMouseLeave={handleCardLeave}
			>
				{pricingPlans.map((plan) => (
					<div
						key={plan.id}
						onClick={() => handleCardSelect(plan.id)}
						onMouseEnter={() => handleCardSelect(plan.id)}
						className={`relative flex flex-col items-center bg-white border-2 shadow-lg cursor-pointer transition-all duration-300 ${
							selectedPlan === plan.id
								? "border-purple-500 scale-105 shadow-xl"
								: "border-gray-200 hover:border-gray-300"
						}`}
					>
						{plan.isPopular && selectedPlan === plan.id && (
							<div className="absolute -top-3 bg-gradient-to-r from-[#DE4396] to-[#0D1C9F] text-white px-4 py-1 rounded-full text-xs font-semibold">
								Most Popular
							</div>
						)}

						<div
							className={`w-full text-center py-8 px-6 rounded-b-full border-b border-[#5E35B1] ${
								selectedPlan === plan.id
									? "bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] text-white"
									: "bg-gray-100"
							}`}
						>
							<h1
								className={`text-xl md:text-2xl font-bold mb-2 ${
									selectedPlan === plan.id ? "text-white" : "text-gray-800"
								}`}
							>
								{plan.name}
							</h1>
							<p
								className={`text-3xl md:text-4xl font-bold ${
									selectedPlan === plan.id ? "text-white" : "text-purple-500"
								}`}
							>
								{plan.price}
							</p>
							<p
								className={`text-sm md:text-base ${
									selectedPlan === plan.id ? "text-white/90" : "text-gray-600"
								}`}
							>
								{plan.period}
							</p>
						</div>

						<ul className="py-6 px-6 space-y-3 flex-grow w-full">
							{plan.features.map((feature, index) => (
								<li
									key={index}
									className="flex items-start gap-x-3 text-gray-700"
								>
									<TiTick
										color="green"
										size={20}
										className="flex-shrink-0 mt-0.5"
									/>
									<span className="text-sm md:text-base">{feature}</span>
								</li>
							))}
						</ul>

						<div className="pb-6 px-6 w-full">
							<button
								className={`w-full py-3 md:py-4 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
									selectedPlan === plan.id
										? "bg-gradient-to-r from-[#DE4396] to-[#0D1C9F] text-white border-transparent hover:shadow-lg"
										: "border-2 border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white"
								}`}
							>
								{selectedPlan === plan.id ? "Get Started Now" : "Select Plan"}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Custom Plan Section */}
			<div className="mt-16 text-center">
				<div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
					<h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
						Need Something Different?
					</h3>
					<p className="text-base text-gray-600 mb-8 leading-relaxed">
						Our standard plans don't fit your requirements? Let's create a
						custom solution tailored specifically to your business needs and
						budget.
					</p>
					<button
						onClick={openModal}
						className="cursor-pointer bg-gradient-to-r from-[#DE4396] to-[#0D1C9F] text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-lg hover:scale-105"
					>
						Request Custom Plan
					</button>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
					onClick={handleModalBackdropClick}
				>
					<div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center p-6 border-b border-gray-200">
							<h2 className="text-xl font-bold text-gray-800">
								Request Custom Plan
							</h2>
							<button
								onClick={closeModal}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<div className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Full Name *
								</label>
								<input
									{...register("name", { required: "Name is required" })}
									type="text"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									placeholder="Enter your full name"
								/>
								{errors.name && (
									<p className="text-red-500 text-sm mt-1">
										{errors.name.message}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Email Address *
								</label>
								<input
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address",
										},
									})}
									type="email"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									placeholder="Enter your email"
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">
										{errors.email.message}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Budget Amount *
								</label>
								<input
									{...register("budget", {
										required: "Budget amount is required",
										min: {
											value: 1,
											message: "Budget must be greater than 0",
										},
									})}
									type="number"
									min="1"
									step="0.01"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									placeholder="Enter your budget amount (e.g., 150.00)"
								/>
								{errors.budget && (
									<p className="text-red-500 text-sm mt-1">
										{errors.budget.message}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Project Requirements *
								</label>
								<textarea
									{...register("requirements", {
										required: "Project requirements are required",
									})}
									rows={4}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
									placeholder="Describe your project requirements, goals, and any specific features you need..."
								/>
								{errors.requirements && (
									<p className="text-red-500 text-sm mt-1">
										{errors.requirements.message}
									</p>
								)}
							</div>

							<div className="pt-4">
								<button
									onClick={handleSubmit(onSubmit)}
									className="cursor-pointer w-full bg-gradient-to-r from-[#DE4396] to-[#0D1C9F] text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
								>
									Submit Proposal Request
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Pricing;
