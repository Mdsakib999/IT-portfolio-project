import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaClipboardList,
  FaBolt,
  FaSpinner,
} from "react-icons/fa";
import axiosInstance from "../Utils/axios";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pollAttempts, setPollAttempts] = useState(0);
  const maxPollAttempts = 10;
  const pollInterval = 3000;

  const fetchOrder = async (paymentIntent) => {
    try {
      const res = await axiosInstance.get(
        `/order/get-order?payment_intent=${paymentIntent}`
      );

      if (res.status === 200 && res.data?.order) {
        return res.data.order;
      }
      return null;
    } catch (err) {
      console.error("Error fetching order.", err);
      return null;
    }
  };

  useEffect(() => {
    const paymentIntent = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );

    if (!paymentIntent) {
      navigate("/cancel");

      return;
    }

    let intervalId = null;

    const poll = async () => {
      if (pollAttempts >= maxPollAttempts) {
        console.error("Max poll attempts reached.");
        navigate("/cancel");

        return;
      }

      const fetched = await fetchOrder(paymentIntent);

      if (fetched && fetched.paymentStatus === "succeeded") {
        setOrder(fetched);
        setLoading(false);
        clearInterval(intervalId);
      } else {
        setPollAttempts((prev) => prev + 1);
      }
    };

    poll();

    intervalId = setInterval(poll, pollInterval);

    return () => clearInterval(intervalId);
  }, [navigate, pollAttempts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          < FaSpinner className="animate-spin text-4xl text-purple-700 mx-auto mb-4" />
          <p className="text-gray-600">Confirming your order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="p-4 pt-32 font-serif">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 p-8 text-center text-white">
          <div className="rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-4xl" />
          </div>
          <h1 className="text-3xl font-semibold mb-2">
            Payment Successful! 
          </h1>
          <p className="text-lg">
            Thank you <span className="font-semibold">{order.user?.name}</span>, your order has been
            confirmed.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Order Summary */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h2 className="flex items-center gap-3 text-xl font-semibold text-purple-700 mb-4">
              <FaClipboardList className="text-purple-600" />
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-semibold">
                    Service:
                </span>
                <span className="font-semibold text-gray-800">
                    {order.service?.title || order?.serviceName}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-semibold">
                    Plan:
                </span>
                <span className="font-semibold text-gray-800">
                    {order.plan?.title || order?.planName}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-t border-purple-200 pt-3">
                <span className="text-gray-600 font-semibold">
                    Amount Paid:
                </span>
                <span className="text-2xl font-semibold text-purple-700">
                    ${order.price}
                </span>
              </div>
            </div>
          </div>

          {/* Features Section */}
          {order.plan?.features && order.plan.features.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-3 text-xl font-semibold text-purple-700 mb-4">
                <FaBolt className="text-purple-600" />
                Plan Features
              </h3>

              <div className="space-y-3">
                {order.plan.features.map((feature, idx) => (
                    <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="w-5 h-5 bg-purple-700 rounded-full flex items-center justify-center">
                        < FaCheckCircle className="text-gray-50 text-xs" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                        {feature}
                    </span>
                    </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

