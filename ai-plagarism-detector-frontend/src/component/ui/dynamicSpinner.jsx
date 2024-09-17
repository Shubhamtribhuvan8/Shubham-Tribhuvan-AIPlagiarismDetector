import React from "react";

const DynamicSpinner = ({ size = 12, color = "blue-500" }) => {
  const spinnerSize = `w-${size} h-${size}`;
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`border-t-4 border-${color} border-solid ${spinnerSize} rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default DynamicSpinner;
