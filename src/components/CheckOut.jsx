import { useState } from "react";
import { useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";
import { MdLock, MdCreditCard, MdArrowBack } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const CheckOut = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit } = useForm();
  const { state } = useLocation();

  const plan = state?.plan;
  const serviceName = state?.serviceName;
  console.log("plan, serviceName=>", plan, serviceName, state?.serviceId);

  const onSubmit = async (data) => {
    setIsProcessing(true);
    setTimeout(() => {
      console.log("Payment submitted:", { plan, paymentData: data });
      alert(`Payment processed successfully for ${plan.name} plan!`);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
            Complete Your Order
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            {/* Plan Details */}
            <div className="border-2 border-purple-200 rounded-xl p-6 mb-6 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-black mb-1">
                    Service: <span className="text-lg font-bold bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">{serviceName}</span>
                  </h3>
                  <h3 className="text-lg font-bold text-black mb-1">
                    Plan: <span className="text-lg font-bold bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">{plan.title}</span>
                  </h3>
                </div>
                <div></div>
                <p className="text-2xl font-bold text-gray-800">
                  ${plan.price}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-4">
                What's included:
              </h4>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <TiTick color="green" size={20} className="mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Breakdown */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${plan.price}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-800 border-t pt-2">
                <span>Total</span>
                <span>${plan.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <MdLock className="text-green-500" size={20} />
              <h2 className="text-xl font-bold text-gray-800">
                Secure Payment
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      {...register("firstName")}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      {...register("lastName")}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <MdCreditCard size={20} />
                  Payment Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    {...register("cardNumber")}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      {...register("expiryDate")}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC/CVV
                    </label>
                    <input
                      {...register("cvc")}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-semibold text-white cursor-pointer ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#DE4396] to-[#0D1C9F] hover:shadow-lg hover:scale-105"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : (
                  "Proceed to Payment"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
