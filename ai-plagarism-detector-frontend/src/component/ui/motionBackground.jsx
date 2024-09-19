"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BlobShape = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <path
      fill="currentColor"
      d="M44.9,-76.2C57.4,-69.7,66.5,-55.5,73.9,-41.1C81.3,-26.7,87,-12.1,86.5,2.3C86,16.7,79.3,31.1,70.3,43.8C61.3,56.5,50.1,67.4,36.9,73.4C23.6,79.4,8.3,80.5,-6.9,79.7C-22.1,79,-37.2,76.3,-48.9,68.5C-60.6,60.7,-68.9,47.8,-74.1,34.3C-79.3,20.8,-81.5,6.7,-80.3,-7.1C-79.2,-20.9,-74.8,-34.4,-66.6,-45.3C-58.4,-56.2,-46.4,-64.5,-33.8,-70.9C-21.1,-77.3,-7.9,-81.8,5.1,-81.1C18,-80.4,32.4,-82.7,44.9,-76.2Z"
      transform="translate(100 100)"
    />
  </svg>
);

const WhiteCircle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <circle cx="100" cy="100" r="80" fill="currentColor" />
  </svg>
);

export default function MotionBackground({
  children,
}: {
  children: React.ReactNode,
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-800">
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: `${mousePosition.x / 5}px ${
            mousePosition.y / 5
          }px`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="1" cy="1" r="1" fill="%23fff" fill-opacity="0.5"/%3E%3C/svg%3E")',
          backgroundSize: "20px 20px",
        }}
      />

      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 opacity-40"
        animate={{
          x: mousePosition.x / 20,
          y: mousePosition.y / 20,
          rotate: mousePosition.x / 100,
        }}
      >
        <BlobShape className="text-purple-500/30" />
      </motion.div>

      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 opacity-40"
        animate={{
          x: -mousePosition.x / 20,
          y: -mousePosition.y / 20,
          rotate: -mousePosition.x / 100,
        }}
      >
        <BlobShape className="text-blue-500/30" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-1/6 h-1/6 opacity-10"
        animate={{
          x: mousePosition.x / 30,
          y: mousePosition.y / 30,
        }}
      >
        <WhiteCircle className="text-white" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-1/5 h-1/5 opacity-5"
        animate={{
          x: -mousePosition.x / 40,
          y: -mousePosition.y / 40,
        }}
      >
        <WhiteCircle className="text-white" />
      </motion.div>

      <div className="absolute inset-0 backdrop-blur-[80px]" />

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
