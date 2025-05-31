import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";

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
		],
	},
]);

export default router;
