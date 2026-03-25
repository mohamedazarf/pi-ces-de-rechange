import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const CommercialesNavbar = () => {
  const [notificationCount] = useState(1);
  const location = useLocation();
  const pathname = location.pathname;
  const sectionLabel =
    pathname === "/articles"
      ? "Articles"
      : pathname === "/clients"
        ? "Clients"
        : pathname === "/commerciales"
          ? "Commerciales"
          : pathname === "/espace-personnel"
            ? "Espace Personnel"
            :pathname==="/register"
            ? "Register"
            :pathname==="/login"
            ? "Login"
            : "Home"
            
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="bg-[#0a0a0a] border-b border-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-110">
                <div className="w-3 h-3 bg-white rounded-sm transform rotate-45" />
              </div>
              <span className="text-lg font-light text-gray-200 tracking-tight">
                Business Central{" "}
                <span className="text-cyan-300 font-semibold">
                  / {sectionLabel}
                </span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs mt-1">
              FACTURATION & SIGNATURE
            </p>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign In
            </Link>
            <Link
              to="/espace-personnel"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white border border-blue-600/30 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Espace Personnel
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white border border-blue-600/30 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Register
            </Link>
            {/* Search Icon */}
            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
              <Search size={20} />
            </button>

            {/* Notification Bell with Badge */}
            <button className="relative text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* User Avatar */}
            <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold rounded-lg w-9 h-9 flex items-center justify-center">
              AA
            </button>

            {/* Dropdown Arrow */}
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-xl border-b border-blue-100/50"
      >
        <div className="max-w-[1600px] mx-auto px-12 h-18 py-4 flex items-center justify-end">
          <div className="flex items-center gap-8">
            <Link
              to="/articles"
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              Articles
            </Link>
            <Link
              to="/clients"
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              Clients
            </Link>

            <Link
              to="/commerciales"
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              créer commercial
            </Link>
            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default CommercialesNavbar;
