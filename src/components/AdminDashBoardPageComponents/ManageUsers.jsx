import { useEffect, useState, useMemo } from "react";
import {
  Users,
  Search,
  Shield,
  Trash2,
  Crown,
  User,
  Mail,
  UserCheck,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../../Utils/axios";
import { useAuth } from "../../provider/AuthProvider";
import { Pagination } from "../Shared/Pagination";
import Loading from "../../Utils/Loading";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const itemsPerPage = 6;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("auth/allusers");
      // Sort admins to the top
      const sortedUsers = res.data.sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") return -1;
        if (a.role !== "admin" && b.role === "admin") return 1;
        return 0;
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((u) =>
        `${u.name} ${u.email}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [users, searchTerm]);

  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const makeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Promote to Admin?",
      text: "This user will be promoted to admin with elevated privileges!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, promote",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      setActionLoading(id);
      try {
        await axiosInstance.put(`auth/make-admin/${id}`);
        Swal.fire({
          title: "Success!",
          text: "User promoted to admin successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to promote user", "error");
      } finally {
        setActionLoading(null);
      }
    }
  };

  const removeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove Admin Role?",
      text: "This admin will be demoted to a regular user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, demote",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      setActionLoading(id);
      try {
        await axiosInstance.put(`auth/remove-admin/${id}`);
        Swal.fire({
          title: "Success!",
          text: "Admin role removed successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to remove admin role", "error");
      } finally {
        setActionLoading(null);
      }
    }
  };

  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone! The user will be permanently deleted.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      input: "text",
      inputPlaceholder: "Type 'DELETE' to confirm",
      inputValidator: (value) => {
        if (value !== "DELETE") {
          return "Please type 'DELETE' to confirm";
        }
      },
    });

    if (confirm.isConfirmed) {
      setActionLoading(id);
      try {
        await axiosInstance.delete(`auth/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to delete user", "error");
      } finally {
        setActionLoading(null);
      }
    }
  };

  const getRoleConfig = (role) => {
    switch (role) {
      case "admin":
        return {
          icon: <Crown className="w-4 h-4" />,
          bg: "bg-gradient-to-r from-purple-100 to-pink-100",
          text: "text-purple-700",
          badge: "bg-purple-100 text-purple-800 border-purple-300",
        };
      case "user":
        return {
          icon: <User className="w-4 h-4" />,
          bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
          text: "text-blue-700",
          badge: "bg-blue-100 text-blue-800 border-blue-300",
        };
      default:
        return {
          icon: <User className="w-4 h-4" />,
          bg: "bg-gray-50",
          text: "text-gray-700",
          badge: "bg-gray-100 text-gray-800 border-gray-300",
        };
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
              <p className="text-gray-600 mt-1">
                Control user access and permissions
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              {
                label: "Total Users",
                value: users.length,
                color: "text-blue-600",
                icon: <Users className="w-5 h-5" />,
              },
              {
                label: "Administrators",
                value: users.filter((u) => u.role === "admin").length,
                color: "text-purple-600",
                icon: <Crown className="w-5 h-5" />,
              },
              {
                label: "Regular Users",
                value: users.filter((u) => u.role === "user").length,
                color: "text-green-600",
                icon: <UserCheck className="w-5 h-5" />,
              },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={stat.color}>{stat.icon}</span>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
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
        <div className="p-6 mb-8">
          {/* Search */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Users
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Users Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedUsers.map((u, index) => {
            const isCurrentUser = u.email === user.email;
            const roleConfig = getRoleConfig(u.role);

            return (
              <div
                key={u._id}
                className={`rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                  isCurrentUser
                    ? "border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 ring-2 ring-indigo-200"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {/* Card Header */}
                <div
                  className={`p-6 ${roleConfig.bg} border-b border-gray-100`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/70 rounded-lg shadow-sm">
                        {roleConfig.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {u.name}
                          {isCurrentUser && (
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                              You
                            </span>
                          )}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full border ${roleConfig.badge} mt-1`}
                        >
                          {roleConfig.icon}
                          {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900 break-all">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {u.role === "admin" ? (
                      <button
                        onClick={() => removeAdmin(u._id)}
                        disabled={isCurrentUser || actionLoading === u._id}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-50 border border-amber-300 text-amber-700 font-medium rounded-xl hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === u._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
                        ) : (
                          <Shield className="w-4 h-4" />
                        )}
                        Demote
                      </button>
                    ) : (
                      <button
                        onClick={() => makeAdmin(u._id)}
                        disabled={isCurrentUser || actionLoading === u._id}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 border border-green-300 text-green-700 font-medium rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === u._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                        ) : (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                        Promote
                      </button>
                    )}

                    <button
                      onClick={() => deleteUser(u._id)}
                      disabled={isCurrentUser || actionLoading === u._id}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 border border-red-300 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading === u._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {isCurrentUser && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-blue-600" />
                        <p className="text-xs text-blue-700 font-medium">
                          You cannot modify your own account
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredAndSortedUsers.length / itemsPerPage)}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </div>
  );
};
