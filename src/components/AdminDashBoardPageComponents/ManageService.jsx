import { useState } from "react";
import { useService } from "../../provider/ServiceProvider";

// Move Modal component outside to prevent re-creation on every render
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
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

  console.log(services);
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

  // SweetAlert-like confirmation dialog
  const showConfirmDialog = (title, text, onConfirm) => {
    const result = window.confirm(`${title}\n\n${text}`);
    if (result) {
      onConfirm();
    }
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
      `Are you sure you want to delete "${service.name}"? This action cannot be undone.`,
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
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const servicePlans = plans.filter(
              (plan) => plan.serviceId === service._id
            );

            return (
              <div
                key={service._id}
                className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Service Image */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full flex items-center justify-center bg-gray-100"
                    style={{ display: service.image ? "none" : "flex" }}
                  >
                    <div className="text-center text-gray-400">
                      <svg
                        className="w-12 h-12 mx-auto mb-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm">No Image</p>
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {service.plan.length} plan
                        {service.plan.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {service.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditService(service)}
                      className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service)}
                      className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
      </div>

      {/* Service Modal */}
      <Modal
        isOpen={showServiceModal}
        onClose={resetServiceForm}
        title={editingService ? "Edit Service" : "Create Service"}
      >
        <div className="space-y-6">
          {/* Service Details Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium mb-4">Service Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) =>
                      setServiceForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={serviceForm.image}
                    onChange={(e) =>
                      setServiceForm((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={serviceForm.description}
                  onChange={(e) =>
                    setServiceForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your service..."
                />
              </div>
            </div>
          </div>

          {/* Plans Section - Only show when editing */}
          {editingService && (
            <div>
              <h3 className="text-lg font-medium mb-4">
                Service Plans ({editingPlans.length})
              </h3>

              {editingPlans.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    No plans found for this service
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {editingPlans.map((plan, planIndex) => (
                    <div
                      key={plan._id || planIndex}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">Plan #{planIndex + 1}</h4>
                        <button
                          onClick={() => handleDeletePlan(plan._id, planIndex)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete Plan
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Features
                        </label>
                        <div className="space-y-2">
                          {plan.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center space-x-2"
                            >
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
                                className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={() =>
                                  removeFeatureFromPlan(planIndex, featureIndex)
                                }
                                className="text-red-500 hover:text-red-700 text-sm px-2"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newFeature = prompt("Enter new feature:");
                              if (newFeature && newFeature.trim()) {
                                addFeatureToPlan(planIndex, newFeature.trim());
                              }
                            }}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                          >
                            + Add Feature
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={resetServiceForm}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleServiceSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editingService ? "Update Service & Plans" : "Create Service"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
