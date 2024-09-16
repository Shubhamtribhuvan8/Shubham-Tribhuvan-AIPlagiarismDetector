import React from "react";

export function ChartContainer({ children, className }) {
  return <div className={`w-full h-full ${className}`}>{children}</div>;
}

export function ChartTooltip({ children }) {
  return <div className="tooltip">{children}</div>;
}

export function ChartTooltipContent({ hideLabel, children }) {
  return (
    <div className="bg-white border border-gray-200 p-2 rounded shadow">
      {!hideLabel && <div>{children}</div>}
    </div>
  );
}
