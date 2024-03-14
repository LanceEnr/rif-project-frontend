import React from "react";

import Hero from "../components/Hero";
import Reinvent from "../components/Reinvent";
import HeroIcons from "../components/HeroIcons";
import GetStarted from "../components/GetStarted";
import FaqSection from "../components/FaqSection";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <HeroIcons />
      <Reinvent />
      <FaqSection />
      <GetStarted />
    </>
  );
};

export default Home;
