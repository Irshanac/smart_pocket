"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import Image from "next/image";

interface User {
  name: string;
  profileImage: string;
}

const user: User = {
  name: "alex",
  profileImage: "/Images/login.jpeg",
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    console.log("Logged out successfully");
  };

  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Website Name */}
        <div
          className="text-white text-2xl font-bold cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          Smart Pocket
        </div>

        {/* Center Section: Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => handleNavigation("/")}
            className="text-white hover:text-primary transition"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/jobs")}
            className="text-white hover:text-primary transition"
          >
            Jobs
          </button>
        </div>

        {/* Right Section: Profile */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div ref={userMenuRef} className="relative flex items-center space-x-2">
              <Image
                src={user.profileImage || "/default-profile.png"}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border border-gray-400"
              />
              <span className="text-white">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-white hover:text-red-400 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavigation("/login")}
              className="text-sm text-white hover:text-primary transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-xl"
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700 p-4 space-y-4">
          <button
            onClick={() => handleNavigation("/")}
            className="w-full text-left text-white hover:bg-gray-600 rounded"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/jobs")}
            className="w-full text-left text-white hover:bg-gray-600 rounded"
          >
            Jobs
          </button>
          {user ? (
            <div>
              <div className="flex items-center space-x-2">
                <Image
                  src={user.profileImage || "/default-profile.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-gray-400"
                />
                <span className="text-white">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left text-white hover:bg-gray-600 rounded mt-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavigation("/login")}
              className="w-full text-left text-white hover:bg-gray-600 rounded"
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
