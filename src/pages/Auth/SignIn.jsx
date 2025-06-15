import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import axiosInstance from "../../Utils/axios";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { signIn, googleSignIn, user, forgotPassword } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleResetPassword = async () => {
    const email = getValues("email");
    if (!email) {
      return toast.error(
        <h1 className="font-serif">Please enter your email first</h1>
      );
    }
    setIsLoading(true);
    try {
      await forgotPassword(email);
      toast.success(
        <h1 className="font-serif">Password reset email sent successfully!</h1>
      );
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(<h1 className="font-serif">Failed to send reset email</h1>);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await signIn(data.email, data.password);
      toast.success(<h1 className="font-serif">Signed in successfully!</h1>);
      navigate(from, { replace: true });
    } catch (error) {
      // console.log(error);
      let errorMessage = "Failed to sign in";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials";
      }
      toast.error(<h1 className="font-serif">{errorMessage}</h1>);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserToDB = async (userData) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", userData);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error saving user to DB: ", error);
      toast.error(<h1 className="font-serif">{error.data.message}</h1>);
      throw error;
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await googleSignIn();

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        provider: result.user.providerData[0]?.providerId,
        uid: result.user.uid,
      };

      await saveUserToDB(userData);

      // console.log("Google sign-in result: ", result.user);
      toast.success(
        <h1 className="font-serif">Signed in with Google successfully</h1>
      );
    } catch (error) {
      console.error("Error signing in with Google: ", error?.message);
      let errorMessage = "Failed to sign in with Google";
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Google sign-in was cancelled";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(<h1 className="font-serif">{errorMessage}</h1>);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-serif pt-28">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent tracking-tight">
            Exabyting
          </h1>
          <p className="mt-2 text-sm text-gray-600">Welcome Back,</p>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="flex items-center">
              <span className="absolute left-3 text-gray-500">
                <FiMail className="h-5 w-5" />
              </span>
              <input
                id="email"
                type="email"
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="flex items-center">
              <span className="absolute left-3 text-gray-500">
                <FiLock className="h-5 w-5" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full pl-10 pr-10 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={handleResetPassword}
              type="button"
              className="cursor-pointer text-sm font-medium bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent hover:text-blue-500 focus:outline-none"
            >
              Forgot your password?
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium bg-black hover:bg-white hover:bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent hover:border hover:border-purple-800 transition duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FcGoogle className="h-5 w-5" />
              <span className="ml-2">
                {isLoading ? "Signing in..." : "Sign in with Google"}
              </span>
            </button>
          </div>
        </div>

        <div className="text-center mt-4 text-sm font-medium">
          <span>Don't have an account? </span>
          <Link
            to="/signup"
            className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent hover:text-blue-500 focus:outline-none"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
