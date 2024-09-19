import React from "react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const HowItWorksSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className=" text-white text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            How It Works
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                step: "Upload",
                description:
                  "Upload your document or paste your text into our secure platform.",
              },
              {
                step: "Analyze",
                description:
                  "Our AI quickly scans and compares your content against millions of sources.",
              },
              {
                step: "Review",
                description:
                  "Receive a detailed report highlighting any potential plagiarism issues.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2 bg-white shadow-lg border-gray-800 p-4 rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold">{item.step}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksSection;
