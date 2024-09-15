import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/user-screen");
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Real-time AI-Powered Plagiarism Detection
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Ensure academic integrity with lightning-fast, highly accurate
            plagiarism checks.
          </p>
          <div className="flex justify-center items-center">
            <Button size="lg" className="mt-4" onClick={handleButtonClick}>
              <span>Upload Your Document</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
