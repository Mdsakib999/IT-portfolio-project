import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Mail,
  FileText,
  Calendar,
  Phone,
  Sparkles,
} from "lucide-react";
import axiosInstance from "../../Utils/axios";
import { formatDate } from "../../Utils/formatDate";

export const HireRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/hire-requests");
        setRequests(res.data);
        setFiltered(res.data);
      } catch (err) {
        toast.error("Failed to load hire requests.");
      }
    };
    fetchRequests();
  }, []);

  // Filter by search and status
  useEffect(() => {
    let filteredData = [...requests];
    if (search) {
      filteredData = filteredData.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      filteredData = filteredData.filter((r) => r.status === statusFilter);
    }
    setFiltered(filteredData);
    setPage(1);
  }, [search, statusFilter, requests]);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosInstance.patch(`/hire-requests/${id}/status`, {
        status,
      });
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: res.data.status } : r))
      );
      toast.success(`Request ${status}`);
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Stats calculation
  const stats = useMemo(() => {
    const pending = requests.filter((r) => r.status === "pending").length;
    const approved = requests.filter((r) => r.status === "approved").length;
    const rejected = requests.filter((r) => r.status === "rejected").length;
    return { pending, approved, rejected, total: requests.length };
  }, [requests]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hire Requests
          </h1>
          <p className="text-gray-600">
            Manage and review candidate applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Requests
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-amber-600">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {stats.approved}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white min-w-[160px]"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        {paginated.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hire requests found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {paginated.map((req) => (
              <div
                key={req._id}
                className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header with Avatar and Status */}
                <div className="flex flex-col md:flex-row gap-3  items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {req.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {req.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">{req.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {req.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm ${getStatusColor(
                      req.status
                    )}`}
                  >
                    {getStatusIcon(req.status)}
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </div>
                </div>

                {/* Service Highlight */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-3 rounded-2xl border border-indigo-100">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                    </div>
                    <span className="font-semibold text-indigo-700">
                      {req.service}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm mt-1">
                        <FileText className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Description
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {req.description.length > 100
                            ? `${req.description.slice(0, 100)}...`
                            : req.description}
                        </p>
                        {req.description.length > 100 && (
                          <button
                            onClick={() => {
                              setSelectedDescription(req.description);
                              setShowModal(true);
                            }}
                            className="inline-flex items-center gap-1 mt-3 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                          >
                            Read Full Description
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
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with Date and Actions */}
                {/* Date Submitted */}
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Submitted</span>
                    <div className="text-sm font-semibold text-gray-900">
                      {formatDate(req.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 justify-end">
                  {/* Action Buttons */}
                  {req.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleStatusChange(req._id, "approved")}
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(req._id, "rejected")}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                  )}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 bg-white rounded-xl p-2 shadow-sm border border-gray-100">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    page === idx + 1
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
