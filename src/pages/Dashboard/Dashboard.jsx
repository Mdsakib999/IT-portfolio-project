import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashBoardLeftNav } from "./DasboardLeftNav";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../Utils/ScrollToTop";

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <div className="flex min-h-screen relative  pt-18  max-w-7xl mx-auto">
        {/* Mobile toggle - Fixed positioning and z-index */}
        {!sidebarOpen && (
          <button
            className="fixed top-20 left-4 z-50 lg:hidden bg-gradient-to-l from-black to-gray-500 rounded-lg shadow-md py-2 px-4 text-white text-sm font-medium mt-2"
            onClick={() => setSidebarOpen(true)}
          >
            Open Sidebar
          </button>
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 lg:z-0 w-64 lg:w-96 bg-white shadow-md transform transition-transform duration-300 ease-in-out mt-10 md:mt-0 ${
            sidebarOpen ? "translate-x-0 " : "-translate-x-full"
          } lg:relative lg:translate-x-0`}
        >
          <DashBoardLeftNav closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="w-full lg:ml-0 mt-10 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
