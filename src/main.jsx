import "./index.css";
import router from "./routes/Route.jsx";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<RouterProvider router={router} />
		<Toaster />
	</AuthProvider>
);
