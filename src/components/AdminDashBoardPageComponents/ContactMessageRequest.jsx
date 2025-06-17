import { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../Utils/axios";
import {
  FiMail,
  FiUser,
  FiMessageCircle,
  FiClock,
  FiCheckCircle,
  FiArrowDown,
  FiArrowUp,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { formatDate } from "../../Utils/formatDate";
import { PrimaryButton } from "../Shared/PrimaryButton";

export const ContactMessageRequest = () => {
  const [messages, setMessages] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get(`/messages?sort=${sortOrder}`);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [sortOrder]);

  const markAsResponded = async (id) => {
    try {
      await axiosInstance.patch(`/messages/${id}/responded`);
      toast.success("Marked as responded!");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to mark as responded.");
    }
  };

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));

  // Filter and paginate messages
  const filtered = useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch =
        msg.name.toLowerCase().includes(search.toLowerCase()) ||
        msg.email.toLowerCase().includes(search.toLowerCase()) ||
        msg.subject.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        !statusFilter ||
        (statusFilter === "responded" && msg.responded) ||
        (statusFilter === "pending" && !msg.responded);
      return matchesSearch && matchesStatus;
    });
  }, [messages, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Stats calculation
  const stats = useMemo(() => {
    const responded = messages.filter((m) => m.responded).length;
    const pending = messages.filter((m) => !m.responded).length;
    return { responded, pending, total: messages.length };
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-600">
            Manage and respond to customer inquiries
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Messages
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FiMessageCircle className="w-6 h-6 text-indigo-600" />
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
                <FiClock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Responded</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {stats.responded}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or subject..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none bg-white min-w-[160px]"
                >
                  <option value="">All Messages</option>
                  <option value="pending">Pending</option>
                  <option value="responded">Responded</option>
                </select>
              </div>
            </div>

            <PrimaryButton
              onClick={toggleSortOrder}
              className="flex items-center gap-2 transition-colors"
            >
              {sortOrder === "desc" ? (
                <FiArrowDown className="w-4 h-4" />
              ) : (
                <FiArrowUp className="w-4 h-4" />
              )}
              Sort {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </PrimaryButton>
          </div>
        </div>

        {/* Messages List */}
        {paginated.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No messages found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {paginated.map((msg) => (
              <div
                key={msg._id}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden ${
                  msg.responded ? "opacity-75" : ""
                }`}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                  <div className="flex flex-col md:flex-row gap-3 items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <FiUser className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{msg.name}</h3>
                        <div className="flex items-center gap-2 text-white/80">
                          <FiMail className="w-4 h-4" />
                          <span className="text-sm">{msg.email}</span>
                        </div>
                      </div>
                    </div>

                    {msg.responded && (
                      <div className="flex items-center gap-1 bg-emerald-500 px-3 py-1 rounded-full text-sm font-medium">
                        <FiCheckCircle className="w-4 h-4" />
                        Responded
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMessageCircle className="w-4 h-4 text-indigo-500" />
                    <span className="font-medium text-gray-900">
                      Subject: {msg.subject}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-start gap-2 text-gray-700">
                      <p className="text-gray-700 leading-relaxed">
                        {msg.message.length > 100
                          ? `${msg.message.slice(0, 100)}... `
                          : msg.message}
                        {msg.message.length > 100 && (
                          <button
                            onClick={() => {
                              setSelectedDescription(msg.message);
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
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiClock className="w-4 h-4" />
                    {formatDate(msg.createdAt)}
                  </div>

                  {!msg.responded && (
                    <button
                      onClick={() => markAsResponded(msg._id)}
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FiCheckCircle className="w-4 h-4" />
                      Mark as Responded
                    </button>
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
                      ? "bg-indigo-600 text-white shadow-sm"
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
