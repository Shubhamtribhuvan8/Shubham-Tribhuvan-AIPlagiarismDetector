import React, { Suspense, lazy } from "react";
import Spinner from "./ui/spinner";

const HeroSection = lazy(() => import("./pages/hero"));
const HowItWorksSection = lazy(() => import("./pages/howItWorks"));

export const Home = (props) => {
  return (
    <div id="home">
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 pt-20 md:pt-24 lg:pt-32">
          {" "}
          <Suspense fallback={<Spinner />}>
            <HeroSection />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <HowItWorksSection />
          </Suspense>
        </main>
      </div>
    </div>
  );
};
