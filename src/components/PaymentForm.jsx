import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useForm } from "react-hook-form";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axiosInstance from "../Utils/axios";
import { MdCreditCard } from "react-icons/md";
import toast from "react-hot-toast";

const PaymentForm = ({
  customPlanId,
  plan,
  serviceId,
  serviceName,
  amount,
  description,
  setIsProcessing,
  isProcessing,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // When user data loads, update the form values
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const stripe = useStripe();
  const elements = useElements();

  const [cardComplete, setCardComplete] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  const [cardTouched, setCardTouched] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  const onSubmit = async (data) => {
    setIsProcessing(true);

    try {
      const res = await axiosInstance.post("/payment/create-payment-intent", {
        customPlanId,
        serviceId,
        planId: plan?._id || null,
        serviceName,
        name: data.name,
        email: data.email,
        amount: plan?.price || amount,
        description: description,
      });

      const { clientSecret } = res.data;

      const cardNumberElement = elements.getElement(CardNumberElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: data.name,
              email: data.email,
            },
          },
        }
      );

      if (error) {
        console.log("error=>", error);
        toast.error(
          <h1 className="font-serif text-center">{error?.message}</h1>
        );
        setIsProcessing(false);
        navigate("/cancel");
      } else if (paymentIntent.status === "succeeded") {
        setIsProcessing(false);
        navigate(`/success?payment_intent=${paymentIntent?.id}`);
      }
    } catch (error) {
      console.log("error=>", error);
      setIsProcessing(false);
    }
  };

  // Helper to check if all card fields are complete
  const allCardComplete =
    cardComplete.number && cardComplete.expiry && cardComplete.cvc;

  // Handle blur events for Stripe Elements
  const handleCardBlur = (field) => {
    setCardTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Personal Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your name"
            onBlur={() => trigger("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email address"
            onBlur={() => trigger("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
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
          <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
            <CardNumberElement
              options={{ showIcon: true }}
              onChange={(e) =>
                setCardComplete((prev) => ({ ...prev, number: e.complete }))
              }
              onBlur={() => handleCardBlur("number")}
            />
            {cardTouched.number && !cardComplete.number && (
              <p className="text-red-500 text-sm mt-1">
                Card number is required
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
              <CardExpiryElement
                onChange={(e) =>
                  setCardComplete((prev) => ({ ...prev, expiry: e.complete }))
                }
                onBlur={() => handleCardBlur("expiry")}
              />
              {cardTouched.expiry && !cardComplete.expiry && (
                <p className="text-red-500 text-sm mt-1">
                  Expiry date is required
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVC/CVV
            </label>
            <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
              <CardCvcElement
                onChange={(e) =>
                  setCardComplete((prev) => ({ ...prev, cvc: e.complete }))
                }
                onBlur={() => handleCardBlur("cvc")}
              />
              {cardTouched.cvc && !cardComplete.cvc && (
                <p className="text-red-500 text-sm mt-1">CVC is required</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing || !isValid || !allCardComplete}
        className={`w-full py-4 rounded-xl font-semibold text-white cursor-pointer ${
          isProcessing || !isValid || !allCardComplete
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
  );
};

export default PaymentForm;
