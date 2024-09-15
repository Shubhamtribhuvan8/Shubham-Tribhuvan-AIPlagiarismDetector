import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          How It Works
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mb-2">
              1
            </div>
            <h3 className="text-xl font-bold">Upload</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Upload your document or paste your text into our secure platform.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mb-2">
              2
            </div>
            <h3 className="text-xl font-bold">Analyze</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Our AI quickly scans and compares your content against millions of
              sources.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mb-2">
              3
            </div>
            <h3 className="text-xl font-bold">Review</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Receive a detailed report highlighting any potential plagiarism
              issues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
