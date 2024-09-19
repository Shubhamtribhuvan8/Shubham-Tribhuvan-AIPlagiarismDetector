import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./component/navigation";
import { Home } from "./component/home";
import Features from "./component/features";
import Footer from "./component/footer";
import HeroSection from "./component/heroSection";
import UserScreen from "./component/userScreen";
import JsonData from "./data/data.json";
import AIUserScreen from "./component/aiUserScreen";
import NotFound from "./component/pageNotFound";
import PlagiarismReport from "./component/plagiarismReports";
import Testonomials from "./component/testonomials";
import KeySlider from "./component/keySlider";

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
          <Route path="/user" element={<UserScreen />} />
          <Route path="/user-screen" element={<AIUserScreen />} />
          <Route path="/reports" element={<PlagiarismReport />} />
          <Route path="*" element={<NotFound />} />
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
      <KeySlider data={data.KeySlider} />
      <Testonomials data={data.Testonomials} />
      <Footer data={data.Footer} />
    </div>
  );
};

export default App;
