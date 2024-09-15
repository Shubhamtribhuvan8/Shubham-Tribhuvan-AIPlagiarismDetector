import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./component/navigation";
import { Home } from "./component/home";
import Features from "./component/features";
import Footer from "./component/footer";
import HeroSection from "./component/heroSection";
import UserScreen from "./component/userScreen";
import JsonData from "./data/data.json";

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage data={landingPageData} />} />
          <Route path="/user-screen" element={<UserScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

const LandingPage = ({ data }) => {
  return (
    <div>
      <Home data={data.Home} />
      <HeroSection data={data.HeroSection} />
      <Features data={data.Features} />
      <Footer data={data.Footer} />
    </div>
  );
};

export default App;
