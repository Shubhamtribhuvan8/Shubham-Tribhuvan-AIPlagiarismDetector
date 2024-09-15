import React from "react";

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`border border-gray-300 rounded-lg px-4 py-2 text-base placeholder-gray-500 ${className}`}
      {...props}
    />
  );
};
export default Input;
