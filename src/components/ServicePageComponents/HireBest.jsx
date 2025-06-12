import { useState } from "react";
import { PrimaryButton } from "../Shared/PrimaryButton";
import toast from "react-hot-toast";
import { useAuth } from "../../provider/AuthProvider";
import axiosInstance from "../../Utils/axios";

export const HireBest = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const userId = user._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      return toast.error("User not logged in.");
    }

    const { name, email, description } = formData;
    if (!name || !email || !description) {
      return toast.error("All fields are required.");
    }

    try {
      setLoading(true);
      await axiosInstance.post("/hire-requests/create", {
        name,
        email,
        description,
        id: userId,
      });

      toast.success("Hire request submitted!");
      setFormData({ name: "", email: "", description: "" });
      setShowModal(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Section */}
      <div className="bg-slate-200 rounded-2xl py-20 px-10 my-10">
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 sm:gap-0">
          <h1 className="text-2xl">
            Hire the best developers and designers around!
          </h1>

          <PrimaryButton
            className="block md:hidden px-4 py-2 bg-gradient-to-b from-[var(--color-yellow)] to-[var(--color-orange)]"
            onClick={() => setShowModal(true)}
          >
            Hire Now
          </PrimaryButton>

          <div className="hidden relative md:flex items-center justify-center min-h-[130px] min-w-[100px] rounded-xl">
            {Array.from({ length: 8 }).map(
              (_, i) =>
                i !== 2 &&
                i !== 6 && (
                  <span
                    key={i}
                    className="absolute w-2 h-8 rounded-full bg-gradient-to-b from-[var(--color-yellow)] to-[var(--color-orange)]"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-80px)`,
                      transformOrigin: "center center",
                    }}
                  />
                )
            )}
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-4 text-white text-lg rounded-md bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-yellow)] shadow-lg hover:scale-105 transition-transform"
            >
              Hire Top Developers
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white w-full max-w-xl mx-4 md:mx-0 p-6 md:p-8 rounded-2xl shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Submit Hire Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <textarea
                name="description"
                placeholder="Describe your project or requirements..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md min-h-[120px]"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-yellow)] text-white font-medium rounded-md hover:scale-[1.02] transition"
              >
                {loading ? "Submitting..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
