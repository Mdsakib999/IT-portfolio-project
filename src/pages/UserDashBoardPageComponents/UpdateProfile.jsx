import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../provider/AuthProvider";

export const UpdateProfile = () => {
  const { user } = useAuth();
  // console.log(user);
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = (data) => {
    // console.log("Updated Profile:", data);
    setEditMode(false);
  };

  const handleRemoveAccount = () => {
    // console.log("Removing account...");
  };

  return (
    <div className="max-w-7xl mx-auto rounded-lg p-6 mt-6 lg:mt-0">
      <div className="relative">
        <img
          src="https://miro.medium.com/v2/resize:fit:5120/1*42ebJizcUtZBNIZPmmMZ5Q.jpeg"
          alt="Banner"
          className="rounded-t-2xl h-48 w-full object-cover"
        />

        {/* Avatar and Name Container */}
        <div className="absolute -bottom-32 md:-bottom-24  lg:-bottom-24 md:left-1/3 lg:left-4 left-1/2 transform -translate-x-1/2 lg:translate-0  flex flex-col md:flex-row items-center  space-y-2 md:gap-3">
          <img
            src={
              user?.photoURL ||
              "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg"
            }
            alt={`${user?.name || "User"}'s avatar`}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-md"
          />

          <div className="text-center sm:text-left whitespace-nowrap md:mt-7">
            <h2 className="text-xl sm:text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {user?.email}
            </p>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-8 px-6 text-center mt-8">
        {!editMode ? (
          <>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update Profile
              </button>
              <button
                onClick={handleRemoveAccount}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove Account
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto space-y-4 text-left"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  reset();
                }}
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
