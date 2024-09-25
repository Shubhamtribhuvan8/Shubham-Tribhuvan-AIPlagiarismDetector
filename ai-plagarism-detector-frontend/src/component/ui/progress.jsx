import React from "react";
export default function Progress({ value, max = 100, className = "" }) {
  const percentage = (Math.min(Math.max(value, 0), max) / max) * 100;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    >
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <span className="sr-only">{`${percentage.toFixed(0)}%`}</span>
      </div>
    </div>
  );
}
