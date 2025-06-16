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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!user) {
      toast.error(<h1 className="font-serif">Please login First</h1>);
      return;
    }
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        description: formData.requirements || "No description provided",
        proposedPrice: parseFloat(formData.budget),
      };

      await createCustomPlan(user._id, payload);
      toast.success("Custom plan request submitted!");
      closeModal();
      reset();
    } catch (error) {
      toast.error("Failed to submit custom plan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEffectiveSelectedPlan = () => {
    return selectedPlan !== null ? selectedPlan : defaultSelectedPlan;
  };

  const handleCheckout = (plan) => {
    localStorage.setItem(
      "selectedPlan",
      JSON.stringify({
        plan,
        serviceId: state?.serviceId,
        serviceName: state?.serviceName,
      })
    );

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
          {state.serviceName || ''} Pricing
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
     <div className="mt-16 text-center relative px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-700/70 to-gray-900/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-5xl mx-auto border border-gray-600/40 shadow-2xl backdrop-blur-sm hover:shadow-purple-500/10 hover:shadow-2xl transition-all duration-500 group">
        {/* Animated border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#DE4396]/30 via-purple-500/30 to-[#0D1C9F]/30 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        
        {/* Sparkle decorations */}
        <div className="absolute top-4 sm:top-6 right-6 sm:right-8 w-2 h-2 bg-gradient-to-r from-[#DE4396] to-[#0D1C9F] rounded-full animate-pulse"></div>
        <div className="absolute top-8 sm:top-12 left-8 sm:left-12 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-6 sm:bottom-8 right-12 sm:right-16 w-1 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse delay-700"></div>
        
        {/* Icon */}
        <div className="mb-4 sm:mb-6 relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] rounded-xl sm:rounded-2xl blur-lg opacity-30 animate-pulse"></div>
        </div>
        
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight px-2">
          Need Something Different?
        </h3>
        
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-4xl mx-auto px-2">
          Our standard plans don't fit your requirements? Let's create a custom solution
          tailored specifically to your business needs and budget.
        </p>
        
        <button
          onClick={openModal}
          className="relative cursor-pointer bg-gradient-to-r from-[#DE4396] via-purple-500 to-[#0D1C9F] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold text-base sm:text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transform group/btn overflow-hidden w-full max-w-xs mx-auto"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
          
          {/* Button content */}
          <span className="relative flex items-center justify-center gap-2">
            Request Custom Plan
            <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          
          {/* Button glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#DE4396] via-purple-500 to-[#0D1C9F] rounded-full blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity duration-300 -z-10"></div>
        </button>
        
        {/* Floating particles */}
        <div className="absolute top-16 sm:top-20 left-6 sm:left-8 w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute bottom-16 sm:bottom-20 right-8 sm:right-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s', animationDuration: '2.5s'}}></div>
        <div className="absolute top-24 sm:top-32 right-4 sm:right-6 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '2s', animationDuration: '2s'}}></div>
      </div>
    </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
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
                  defaultValue={user?.name}
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
                  defaultValue={user?.email}
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
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed hover:bg-purple-600"
                      : "cursor-pointer bg-gradient-to-r from-[#DE4396] to-[#0D1C9F] text-white hover:shadow-lg hover:bg-purple-600"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Proposal Request"}
                </button>
              </div>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
