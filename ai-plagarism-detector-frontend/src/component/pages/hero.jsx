import React from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              AI-Powered Plagiarism Detection
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Ensure academic integrity with our cutting-edge AI technology.
              Detect plagiarism with unparalleled accuracy and speed.
            </p>
          </div>
          <div className="w-full max-w-sm mx-auto p-4">
            <div className="space-y-2">
              <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Input
                  className="flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit" size="sm" className="flex-shrink-0">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-center">
                Start your free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
