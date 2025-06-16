import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashBoardLeftNav } from "./DasboardLeftNav";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../Utils/ScrollToTop";
import { PrimaryButton } from "../../components/Shared/PrimaryButton";

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <div className="flex min-h-screen relative pt-18 max-w-7xl mx-auto">
        {/* Mobile toggle button */}
        {!sidebarOpen && (
          <PrimaryButton
            className="fixed top-20 left-4 z-50 lg:hidden py-2 px-4 text-sm font-medium mt-2 bg-gradient-to-bl from-primary to-secondary"
            onClick={() => setSidebarOpen(true)}
          >
            Open Sidebar
          </PrimaryButton>
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen
              ? "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform translate-x-0 transition-transform duration-300 ease-in-out lg:hidden"
              : "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform -translate-x-full transition-transform duration-300 ease-in-out lg:hidden"
          }`}
        >
          <DashBoardLeftNav closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {/* Desktop Sidebar - always visible */}
        <div className="hidden lg:block lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:w-72 lg:shrink-0">
          <DashBoardLeftNav />
        </div>

        {/* Main content area */}
        <div className="flex-1 w-full px-4 py-4 overflow-y-auto">
          <Outlet />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
