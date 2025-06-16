import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../provider/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { PrimaryButton } from "./Shared/PrimaryButton";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/service" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign out functionality
  const handleSignOut = async () => {
    await logout();
    setUserMenuOpen(false);
    toast.success(<h1 className="font-serif">logged out successfully</h1>);
    navigate("/signin");
  };

  return (
    <div className="fixed z-50 w-full bg-white shadow px-2 sm:px-4 lg:px-8 font-serif ">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold flex items-center flex-shrink-0"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-800 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
              <span className="text-white font-bold text-base sm:text-lg">
                E
              </span>
            </div>
            Exabyting
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-6 text-sm lg:text-base font-medium flex-1 justify-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `cursor-pointer pb-1 transition-colors duration-200 ${
                    isActive
                      ? "bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent border-b-2 border-[#DE4396]"
                      : "text-gray-700 hover:text-purple"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </ul>

          {/* Auth Buttons / User Dropdown (Desktop) */}
          <div className="hidden md:flex items-center relative">
            {user ? (
              <div ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-x-2 text-sm font-medium text-gray-700 hover:text-purple cursor-pointer"
                >
                  <FaUserCircle size={28} />
                  {user?.name || user?.displayName}
                  <svg
                    className={`ml-1 h-4 w-4 transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-4 w-60">
                    <p className="text-sm font-medium text-gray-700 cursor-pointer">
                      {user?.name || user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">{user.email}</p>
                    <Link className="w-full" to="/dashboard">
                      <PrimaryButton>Dashboard</PrimaryButton>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-x-2 w-full text-left text-sm font-medium text-gray-700 hover:bg-red-500 duration-300 hover:text-white px-3 py-2 rounded-md cursor-pointer mt-3"
                    >
                      <RiLogoutCircleRLine />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/signin">
                  <button className="cursor-pointer border rounded-full px-5 py-2 text-sm text-white bg-primary hover:bg-white hover:text-purple-900 border-purple-900 tracking-wider transition-colors duration-300">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="cursor-pointer"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white shadow-lg rounded-lg p-4 mx-2 mb-4 transition-all duration-300 ease-in-out"
        >
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent border-l-4 border-[#DE4396]"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Mobile Auth Buttons / User Info */}
          <div className="mt-4">
            {user ? (
              <div>
                <p className="text-sm font-medium text-gray-700 px-3 py-2">
                  {user?.name || user?.displayName}
                </p>
                <p className="text-xs text-gray-500 px-3 mb-3">{user.email}</p>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-x-2 w-full text-left text-sm font-medium text-gray-700 hover:bg-red-500 duration-300 hover:text-white px-3 py-2 rounded-md cursor-pointer"
                >
                  <RiLogoutCircleRLine />
                  <span>Sign Out</span>
                </button>
                <Link to="/dashboard">
                  <PrimaryButton>Dashboard</PrimaryButton>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/signin" onClick={() => setMenuOpen(false)}>
                  <button className="w-full cursor-pointer border rounded-full px-5 py-2 text-sm bg-primary hover:bg-purple-900 text-white tracking-wider transition-colors duration-300">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
