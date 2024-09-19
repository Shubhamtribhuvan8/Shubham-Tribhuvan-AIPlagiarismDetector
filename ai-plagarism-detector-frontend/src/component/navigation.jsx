// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Button from "./ui/button";
// import aiDetector from "../asset/logo/ai_detector.png";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

import aiDetectorLogo from "../asset/logo/ai_detector.png";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(id);
      }, 500);
    } else {
      scrollToSection(id);
    }
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = ["Home", "Features", "Contact"];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <a
              className="flex items-center space-x-2 cursor-pointer transition duration-300 hover:opacity-80"
              onClick={() => handleScroll("home")}
            >
              <img
                src={aiDetectorLogo}
                alt="AI Detector Logo"
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
              <span
                className={`text-lg sm:text-xl font-bold ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                AI Plagiarism Detector
              </span>
            </a>
          </div>

          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`text-sm font-medium transition duration-300 ${
                      isScrolled
                        ? "text-gray-900 hover:text-blue-600"
                        : "text-white hover:text-blue-200"
                    }`}
                    onClick={() => handleScroll(item.toLowerCase())}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out bg-white`}
      >
        <ul className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                onClick={() => handleScroll(item.toLowerCase())}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
