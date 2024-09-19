import React from "react";
import Slider from "react-slick";
import { Upload, FileSearch, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
export default function KeySlider() {
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
  const features = [
    {
      icon: <Upload className="w-12 h-12 text-primary" />,
      title: "Easy Upload",
      description: "Drag and drop your documents",
    },
    {
      icon: <FileSearch className="w-12 h-12 text-primary" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms detect plagiarism",
    },
    {
      icon: <FileText className="w-12 h-12 text-primary" />,
      title: "Detailed Reports",
      description: "Get comprehensive plagiarism reports",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div>
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Cutting-Edge Features
          </h2>
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <div key={index} className="px-4">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}
