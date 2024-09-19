import React from "react";

const Image = ({ src, alt, className }) => {
  return (
    <div
      className={`relative w-full h-0 pb-[56.25%] overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default Image;
