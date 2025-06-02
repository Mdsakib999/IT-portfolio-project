import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashBoardLeftNav } from "./DasboardLeftNav";

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative  max-w-7xl mx-auto">
      {/* Mobile toggle */}
      {!sidebarOpen && (
        <button
          className="absolute top-5 left-4 bg-gradient-to-l from-black to-gray-500 rounded-lg shadow-md py-2 px-4 text-white"
          onClick={() => setSidebarOpen(true)}
        >
          Open Sidebar
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 lg:z-0 w-64 lg:w-96 bg-white shadow-md transform transition-transform duration-300 ease-in-out
  ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } sm:relative sm:translate-x-0`}
      >
        <DashBoardLeftNav closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="w-full p-4 mt-14 sm:mt-0">
        <Outlet />
      </div>
    </div>
  );
};
