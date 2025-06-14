import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaPaperPlane,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { Slide } from "react-awesome-reveal";
import axiosInstance from "../../Utils/axios";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await axiosInstance.post("contact", data);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "123 Tech Street, Digital City" },
    { icon: FaPhone, text: "+1 (555) 123-4567" },
    { icon: FaGlobe, text: "www.smitsolution.com.bd" },
  ];

  return (
    <div className="min-h-screen  pt-16 sm:pt-20 md:pt-28 px-2 sm:px-4 md:px-6 lg:px-10 mb-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <Slide direction="up">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-block p-3 bg-gradient-to-r from-[#5E35B1] to-purple-600 rounded-full mb-4 shadow-lg">
              <FaEnvelope className="text-white text-xl sm:text-2xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent mb-3 sm:mb-4">
              Let's Connect
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              Get connected to specialist IT talent with the know-how to bring
              your products to life. We're here to transform your vision into
              reality.
            </p>
          </div>
        </Slide>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Info Card */}
          <Slide className="w-full lg:w-2/5">
            <div>
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-purple-100 p-4 sm:p-6 lg:p-7 h-full">
                <div className="text-center mb-6 sm:mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaCommentDots className="text-white text-xl sm:text-2xl" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                    Get In Touch
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    We'd love to hear from you
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-0">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 sm:gap-4 rounded-xl hover:bg-purple-50 transition-all duration-300 group p-1 "
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="text-white text-sm sm:text-base" />
                        </div>
                        <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">
                          {info.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Decorative Elements */}
                <div className="mt-6 sm:mt-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5E35B1]/10 to-purple-600/10 rounded-xl blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] rounded-xl p-4 sm:p-6 text-white text-center">
                    <FaCheckCircle className="text-2xl sm:text-3xl mx-auto mb-2" />
                    <p className="text-xs sm:text-sm font-medium font-sans">
                      24/7 Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <Slide direction="right" className="w-full lg:w-3/5">
            {/* Form Card */}
            <div>
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-purple-100 p-4 sm:p-6 lg:p-8">
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-pulse">
                    <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                    <span className="text-green-700 text-sm font-medium">
                      Message sent successfully! We'll get back to you soon.
                    </span>
                  </div>
                )}

                <div className="space-y-4 sm:space-y-6">
                  {/* Name Field */}
                  <div className="relative group">
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple transition-colors duration-300">
                      <FaUser className="text-sm sm:text-base" />
                    </div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      {...register("name", { required: "Name is required" })}
                      className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                        errors.name
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-primary hover:border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs sm:text-sm mt-1 block animate-pulse">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple transition-colors duration-300">
                      <FaEnvelope className="text-sm sm:text-base" />
                    </div>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-primary hover:border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs sm:text-sm mt-1 block animate-pulse">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div className="relative group">
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple transition-colors duration-300">
                      <MdSubject className="text-sm sm:text-base" />
                    </div>
                    <input
                      type="text"
                      placeholder="Subject"
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                        errors.subject
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-primary hover:border-gray-300"
                      }`}
                    />
                    {errors.subject && (
                      <span className="text-red-500 text-xs sm:text-sm mt-1 block animate-pulse">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="relative group">
                    <div className="absolute left-3 sm:left-4 top-4 sm:top-5 text-gray-400 group-focus-within:text-purple transition-colors duration-300">
                      <FaCommentDots className="text-sm sm:text-base" />
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Your message here..."
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 resize-none ${
                        errors.message
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-primary hover:border-gray-300"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-red-500 text-xs sm:text-sm mt-1 block animate-pulse">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="cursor-pointer w-full bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] hover:to-purple-800 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 sm:gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm sm:text-base" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Contact;
