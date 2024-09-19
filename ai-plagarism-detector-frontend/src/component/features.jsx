import React from "react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, CheckCircle, FileSearch } from "lucide-react";
const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get results in seconds, not minutes. Our AI processes documents at incredible speeds.",
  },
  {
    icon: CheckCircle,
    title: "Highly Accurate",
    description:
      "Our advanced AI algorithms ensure the highest level of accuracy in plagiarism detection.",
  },
  {
    icon: FileSearch,
    title: "Detailed Reports",
    description:
      "Receive comprehensive reports highlighting potential plagiarism issues with source links.",
  },
];

const Features = (props) => {
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
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Key Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center space-y-2 border p-4 rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <feature.icon className="h-8 w-8 mb-2 text-primary" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
