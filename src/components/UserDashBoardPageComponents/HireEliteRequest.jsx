import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  User,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../../provider/AuthProvider";
import axiosInstance from "../../Utils/axios";
import Loading from "../../Utils/Loading";

export const HireEliteRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const userId = user?._id;

  const fetchRequests = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const res = await axiosInstance.get(`/hire-requests/user/${userId}`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch hire requests.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [userId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "in-progress":
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Request List */}
        {requests.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-purple-100 mt-20">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Hire Requests Found
            </h3>
            <p className="text-gray-600 text-lg">
              You haven't submitted any hire requests yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row gap-4 items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {req.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <User className="w-5 h-5 text-purple-500" />
                            {req.name}
                          </h3>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {req.email}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(
                          req.status
                        )}`}
                      >
                        {getStatusIcon(req.status)}
                        <span className="font-semibold capitalize">
                          {req.status}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-purple-500" />
                        <span className="font-semibold text-gray-800">
                          Project Description
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {req.description.length > 100
                          ? `${req.description.slice(0, 100)}... `
                          : req.description}
                        {req.description.length > 100 && (
                          <button
                            onClick={() => {
                              setSelectedDescription(req.description);
                              setShowModal(true);
                            }}
                            className="text-indigo-600 font-medium hover:underline ml-1"
                          >
                            Read More
                          </button>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="lg:w-80">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Request Details
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span
                            className={`font-semibold capitalize ${
                              req.status === "approved"
                                ? "text-green-600"
                                : req.status === "rejected"
                                ? "text-red-600"
                                : req.status === "pending"
                                ? "text-yellow-600"
                                : "text-blue-600"
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                        {req.createdAt && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Submitted:</span>
                            <span className="font-semibold text-gray-800">
                              {formatDate(req.createdAt)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
    </div>
  );
};
