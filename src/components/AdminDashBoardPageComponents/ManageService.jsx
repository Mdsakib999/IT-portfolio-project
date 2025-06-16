import { useState } from "react";
import { useService } from "../../provider/ServiceProvider";
import Swal from "sweetalert2";
import { PrimaryButton } from "../Shared/PrimaryButton";
import Loading from "../../Utils/Loading";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export const ManageService = () => {
  const {
    services,
    plans,
    loading,
    createService,
    updateService,
    deleteService,
    updatePlan,
    deletePlan,
  } = useService();

  // UI State
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Form States
  const [serviceForm, setServiceForm] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
  });

  const [editingPlans, setEditingPlans] = useState([]);

  // Reset forms
  const resetServiceForm = () => {
    setServiceForm({
      title: "",
      description: "",
      category: "",
      image: "",
    });

    setEditingService(null);
    setEditingPlans([]);
    setShowServiceModal(false);
  };

  const showConfirmDialog = (title, text, onConfirm) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  };
  // Handle service operations
  const handleServiceSubmit = async () => {
    try {
      if (editingService) {
        await updateService(editingService._id, serviceForm);

        // Update all modified plans
        for (const plan of editingPlans) {
          if (plan._id) {
            const planData = {
              ...plan,
              price: parseFloat(plan.price),
            };
            await updatePlan(plan._id, planData);
          }
        }
      } else {
        await createService(serviceForm);
      }
      resetServiceForm();
    } catch (error) {
      console.error("Service operation failed:", error);
    }
  };

  const handleEditService = (service) => {
    setServiceForm({
      title: service.title || "",
      description: service.description || "",
      category: service.category || "",
      image: service.image || "",
    });

    setEditingService(service);

    // Load associated plans from the global plans list
    const servicePlans = service.plan || [];
    setEditingPlans(
      servicePlans.map((plan) => ({
        ...plan,
        price: plan.price?.toString() || "",
        features: plan.features || [],
      }))
    );

    setShowServiceModal(true);
  };

  const handleDeleteService = async (service) => {
    showConfirmDialog(
      "Delete Service",
      `Are you sure you want to delete "${service.title}"? This action cannot be undone.`,
      async () => {
        try {
          await deleteService(service._id);
        } catch (error) {
          console.error("Failed to delete service:", error);
        }
      }
    );
  };

  // Handle plan operations within service modal
  const updatePlanInList = (index, field, value) => {
    setEditingPlans((prev) =>
      prev.map((plan, i) => (i === index ? { ...plan, [field]: value } : plan))
    );
  };

  const addFeatureToPlan = (planIndex, feature) => {
    if (feature.trim()) {
      setEditingPlans((prev) =>
        prev.map((plan, i) =>
          i === planIndex
            ? { ...plan, features: [...plan.features, feature.trim()] }
            : plan
        )
      );
    }
  };

  const removeFeatureFromPlan = (planIndex, featureIndex) => {
    setEditingPlans((prev) =>
      prev.map((plan, i) =>
        i === planIndex
          ? {
              ...plan,
              features: plan.features.filter((_, fi) => fi !== featureIndex),
            }
          : plan
      )
    );
  };

  const handleDeletePlan = async (planId, planIndex) => {
    showConfirmDialog(
      "Delete Plan",
      "Are you sure you want to delete this plan? This action cannot be undone.",
      async () => {
        try {
          if (planId) {
            await deletePlan(planId);
          }
          // Remove from local state
          setEditingPlans((prev) => prev.filter((_, i) => i !== planIndex));
        } catch (error) {
          console.error("Failed to delete plan:", error);
        }
      }
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Manage Services
        </h1>
        <p className="text-gray-600">
          Update, and manage your services and their subscription plans
        </p>
      </div>

      {/* Services Section */}
      <div>
        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const servicePlans = service.plan || [];

            return (
              <div
                key={service._id}
                className="group relative bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 "
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500"></div>

                <div className="relative p-6 h-full flex flex-col">
                  {/* Header with icon and title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-8 h-8 filter invert"
                        />
                      </div>
                      {/* Pulsing ring effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-white group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
                        {service.title}
                      </h3>

                      {/* Plans badge */}
                      <div className="inline-flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-semibold text-purple-700">
                            {servicePlans.length} plan
                            {servicePlans.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {service.description && (
                    <div className="flex-1 mb-6">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <PrimaryButton
                      onClick={() => handleEditService(service)}
                      className="flex-1 relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </PrimaryButton>

                    <button
                      onClick={() => handleDeleteService(service)}
                      className="flex-1 relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group/btn"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012-2 2 2 0 012 2v8a4 4 0 01-4 4H6a4 4 0 01-4-4V5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No services yet
          </h3>
        </div>
      )}

      {/* Service Modal */}
      <Modal
        isOpen={showServiceModal}
        onClose={resetServiceForm}
        title={"Edit Service"}
        className="w-full max-w-7xl mx-4 sm:mx-6 lg:mx-8"
      >
        <div className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50/30 rounded-2xl overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-2xl lg:blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-gradient-to-tr from-indigo-200/20 to-purple-200/20 rounded-full blur-xl lg:blur-2xl"></div>

          <div className="relative space-y-6 sm:space-y-8 p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            {/* Header Section */}
            <div className="text-center pb-4 sm:pb-6 border-b border-gradient-to-r from-transparent via-gray-200 to-transparent">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent px-2">
                {editingService ? "Edit Service" : "Create New Service"}
              </h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base px-2">
                {editingService
                  ? "Update your service details and manage plans"
                  : "Add a new service"}
              </p>
            </div>

            {/* Service Details Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Service Details
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={serviceForm.title}
                        onChange={(e) =>
                          setServiceForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                        placeholder="Enter service name..."
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={serviceForm.image}
                        onChange={(e) =>
                          setServiceForm((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }
                        className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                        placeholder="https://example.com/image.jpg"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      value={serviceForm.description}
                      onChange={(e) =>
                        setServiceForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400 resize-none text-sm sm:text-base"
                      placeholder="Describe your service in detail..."
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Plans Section - Only show when editing */}
            {editingService && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Service Plans
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-teal-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-semibold text-green-700">
                      {editingPlans.length} plan
                      {editingPlans.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {editingPlans.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium text-sm sm:text-base">
                      No plans found for this service
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 px-4">
                      Create plans to offer different service packages
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6 max-h-80 sm:max-h-96 overflow-y-auto custom-scrollbar">
                    {editingPlans.map((plan, planIndex) => (
                      <div
                        key={plan._id || planIndex}
                        className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 sm:p-6 shadow-md border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 group"
                      >
                        {/* Plan header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 sm:mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                              {planIndex + 1}
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                              Plan #{planIndex + 1}
                            </h4>
                          </div>
                          <button
                            onClick={() =>
                              handleDeletePlan(plan._id, planIndex)
                            }
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            <span className="hidden sm:inline">
                              Delete Plan
                            </span>
                            <span className="sm:hidden">Delete</span>
                          </button>
                        </div>

                        {/* Plan details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Plan Name
                            </label>
                            <input
                              type="text"
                              value={plan.title || ""}
                              onChange={(e) =>
                                updatePlanInList(
                                  planIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              className="w-full bg-white border-2 border-gray-200 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-sm sm:text-base"
                              placeholder="Enter plan name..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Price ($)
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={plan.price || ""}
                              onChange={(e) =>
                                updatePlanInList(
                                  planIndex,
                                  "price",
                                  e.target.value
                                )
                              }
                              className="w-full bg-white border-2 border-gray-200 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-sm sm:text-base"
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <label className="text-sm font-semibold text-gray-700">
                              Features ({plan.features.length})
                            </label>
                          </div>

                          <div className="space-y-2 sm:space-y-3 bg-gray-50/50 rounded-xl p-3 sm:p-4">
                            {plan.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center gap-2 sm:gap-3 bg-white rounded-lg p-2 sm:p-3 shadow-sm border border-gray-100"
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex-shrink-0"></div>
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => {
                                    const newFeatures = [...plan.features];
                                    newFeatures[featureIndex] = e.target.value;
                                    updatePlanInList(
                                      planIndex,
                                      "features",
                                      newFeatures
                                    );
                                  }}
                                  className="flex-1 bg-transparent border-none focus:outline-none text-xs sm:text-sm min-w-0"
                                  placeholder="Enter feature description..."
                                />
                                <button
                                  onClick={() =>
                                    removeFeatureFromPlan(
                                      planIndex,
                                      featureIndex
                                    )
                                  }
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 sm:p-2 rounded-lg transition-all duration-300 flex-shrink-0"
                                >
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4"
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
                            ))}

                            <button
                              onClick={() => {
                                const newFeature = prompt("Enter new feature:");
                                if (newFeature && newFeature.trim()) {
                                  addFeatureToPlan(
                                    planIndex,
                                    newFeature.trim()
                                  );
                                }
                              }}
                              className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 py-2.5 sm:py-3 rounded-lg border-2 border-dashed border-blue-200 hover:border-blue-300 transition-all duration-300 font-medium text-xs sm:text-sm"
                            >
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                              Add New Feature
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
              <button
                type="button"
                onClick={resetServiceForm}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleServiceSubmit}
                className="w-full sm:w-auto relative overflow-hidden px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="hidden sm:inline">
                    {editingService
                      ? "Update Service & Plans"
                      : "Create Service"}
                  </span>
                  <span className="sm:hidden">
                    {editingService ? "Update" : "Create"}
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
