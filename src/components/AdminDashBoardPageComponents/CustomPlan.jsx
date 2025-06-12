import { useEffect, useState, useMemo } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  DollarSign,
  FileText,
  Calendar,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import axios from "../../Utils/axios";
import { toast } from "react-hot-toast";

export const CustomPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingPlan, setUpdatingPlan] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("/custom-plans");
        setPlans(res.data);
      } catch (error) {
        toast.error("Failed to load custom plans");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const filteredAndSortedPlans = useMemo(() => {
    let filtered = [...plans];

    if (searchTerm) {
      filtered = filtered.filter((plan) =>
        ["name", "email", "service", "description"].some((key) =>
          plan[key]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((plan) => plan.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [plans, searchTerm, statusFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedPlans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPlans = filteredAndSortedPlans.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

  const handleStatusChange = async (planId, status) => {
    setUpdatingPlan(planId);
    try {
      await axios.patch(`/custom-plans/${planId}/status`, { status });
      toast.success(`Plan ${status}`);
      setPlans((prev) =>
        prev.map((plan) => (plan._id === planId ? { ...plan, status } : plan))
      );
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    } finally {
      setUpdatingPlan(null);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };
  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
          border: "border-emerald-200",
          bg: "bg-emerald-50",
          badge: "text-emerald-800 bg-emerald-100 border-emerald-200",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "rejected":
        return {
          border: "border-red-200",
          bg: "bg-red-50",
          badge: "text-red-800 bg-red-100 border-red-200",
          icon: <XCircle className="w-4 h-4" />,
        };
      case "pending":
      default:
        return {
          border: "border-amber-200",
          bg: "bg-amber-50",
          badge: "text-amber-800 bg-amber-100 border-amber-200",
          icon: <Clock className="w-4 h-4" />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Custom Plans</h1>
              <p className="text-gray-600 mt-1">
                Review and manage custom service requests
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {[
              {
                label: "Total Requests",
                value: plans.length,
                color: "text-blue-600",
              },
              {
                label: "Pending",
                value: plans.filter((p) => p.status === "pending").length,
                color: "text-amber-600",
              },
              {
                label: "Approved",
                value: plans.filter((p) => p.status === "approved").length,
                color: "text-emerald-600",
              },
              {
                label: "Filtered Results",
                value: filteredAndSortedPlans.length,
                color: "text-purple-600",
              },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Plans
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {filteredAndSortedPlans.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {plans.length === 0
                ? "No custom plans found"
                : "No plans match your filters"}
            </h3>
            <p className="text-gray-600">
              {plans.length === 0
                ? "Custom plan requests will appear here when submitted."
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {currentPlans.map((plan) => {
              const statusConfig = getStatusConfig(plan.status);

              return (
                <div
                  key={plan._id}
                  className={`rounded-2xl border ${statusConfig.border} ${statusConfig.bg} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-100 bg-white/50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-bold text-gray-900">
                            {plan.service}
                          </h2>
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${statusConfig.badge}`}
                          >
                            {statusConfig.icon}
                            {plan.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          Submitted{" "}
                          {new Date(plan.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Client Info */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                          Client Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Name</p>
                              <p className="font-medium text-gray-900">
                                {plan.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Mail className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium text-gray-900">
                                {plan.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <DollarSign className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Proposed Price
                              </p>
                              <p className="font-bold text-gray-900 text-lg">
                                ${plan.proposedPrice.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                          Project Details
                        </h3>
                        <div className="bg-white/70 rounded-xl p-4 border border-gray-100">
                          <p className="text-gray-700 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {plan.status === "pending" && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex gap-3 sm:justify-end">
                          <button
                            onClick={() =>
                              handleStatusChange(plan._id, "rejected")
                            }
                            disabled={updatingPlan === plan._id}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-red-300 text-red-700 font-semibold rounded-xl hover:bg-red-50 hover:border-red-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {updatingPlan === plan._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            Reject
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(plan._id, "approved")
                            }
                            disabled={updatingPlan === plan._id}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {updatingPlan === plan._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                            Approve
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Results Info */}
        <div className="flex justify-between items-center my-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredAndSortedPlans.length)} of{" "}
            {filteredAndSortedPlans.length} results
            {filteredAndSortedPlans.length !== plans.length && (
              <span className="ml-2 text-indigo-600">
                (filtered from {plans.length} total)
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
};
