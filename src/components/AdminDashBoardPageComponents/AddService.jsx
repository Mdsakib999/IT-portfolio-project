import { useState } from "react";
import {
  Plus,
  X,
  Loader2,
  Check,
  AlertCircle,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import Swal from "sweetalert2";
import { useService } from "../../provider/ServiceProvider";

export const AddService = () => {
  const { createService, loading } = useService();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    plans: [
      {
        title: "",
        price: "",
        features: [""],
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Service title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";

    // Validate plans
    formData.plans.forEach((plan, index) => {
      if (!plan.title.trim())
        newErrors[`plan_${index}_title`] = "Plan title is required";
      if (!plan.price || isNaN(plan.price) || plan.price <= 0) {
        newErrors[`plan_${index}_price`] = "Valid price is required";
      }
      // Check if plan has at least one non-empty feature
      const validFeatures = plan.features.filter((f) => f.trim());
      if (validFeatures.length === 0) {
        newErrors[`plan_${index}_features`] =
          "At least one feature is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        plans: formData.plans.map((plan) => ({
          title: plan.title,
          price: parseFloat(plan.price),
          features: plan.features.filter((f) => f.trim()),
        })),
      };

      // Use the createService function from context
      await createService(payload);

      setSubmitStatus("success");
      setFormData({
        title: "",
        description: "",
        image: "",
        plans: [{ title: "", price: "", features: [""] }],
      });
      setErrors({});

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your service has been created successfully.",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error creating service:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      plans: [{ title: "", price: "", features: [""] }],
    });
    setErrors({});
    setSubmitStatus(null);
  };

  const handlePlanChange = (index, field, value) => {
    const updatedPlans = [...formData.plans];
    updatedPlans[index][field] = value;
    setFormData({ ...formData, plans: updatedPlans });

    // Clear errors for this field
    const errorKey = `plan_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }));
    }
  };

  const handleFeatureChange = (planIndex, featureIndex, value) => {
    const updatedPlans = [...formData.plans];
    updatedPlans[planIndex].features[featureIndex] = value;
    setFormData({ ...formData, plans: updatedPlans });

    // Clear plan features error if user is typing
    const errorKey = `plan_${planIndex}_features`;
    if (errors[errorKey] && value.trim()) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }));
    }
  };

  const addPlan = () => {
    setFormData({
      ...formData,
      plans: [...formData.plans, { title: "", price: "", features: [""] }],
    });
  };

  const removePlan = (index) => {
    const updatedPlans = formData.plans.filter((_, i) => i !== index);
    setFormData({ ...formData, plans: updatedPlans });

    // Clear related errors
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`plan_${index}_`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  const addFeature = (planIndex) => {
    const updatedPlans = [...formData.plans];
    updatedPlans[planIndex].features.push("");
    setFormData({ ...formData, plans: updatedPlans });
  };

  const removeFeature = (planIndex, featureIndex) => {
    const updatedPlans = [...formData.plans];
    updatedPlans[planIndex].features = updatedPlans[planIndex].features.filter(
      (_, i) => i !== featureIndex
    );
    setFormData({ ...formData, plans: updatedPlans });
  };

  return (
    <div>
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Create New Service</h1>
          </div>
          {/* Main Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] px-8 py-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Zap className="w-6 h-6" />
                Service Details
              </h2>
              <p className="text-purple-100 mt-2">
                Fill in the information below to create your service
              </p>
            </div>

            <div className="p-8 space-y-8 bg-white text-gray-800">
              {/* Service Title & Image URL */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Service Title */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold">
                    Service Title *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("title")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-6 py-4 border rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-primary transition-all duration-300 bg-white ${
                        errors.title
                          ? "border-red-400 bg-red-50"
                          : focusedField === "title"
                          ? "border-purple-400 shadow-md"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your service title"
                    />
                    {focusedField === "title" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                    )}
                  </div>
                  {errors.title && (
                    <p className="text-red-500 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Image URL */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold">
                    Image URL *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("image")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-6 py-4 border rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-primary transition-all duration-300 bg-white ${
                        errors.image
                          ? "border-red-400 bg-red-50"
                          : focusedField === "image"
                          ? "border-purple-400 shadow-md"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter the URL of your service image"
                    />
                    {focusedField === "image" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                    )}
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold">
                  Description *
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("description")}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className={`w-full px-6 py-4 border rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-primary transition-all duration-300 resize-none bg-white ${
                      errors.description
                        ? "border-red-400 bg-red-50"
                        : focusedField === "description"
                        ? "border-purple-400 shadow-md"
                        : "border-gray-300"
                    }`}
                    placeholder="Describe your service in detail..."
                  />
                  {focusedField === "description" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Plans */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Service Plans *</h3>
                </div>

                {formData.plans.map((plan, planIndex) => (
                  <div
                    key={planIndex}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">
                        Plan {planIndex + 1}
                      </h4>
                      {formData.plans.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePlan(planIndex)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* Title & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Plan Title *
                        </label>
                        <input
                          type="text"
                          value={plan.title}
                          onChange={(e) =>
                            handlePlanChange(planIndex, "title", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-primary bg-white transition-all ${
                            errors[`plan_${planIndex}_title`]
                              ? "border-red-400 bg-red-50"
                              : "border-gray-300"
                          }`}
                          placeholder="e.g., Basic, Premium"
                        />
                        {errors[`plan_${planIndex}_title`] && (
                          <p className="text-red-500 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errors[`plan_${planIndex}_title`]}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Price (USD) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            $
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={plan.price}
                            onChange={(e) =>
                              handlePlanChange(
                                planIndex,
                                "price",
                                e.target.value
                              )
                            }
                            className={`w-full pl-8 pr-4 py-3 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-primary bg-white transition-all ${
                              errors[`plan_${planIndex}_price`]
                                ? "border-red-400 bg-red-50"
                                : "border-gray-300"
                            }`}
                            placeholder="0.00"
                          />
                        </div>
                        {errors[`plan_${planIndex}_price`] && (
                          <p className="text-red-500 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errors[`plan_${planIndex}_price`]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Features *</label>
                      <div className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="relative w-full">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) =>
                                handleFeatureChange(
                                  planIndex,
                                  featureIndex,
                                  e.target.value
                                )
                              }
                              className="w-full pr-10 px-3 py-2 xs:px-4 xs:py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-primary bg-white transition-all text-sm xs:text-base"
                              placeholder={`Feature ${featureIndex + 1}`}
                            />
                            {plan.features.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeFeature(planIndex, featureIndex)
                                }
                                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                tabIndex={-1}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addFeature(planIndex)}
                          className="cursor-pointer w-full py-2 xs:py-3 text-purple-600 hover:text-purple-700 border border-dashed border-purple-300 hover:border-purple-400 rounded-xl font-medium transition-all duration-200 hover:bg-purple-50 text-sm xs:text-base"
                        >
                          + Add Feature
                        </button>
                      </div>
                      {errors[`plan_${planIndex}_features`] && (
                        <p className="text-red-500 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors[`plan_${planIndex}_features`]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addPlan}
                  className="cursor-pointer w-full py-4 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 border border-purple-200 hover:border-purple-300 text-purple-600 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Add Another Plan
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || loading}
                  className="cursor-pointer flex-1 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] py-4 px-8 rounded-2xl font-bold text-lg text-white shadow-md focus:ring-4 focus:ring-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isSubmitting || loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Creating Service...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                      Create Service
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting || loading}
                  className="sm:w-auto bg-gray-100 hover:bg-gray-200 py-4 px-8 rounded-2xl font-semibold focus:ring-4 focus:ring-gray-300 border border-gray-300 transition-all duration-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
