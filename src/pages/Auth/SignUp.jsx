import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../../Utils/axios";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { createUser, user, googleSignIn } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	useEffect(() => {
		if (user) {
			navigate(from, { replace: true });
		}
	}, [user, navigate, from]);

	const saveUserToDB = async (userData) => {
		try {
			const { data } = await axiosInstance.post("/auth/register", userData);
			localStorage.setItem("user", JSON.stringify(data));
			return data;
		} catch (error) {
			console.error("Error saving user to DB: ", error);
			const errorMsg =
				error?.response?.data?.message ||
				error?.message ||
				"Failed to save user to DB";
			toast.error(<h1 className="font-serif">{errorMsg}</h1>);
			throw error;
		}
	};

	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			const result = await createUser(data.email, data.password);

			await updateProfile(result.user, {
				displayName: data.name,
			});

			const userData = {
				name: data.name,
				email: data.email,
				provider: result.user.providerData[0]?.providerId,
				uid: result.user.uid,
				role: "user",
			};

			await saveUserToDB(userData);

			toast.success(
				<h1 className="font-serif">Account created successfully</h1>
			);
		} catch (error) {
			console.error("Error creating user: ", error?.message);
			if (error.code === "auth/email-already-in-use") {
				toast.error(
					<h1 className="font-serif">This email is already registered.</h1>
				);
			} else if (error.code === "auth/invalid-email") {
				toast.error(<h1 className="font-serif">Please enter a valid email</h1>);
			} else if (error.code === "auth/weak-password") {
				toast.error(
					<h1 className="font-serif">
						Password should be at least 6 characters
					</h1>
				);
			} else if (error.code === "auth/popup-closed-by-user") {
				toast.error(
					<h1 className="font-serif">
						Auth popup-closed-by-user
					</h1>
				);
			} else {
				toast.error("Something went wrong. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignUp = async () => {
		setIsLoading(true);
		try {
			const result = await googleSignIn();

			const userData = {
				name: result.user.displayName,
				email: result.user.email,
				provider: result.user.providerData[0]?.providerId,
				uid: result.user.uid,
				role: "user",
			};

			await saveUserToDB(userData);

			// console.log("Google sign-in result: ", result.user);
			toast.success(
				<h1 className="font-serif">Signed in with Google successfully</h1>
			);
			navigate(from, { replace: true });
		} catch (error) {
			console.error("Error signing in with Google: ", error?.message);
			toast.error(error.message || "Failed to sign in with Google");
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
					<p className="mt-2 text-sm text-gray-600">
						Create your account to get started
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
					<div className="relative">
						<label htmlFor="name" className="sr-only">
							Full Name
						</label>
						<div className="flex items-center">
							<span className="absolute left-3 text-gray-500">
								<FiUser className="h-5 w-5" />
							</span>
							<input
								id="name"
								{...register("name", { required: "Name is required" })}
								className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
								placeholder="Full Name"
							/>
						</div>
						{errors.name && (
							<p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
						)}
					</div>

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
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
								className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
								placeholder="Email address"
							/>
						</div>
						{errors.email && (
							<p className="mt-1 text-xs text-red-600">
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
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 6,
										message: "Password must be at least 6 characters",
									},
									pattern: {
										value:
											/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
										message:
											"Password must contain at least one letter, one number and one special character",
									},
								})}
								className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
								placeholder="Password (min 6 chars, include letter, number & special char)"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 text-gray-500 focus:outline-none cursor-pointer"
							>
								{showPassword ? (
									<FiEyeOff className="h-5 w-5" />
								) : (
									<FiEye className="h-5 w-5" />
								)}
							</button>
						</div>
						{errors.password && (
							<p className="mt-1 text-xs text-red-600">
								{errors.password.message}
							</p>
						)}
					</div>

					<div>
						<button
							type="submit"
							className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium bg-black hover:bg-white bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent hover:border hover:border-purple-800 transition duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
									<span>Processing...</span>
								</div>
							) : (
								"Sign Up"
							)}
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
							onClick={handleGoogleSignUp}
							className={`${isLoading?"cursor-not-allowed":"cursor-pointer"}  w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
							disabled={isLoading}
						>
							<FcGoogle className="h-5 w-5" />
							<span className="ml-2">Sign up with Google</span>
						</button>
					</div>
				</div>

				<div className="text-center mt-4 text-sm font-medium">
					<span>Already have an account? </span>
					<Link
						to="/signin"
						className="cursor-pointer bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent hover:text-blue-600 focus:outline-none"
					>
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
