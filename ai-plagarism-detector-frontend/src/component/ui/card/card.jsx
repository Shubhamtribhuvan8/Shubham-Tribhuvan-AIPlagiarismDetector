import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
  );
}

export function CardHeader({ children }) {
  return <div className="px-4 py-5 sm:px-6">{children}</div>;
}

export function CardTitle({ children }) {
  return (
    <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>
  );
}

export function CardDescription({ children }) {
  return <p className="mt-1 max-w-2xl text-sm text-gray-500">{children}</p>;
}

export function CardContent({ children }) {
  return <div className="px-4 py-5 sm:p-6">{children}</div>;
}
