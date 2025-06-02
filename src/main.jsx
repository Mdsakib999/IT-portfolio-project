import "./index.css";
import router from "./routes/Route.jsx";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import ServiceProvider from "./provider/ServiceProvider";

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<ServiceProvider>
			<RouterProvider router={router} />
			<Toaster />
		</ServiceProvider>
	</AuthProvider>
);
