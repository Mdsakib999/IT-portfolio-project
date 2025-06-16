import {
  FaUser,
  FaTimes,
  FaUsers,
  FaClipboardList,
  FaHistory,
  FaTools,
  FaUserTie,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { MdLibraryAdd } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

export const DashBoardLeftNav = ({ closeSidebar }) => {
  const { isAdmin } = useAuth();
  const { pathname } = useLocation();

  const adminRoutes = [
    { label: "Profile", icon: <FaUser size={20} />, path: "/dashboard" },
    {
      label: "Manage Users",
      icon: <FaUsers size={20} />,
      path: "/dashboard/manage-users",
    },
    {
      label: "Manage Service",
      icon: <MdLibraryAdd size={20} />,
      path: "/dashboard/manage-service",
    },
    {
      label: "Add Service",
      icon: <MdLibraryAdd size={20} />,
      path: "/dashboard/add-service",
    },
    {
      label: "Manage Orders",
      icon: <FaClipboardList size={20} />,
      path: "/dashboard/manage-orders",
    },
    {
      label: "Custom-Plan",
      icon: <FaTools size={20} />,
      path: "/dashboard/custom-plan",
    },
    {
      label: "Hire Request",
      icon: <FaUserTie size={20} />,
      path: "/dashboard/hire-request",
    },
    {
      label: "Contact Message Request",
      icon: <FaEnvelopeOpenText size={20} />,
      path: "/dashboard/contact-message-request",
    },
  ];

  const customerRoutes = [
    { label: "Profile", icon: <FaUser size={20} />, path: "/dashboard" },
    {
      label: "Order History",
      icon: <FaHistory size={20} />,
      path: "/dashboard/order",
    },
    {
      label: "Custom Plan Order",
      icon: <IoIosStats size={20} />,
      path: "/dashboard/custom-plan-order",
    },
    {
      label: "Hire Elite Request",
      icon: <IoIosStats size={20} />,
      path: "/dashboard/hire-elite-request",
    },
  ];

  const routesToRender = isAdmin === true ? adminRoutes : customerRoutes;

  return (
    <aside className="h-full w-full p-4 relative md:w-64 lg:w-72">
      {/* Close button for mobile */}
      <button
        onClick={closeSidebar}
        className="absolute md:top-16 right-4 sm:hidden text-white hover:text-red-300"
      >
        <FaTimes size={22} />
      </button>

      <div className="flex flex-col gap-6 mt-10 sm:mt-0">
        <h2 className="text-2xl font-bold text-center">
          {isAdmin ? "Admin" : "User"} Dashboard
        </h2>

        <nav className="flex flex-col gap-4 mt-4">
          {routesToRender.map(({ label, icon, path }) => {
            const isActive = pathname === path;

            return (
              <Link to={path} onClick={closeSidebar} key={label}>
                <button
                  className={`cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md transition w-full font-medium ${
                    isActive
                      ? "bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow"
                      : "text-black"
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
