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

export const HireEliteRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">
                Loading your hire requests...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-purple-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                My Hire Requests
              </h1>
              <p className="text-gray-600 text-lg">
                Track and manage your developer hiring requests
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-semibold">
                    {requests.length} Total Requests
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request List */}
        {requests.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-purple-100">
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
                    <div className="flex items-start justify-between mb-4">
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
                      <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">
                        {req.description}
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
    </div>
  );
};
