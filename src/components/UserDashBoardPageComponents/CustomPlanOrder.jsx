import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  User,
  Mail,
  FileText,
} from "lucide-react";
import axiosInstance from "../../Utils/axios";
import { useAuth } from "../../provider/AuthProvider";
import Loading from "../../Utils/Loading";
import { formatDate } from "../../Utils/formatDate";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../Shared/PrimaryButton";

export const CustomPlanOrder = () => {
  const [customPlans, setCustomPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?._id;

  const fetchCustomPlans = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/custom-plans/user/${userId}`);
      setCustomPlans(response.data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err?.response?.data?.message || err.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchCustomPlans();
    }
  }, [userId, fetchCustomPlans]);

  const handleCheckout = (plan) => {
    navigate("/checkout", {
      state: {
        customPlanId: plan._id,
        plan: "custom plan",
        serviceName: plan?.service,
        serviceId: "",
        amount: plan?.proposedPrice,
        description: plan?.description,
      },
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-xl mx-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Orders
          </h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchCustomPlans}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              My Custom Plan Orders
            </h1>
          </div>
          <p className="text-gray-600">
            Track and manage your custom service requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Total Orders",
              count: customPlans.length,
              icon: <Package className="w-8 h-8 text-indigo-600" />,
            },
            {
              label: "Approved",
              count: customPlans.filter((p) => p.status === "approved").length,
              icon: <CheckCircle className="w-8 h-8 text-green-600" />,
            },
            {
              label: "Pending",
              count: customPlans.filter((p) => p.status === "pending").length,
              icon: <Clock className="w-8 h-8 text-yellow-600" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {item.count}
                  </p>
                </div>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Orders List */}
        {customPlans.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Custom Orders Yet
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't submitted any custom plan requests yet.
            </p>
            <Link to="/service">
              {" "}
              <PrimaryButton className="hover:bg-indigo-700 transition-colors font-medium">
                Create Custom Plan
              </PrimaryButton>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {customPlans.map((plan) => (
              <div
                key={plan._id || plan.createdAt}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {plan.service}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Order #{plan._id?.slice(-8) || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                        plan.status
                      )}`}
                    >
                      {getStatusIcon(plan.status)}
                      <span className="capitalize">{plan.status}</span>
                    </div>
                    <div className="flex gap-3">
                      {plan.status === "approved" &&
                      plan.paymentStatus === "pending" ? (
                        <button
                          onClick={() => handleCheckout(plan)}
                          className="cursor-pointer px-4 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                        >
                          Pay Now
                        </button>
                      ) : plan.status === "approved" &&
                        plan.paymentStatus === "paid" ? (
                        <span className="text-green-100 font-semibold border px-5 py-2 bg-green-700 rounded-md font-inknut">
                          Paid
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {[
                        {
                          icon: <User />,
                          label: "Contact Person",
                          value: plan.name,
                        },
                        { icon: <Mail />, label: "Email", value: plan.email },
                        {
                          icon: <DollarSign />,
                          label: "Proposed Price",
                          value: `$${plan.proposedPrice}`,
                          className: "text-lg font-bold text-green-600",
                        },
                        {
                          icon: <Calendar />,
                          label: "Submitted On",
                          value: formatDate(plan.createdAt),
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="text-gray-400 mt-0.5 w-5 h-5">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              {item.label}
                            </p>
                            <p
                              className={`font-medium text-gray-900 ${
                                item.className || ""
                              }`}
                            >
                              {item.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-2">
                            Description
                          </p>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 leading-relaxed">
                              {plan.description.length > 100
                                ? `${plan.description.slice(0, 100)}... `
                                : plan.description}
                              {plan.description.length > 100 && (
                                <button
                                  onClick={() => {
                                    setSelectedDescription(plan.description);
                                    setShowModal(true);
                                  }}
                                  className="cursor-pointer text-indigo-600 font-medium hover:underline ml-1"
                                >
                                  Read More
                                </button>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white w-full max-w-2xl mx-4 md:mx-0 p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 ease-out animate-fade-in">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                aria-label="Close Modal"
              >
                &times;
              </button>

              {/* Modal Content */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Full Description
              </h2>
              <div className="max-h-[60vh] overflow-y-auto pr-1">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={fetchCustomPlans}
            className="cursor-pointer px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            Refresh Orders
          </button>
        </div>
      </div>
    </div>
  );
};
