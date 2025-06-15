import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { MdLock } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckOut = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { state } = useLocation();

  // TODO
  let plan = state?.plan;

  let serviceName = state?.serviceName;

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
                    Service:{" "}
                    <span className="text-lg font-bold bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
                      {serviceName}
                    </span>
                  </h3>
                  <h3 className="text-lg font-bold text-black mb-1">
                    Plan:{" "}
                    <span className="text-lg font-bold bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
                      {plan.title || plan}
                    </span>
                  </h3>
                </div>
                <div></div>
                <p className="text-2xl font-bold text-gray-800">
                  ${plan?.price || state?.amount}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-4">
                What's included:
              </h4>
              <ul className="space-y-3">
                {plan?.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <TiTick color="green" size={20} className="mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                )) || state?.description}
              </ul>
            </div>

            {/* Pricing Breakdown */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${plan.price || state?.amount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-800 border-t pt-2">
                <span>Total</span>
                <span>${plan.price || state?.amount}</span>
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
            <Elements stripe={stripePromise}>
              <PaymentForm
                plan={plan}
                customPlanId={state?.customPlanId}
                serviceId={state?.serviceId}
                serviceName={state?.serviceName}
                amount={state?.amount}
                description={state?.description}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
