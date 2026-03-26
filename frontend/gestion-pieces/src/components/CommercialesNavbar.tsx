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
      <header className="bg-[#f8f8f8] border-b border-[#d0d0d0] px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-8 h-8 bg-[#0078D4] rounded-md flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105">
                <div className="w-3 h-3 bg-white rounded-sm transform rotate-45" />
              </div>
              <span className="text-lg font-normal text-[#1f1f1f] tracking-tight">
                Business Central{" "}
                <span className="text-[#0078D4] font-semibold">
                  / {sectionLabel}
                </span>
              </span>
            </Link>
            <p className="text-[#5f5f5f] text-xs mt-1">
              FACTURATION & SIGNATURE
            </p>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-1.5 bg-[#0078D4] text-white rounded-md text-sm font-medium hover:bg-[#106EBE] transition-colors shadow-sm"
            >
              Sign In
            </Link>
            <Link
              to="/espace-personnel"
              className="px-4 py-1.5 bg-[#0078D4] text-white border border-[#0078D4] rounded-md text-sm font-medium hover:bg-[#106EBE] transition-colors shadow-sm"
            >
              Espace Personnel
            </Link>
            <Link
              to="/register"
              className="px-4 py-1.5 bg-[#0078D4] text-white border border-[#0078D4] rounded-md text-sm font-medium hover:bg-[#106EBE] transition-colors shadow-sm"
            >
              Register
            </Link>
            {/* Search Icon */}
            <button className="text-[#5f5f5f] hover:text-[#1f1f1f] transition-colors w-8 h-8 rounded-md hover:bg-[#e9e9e9] flex items-center justify-center">
              <Search size={18} />
            </button>

            {/* Notification Bell with Badge */}
            <button className="relative text-[#5f5f5f] hover:text-[#1f1f1f] transition-colors w-8 h-8 rounded-md hover:bg-[#e9e9e9] flex items-center justify-center">
              <Bell size={18} />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#d13438] text-white text-[10px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* User Avatar */}
            <button className="bg-[#0078D4] hover:bg-[#106EBE] transition-colors text-white text-sm font-semibold rounded-md w-8 h-8 flex items-center justify-center">
              AA
            </button>

            {/* Dropdown Arrow */}
            <button className="text-[#5f5f5f] hover:text-[#1f1f1f] transition-colors">
              <svg
                className="w-3.5 h-3.5"
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
        className="bg-white border-b border-[#e1e1e1]"
      >
        <div className="max-w-[1600px] mx-auto px-12 h-12 flex items-center justify-end">
          <div className="flex items-center gap-6">
            <Link
              to="/articles"
              className="text-sm text-[#4a4a4a] hover:text-[#0078D4] transition-colors"
            >
              Articles
            </Link>
            <Link
              to="/clients"
              className="text-sm text-[#4a4a4a] hover:text-[#0078D4] transition-colors"
            >
              Clients
            </Link>

            <Link
              to="/commerciales"
              className="text-sm text-[#4a4a4a] hover:text-[#0078D4] transition-colors"
            >
              créer commercial
            </Link>
            <Link
              to="/"
              className="text-sm text-[#4a4a4a] hover:text-[#0078D4] transition-colors"
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
