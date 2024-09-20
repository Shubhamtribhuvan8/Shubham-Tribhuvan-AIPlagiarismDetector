import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useDragControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import MotionBackground from "./ui/motionBackground";

const aiTools = [
  {
    name: "Plagiarism Detector",
    description:
      "AI-powered tool to detect and prevent plagiarism in academic and professional documents",
    icon: "🔍",
  },
  {
    name: "Document Analyzer",
    description:
      "Advanced AI system for analyzing document structure and content",
    icon: "📄",
  },
  {
    name: "Citation Generator",
    description:
      "AI assistant for generating accurate citations and bibliographies",
    icon: "📚",
  },
  {
    name: "Grammar Checker",
    description:
      "AI-powered tool for identifying and correcting grammatical errors",
    icon: "✏️",
  },
  {
    name: "Paraphrasing Tool",
    description:
      "AI system for rephrasing text while maintaining original meaning",
    icon: "🔄",
  },
];

const AIToolCard: React.FC<{ tool: (typeof aiTools)[0] }> = ({ tool }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-[300px]">
      <div className="text-4xl mb-4">{tool.icon}</div>
      <h2 className="text-2xl mb-2 font-sans font-bold">{tool.name}</h2>
      <p className="text-gray-600 font-sans">{tool.description}</p>
    </div>
  );
};

const IPhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative w-[375px] h-[812px] bg-black rounded-[60px] overflow-hidden shadow-xl border-[14px] border-black">
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-[30px] bg-black rounded-b-3xl z-20"></div>
    <div className="absolute top-[15px] left-1/2 transform -translate-x-1/2 w-[15%] h-[15px] bg-[#222] rounded-full z-30"></div>
    <div className="absolute inset-0 bg-white rounded-[45px] overflow-hidden">
      {children}
    </div>
  </div>
);

export default function AIToolsPhoneView() {
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const controls = useAnimation();
  const dragControls = useDragControls({
    constraints: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  });
  const y = useMotionValue(0);
  const containerRef = useRef(null);
  const contentHeight = aiTools.length * 180;
  const containerHeight = 812 - 180; // iPhone height minus some padding

  const boundedY = useTransform(y, (latest) => {
    return Math.max(Math.min(latest, 0), -contentHeight + containerHeight);
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const autoScroll = async () => {
      if (autoScrollEnabled) {
        const currentY = y.get();
        const nextY = currentY - 180;
        if (nextY <= -contentHeight + containerHeight) {
          await controls.start({ y: 0, transition: { duration: 0.5 } });
        } else {
          await controls.start({ y: nextY, transition: { duration: 0.5 } });
        }
      }
    };

    interval = setInterval(autoScroll, 3000);

    return () => clearInterval(interval);
  }, [controls, y, autoScrollEnabled, contentHeight, containerHeight]);

  const handleDragStart = () => {
    setAutoScrollEnabled(false);
  };

  const handleDragEnd = () => {
    setTimeout(() => setAutoScrollEnabled(true), 5000); // Re-enable auto-scroll after 5 seconds of inactivity
  };

  return (
    <MotionBackground>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <IPhoneFrame>
          <div className="bg-gray-100 h-full pt-12 px-4 overflow-hidden">
            <h1 className="text-2xl font-bold text-center mb-4">
              AI Plagiarism Detector
            </h1>
            <motion.div
              ref={containerRef}
              style={{ y: boundedY }}
              drag="y"
              dragControls={dragControls}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="space-y-6"
            >
              {aiTools.map((tool, index) => (
                <AIToolCard key={tool.name} tool={tool} />
              ))}
            </motion.div>
          </div>
        </IPhoneFrame>
      </div>
    </MotionBackground>
  );
}
