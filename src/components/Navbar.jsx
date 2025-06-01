import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/service" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed z-50 w-full bg-white shadow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-b-2xl">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          Exabyting
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-base font-medium">
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

        {/* Contact Button (Desktop) */}
        <Link to="/contact">
          <button className="hidden md:block cursor-pointer w-full border rounded-full px-4 py-2 bg-primary hover:bg-purple-900 text-white tracking-wider transition-colors duration-300">
            Contact Us
          </button>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="cursor-pointer"
          >
            {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white shadow-lg rounded-lg p-6 mx-4 mb-4 transition-all duration-300 ease-in-out"
        >
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-medium py-2 px-4 rounded-md transition-colors duration-200 ${
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
          <Link to="/contact">
            <button className="cursor-pointer w-full mt-6 border rounded-full px-4 py-2 bg-primary hover:bg-purple-900 text-white tracking-wider transition-colors duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
