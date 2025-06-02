import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import { Service } from "../pages/Service/Service";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import Pricing from "../components/ServicePageComponents/Pricing";
import CheckOut from "../components/CheckOut";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { UpdateProfile } from "../pages/UserDashBoardPageComponents/UpdateProfile";

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
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      // User Dashboard
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <UpdateProfile />,
          },
        ],
      },
    ],
  },

  // Admin Dashboard
  //   {
  //     path: "/dashboard",
  //     element: (
  //       <PrivateRoute>
  //         <AdminRoute>
  //           <Dashboard />
  //         </AdminRoute>
  //       </PrivateRoute>
  //     ),
  //     children: [
  //       {
  //         path: "",
  //         element: <UpdateProfile />,
  //       },
  //       {
  //         path: "statistics",
  //         element: <Statistics />,
  //       },
  //       {
  //         path: "manage-users",
  //         element: <ManageUsers />,
  //       },
  //       {
  //         path: "add-books",
  //         element: <AddBooks />,
  //       },
  //       {
  //         path: "manage-category",
  //         element: <AddCategory />,
  //       },
  //       {
  //         path: "manage-books",
  //         element: <ManageBooks />,
  //       },
  //       {
  //         path: "manage-orders",
  //         element: <ManageOrders />,
  //       },
  //     ],
  //   },
]);

export default router;
