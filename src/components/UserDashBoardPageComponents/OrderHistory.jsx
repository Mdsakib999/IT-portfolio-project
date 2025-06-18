import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axiosInstance from "../../Utils/axios";
import {
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiCalendar,
  FiFileText,
  FiDollarSign,
  FiTag,
  FiLoader,
  FiShoppingBag,
  FiPackage,
  FiX,
} from "react-icons/fi";
import { formatDate } from "../../Utils/formatDate";
import Loading from "../../Utils/Loading";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../Shared/PrimaryButton";

export const OrderHistory = () => {
  const { user } = useAuth();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await axiosInstance.get(`/order/${user?._id}`);
      setAllOrders(result.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, [user?._id]);

  const getStatusConfig = (status) => {
    const statusConfig = {
      completed: {
        color: "bg-green-100 text-green-800",
        icon: FiCheckCircle,
        iconColor: "text-green-600",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: FiClock,
        iconColor: "text-yellow-600",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: FiX,
        iconColor: "text-red-600",
      },
    };

    return statusConfig[status.toLowerCase()] || statusConfig.pending;
  };

  const getPaymentStatusConfig = (paymentStatus) => {
    const statusConfig = {
      succeeded: {
        color: "bg-green-100 text-green-800",
        icon: FiCheckCircle,
        iconColor: "text-green-600",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: FiClock,
        iconColor: "text-yellow-600",
      },
      failed: {
        color: "bg-red-100 text-red-800",
        icon: FiX,
        iconColor: "text-red-600",
      },
    };

    return statusConfig[paymentStatus.toLowerCase()] || statusConfig.pending;
  };

  const StatusBadge = ({ status, type = "order" }) => {
    const config =
      type === "payment"
        ? getPaymentStatusConfig(status)
        : getStatusConfig(status);
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${config.color}`}
      >
        <Icon className={`w-3 h-3 ${config.iconColor}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Order History
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your service orders
          </p>
        </div>

        {/* Empty State */}
        {allOrders?.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <FiPackage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-4">
              Your orders will appear here once you place them.
            </p>
            <Link to="/service">
              {" "}
              <PrimaryButton className="inline-flex items-center gap-2">
                <FiShoppingBag className="w-4 h-4" />
                Browse Services
              </PrimaryButton>
            </Link>
          </div>
        ) : (
          /* Orders Table */
          <div className="bg-white rounded-lg border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Plan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    {/* Order ID */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiFileText className="w-4 h-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            #{order._id.slice(-8).toUpperCase()}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <FiCreditCard className="w-3 h-3 mr-1" />
                            Stripe
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Service Plan */}
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">
                        {order.plan?.title || order?.planName}
                      </div>
                    </td>
                    {/* Service Type */}
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">
                        {order.service?.title || order?.serviceName}
                      </div>
                    </td>
                    {/* Amount */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiDollarSign className="w-4 h-4 text-gray-400 mr-1" />
                        {order.price}
                      </div>
                    </td>
                    {/* Order Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={order.status} type="order" />
                    </td>
                    {/* Payment Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge
                        status={order.paymentStatus || "pending"}
                        type="payment"
                      />
                    </td>
                    {/* Date & Time */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiCalendar className="w-4 h-4 text-gray-400 mr-2" />
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
