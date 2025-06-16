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
import { UpdateProfile } from "../components/UserDashBoardPageComponents/UpdateProfile";
import { OrderHistory } from "../components/UserDashBoardPageComponents/OrderHistory";
import { ManageService } from "../components/AdminDashBoardPageComponents/ManageService";
import { CustomPlan } from "../components/AdminDashBoardPageComponents/ManageCustomPlan";
import { HireRequest } from "../components/AdminDashBoardPageComponents/HireRequest";
import { ContactMessageRequest } from "../components/AdminDashBoardPageComponents/ContactMessageRequest";
import { ManageUsers } from "../components/AdminDashBoardPageComponents/ManageUsers";
import { ManageOrders } from "../components/AdminDashBoardPageComponents/ManageOrders";
import { AdminRoute } from "./AdminRoute";
import SuccessPage from "../pages/SuccessPage";
import CancelPage from "../pages/CancelPage";
import { CustomPlanOrder } from "../components/UserDashBoardPageComponents/CustomPlanOrder";
import { AddService } from "../components/AdminDashBoardPageComponents/AddService";
import { HireEliteRequest } from "../components/UserDashBoardPageComponents/HireEliteRequest";

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
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      {
        path: "/cancel",
        element: <CancelPage />,
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
      {
        path: "order",
        element: <OrderHistory />,
      },
      {
        path: "custom-plan-order",
        element: <CustomPlanOrder />,
      },
      {
        path: "hire-elite-request",
        element: <HireEliteRequest />,
      },
    ],
  },

  // Admin Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <UpdateProfile />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "add-service",
        element: <AddService />,
      },
      {
        path: "manage-service",
        element: <ManageService />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "custom-plan",
        element: <CustomPlan />,
      },
      {
        path: "hire-request",
        element: <HireRequest />,
      },
      {
        path: "contact-message-request",
        element: <ContactMessageRequest />,
      },
    ],
  },
]);

export default router;
