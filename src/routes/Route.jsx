import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import { Service } from "../pages/Service/Service";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <div>Page not found</div>,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/service",
				element: <Service />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/signin",
				element: <SignIn />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
		],
	},
]);

export default router;
