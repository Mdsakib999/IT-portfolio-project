import { TiTick } from "react-icons/ti";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useService } from "../../provider/ServiceProvider";
import { useAuth } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createCustomPlan } = useService();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { state } = useLocation();

  const pricingPlans = state?.plans || [];

  const defaultSelectedPlan =
    pricingPlans.length > 1 ? pricingPlans[1]._id : null;

  const handleCardLeave = () => {
    setSelectedPlan(defaultSelectedPlan);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        description: formData.requirements || "No description provided",
        proposedPrice: Number(formData.budget),
      };

      await createCustomPlan(user._id, payload);
      toast.success("Custom plan request submitted!");
      closeModal();
      reset();
    } catch (error) {
      toast.error("Failed to submit custom plan.");
    }
  };

  const getEffectiveSelectedPlan = () => {
    return selectedPlan !== null ? selectedPlan : defaultSelectedPlan;
  };

  const handleCheckout = (plan) => {
    navigate("/checkout", {
      state: {
        plan,
        serviceName: state?.serviceName,
        serviceId: state?.serviceId,
      },
    });
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-3 mb-12 md:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent font-bold">
          Pricing
        </h1>
        <p className="text-base md:text-lg font-semibold text-gray-500 font-serif mt-2">
          Choose a Plan That Fits Your Growth
        </p>
        {state?.plans.length === 0 ? (
          <p className="text-base md:text-lg text-gray-600 max-w-lg mx-auto">
            Select a Service from the service page to see the actual price based
            on your need
          </p>
        ) : null}
      </div>

      {/* Card Grid - All Screen Sizes */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        onMouseLeave={handleCardLeave}
      >
        {pricingPlans.map((plan) => {
          const effectiveSelected = getEffectiveSelectedPlan();
          const isSelected = effectiveSelected === plan._id;

          return (
            <div
              key={plan._id}
              onClick={() => setSelectedPlan(plan._id)}
              onMouseEnter={() => setSelectedPlan(plan._id)}
              className={`relative flex flex-col items-center bg-white border-2 rounded-lg shadow-lg transition-all duration-300 ${
                isSelected
                  ? "border-purple-500 scale-105 shadow-xl"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.isPopular && isSelected && (
                <div className="absolute -top-3 bg-gradient-to-r from-[#DE4396] to-[#0D1C9F] text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div
                className={`w-full text-center py-8 px-6 rounded-b-full rounded-t-lg border-b border-primary ${
                  isSelected
                    ? "bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] text-white"
                    : "bg-gray-100"
                }`}
              >
                <h1
                  className={`text-xl md:text-2xl font-bold mb-2 ${
                    isSelected ? "text-white" : "text-gray-800"
                  }`}
                >
                  {plan.title}
                </h1>
                <p
                  className={`text-3xl md:text-4xl font-bold ${
                    isSelected ? "text-white" : "text-purple-500"
                  }`}
                >
                  {plan.price}/<span className="text-sm">Month</span>
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
                <div onClick={() => handleCheckout(plan)}>
                  <button
                    className={`w-full py-3 md:py-4 rounded-full text-sm md:text-base font-semibold cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-r from-[#DE4396] to-[#0D1C9F] text-white border-transparent hover:shadow-lg"
                        : "border-2 border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white"
                    }`}
                  >
                    {isSelected ? "Get Started Now" : "Select Plan"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
                className="text-red-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                <MdCancel size={30} />
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
                  Choose Service *
                </label>
                <select
                  {...register("service", {
                    required: "Service selection is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="SEO Optimization">SEO Optimization</option>
                  <option value="App Development">App Development</option>
                </select>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service.message}
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
