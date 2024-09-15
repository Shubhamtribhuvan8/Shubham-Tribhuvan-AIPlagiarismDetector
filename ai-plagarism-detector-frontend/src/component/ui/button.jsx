import React from "react";
import { ArrowRight } from "react-icons/fi"; // Make sure to install react-icons package

const Button = ({ size = "md", className = "", children, onClick }) => {
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-2 px-5 text-base",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-black hover:bg-gray-800 text-white font-bold rounded ${sizeClasses[size]} ${className} flex items-center`}
    >
      {children}
    </button>
  );
};
export default Button;
