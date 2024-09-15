import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./ui/button";
import aiDetector from "../asset/logo/ai_detector.png";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (id) => {
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-10 h-18">
      <div className="container mx-auto flex items-center justify-between h-full px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="lg:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
          <a
            className="flex items-center ml-4 cursor-pointer transition duration-300 hover:text-blue-600"
            onClick={() => handleScroll("home")}
          >
            <img src={aiDetector} alt="Logo" className="h-12 w-12 mr-2" />
            <span className="text-xl font-bold text-gray-800">
              AI Plagiarism Detector
            </span>
          </a>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6 absolute lg:relative top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6 p-4 lg:p-0 space-y-4 lg:space-y-0">
            {["Home", "Features", "Contact"].map((item) => (
              <li key={item} className="flex items-center">
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-800 hover:text-blue-600 transition duration-300 relative group flex items-center"
                  onClick={() => handleScroll(item.toLowerCase())}
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
