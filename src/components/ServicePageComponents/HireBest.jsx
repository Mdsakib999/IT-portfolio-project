import { use, useState } from "react";
import {
  Star,
  Code,
  Palette,
  Zap,
  Users,
  Award,
  ArrowRight,
  X,
  CheckCircle,
} from "lucide-react";
import axiosInstance from "../../Utils/axios";
import Swal from "sweetalert2";
import { useAuth } from "../../provider/AuthProvider";

export const HireBest = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    number: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userId = user?._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { service, number, description } = formData;

    if (!description) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Description is required.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/hire-requests/create", {
        name: user.name,
        email: user.email,
        service,
        number,
        description,
        id: userId,
      });

      Swal.fire({
        icon: "success",
        title: "Request Submitted",
        text: "Hire request submitted successfully!",
      });

      setFormData({
        name: user.name,
        email: user.email,
        service: "",
        number: "",
        description: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Failed to submit hire request.";

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      text: "Elite Developers",
      count: "500+",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      text: "Top Designers",
      count: "300+",
    },
    { icon: <Zap className="w-6 h-6" />, text: "Fast Delivery", count: "24h" },
    { icon: <Award className="w-6 h-6" />, text: "Success Rate", count: "99%" },
  ];

  const stats = [
    { number: "10K+", label: "Projects Completed" },
    { number: "500+", label: "Happy Clients" },
    { number: "50+", label: "Countries Served" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <>
      {/* Main Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl my-10 shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-60 h-60 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-bounce delay-100">
            <Code className="w-8 h-8 text-cyan-300 opacity-60" />
          </div>
          <div className="absolute top-32 right-32 animate-bounce delay-300">
            <Palette className="w-6 h-6 text-pink-300 opacity-60" />
          </div>
          <div className="absolute bottom-32 left-1/4 animate-bounce delay-500">
            <Zap className="w-7 h-7 text-yellow-300 opacity-60" />
          </div>
          <div className="absolute bottom-20 right-20 animate-bounce delay-700">
            <Star className="w-6 h-6 text-purple-300 opacity-60" />
          </div>
        </div>

        <div className="relative z-10 px-8 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-pulse">
                Hire Elite Talent
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-3xl mx-auto leading-relaxed">
                Connect with world-class developers and designers who turn your
                vision into reality
              </p>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                From startups to Fortune 500 companies, we've delivered
                exceptional results across every industry
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-cyan-300">{feature.icon}</div>
                    <span className="font-medium">{feature.text}</span>
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                      {feature.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="relative inline-block">
                <button
                  onClick={() => setShowModal(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Users className="w-6 h-6" />
                    Hire Elite Developer
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>

                {/* Pulsing Ring Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 animate-ping opacity-20"></div>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                ⚡ Get matched with perfect talent in under 24 hours
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 my-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Top Companies Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Vetted Professionals
            </h3>
            <p className="text-gray-600">
              Only the top 3% of applicants make it through our rigorous
              screening process.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Get matched with the perfect talent and start your project within
              24 hours.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Guaranteed Results
            </h3>
            <p className="text-gray-600">
              99% success rate with unlimited revisions until you're completely
              satisfied.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-3xl font-bold mb-2">
                Let's Build Something Amazing
              </h2>
              <p className="text-purple-100">
                Tell us about your project and we'll match you with the perfect
                talent
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={user.name}
                      onChange={handleChange}
                      readOnly
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleChange}
                      readOnly
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                  {/* service */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service
                    </label>
                    <input
                      name="service"
                      type="text"
                      placeholder="e.g. Web Development"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                  {/* contact Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      name="number"
                      type="tel"
                      placeholder="e.g. 123-456-7890"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your project, timeline, budget, and specific requirements..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors min-h-[120px] resize-none"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    We'll respond within 2 hours with a curated list of perfect
                    matches
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting Request...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" />
                      Get My Dream Team
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
