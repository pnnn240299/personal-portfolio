import React from "react";
import Hero from "../components/Hero";
import ScrollStack from "../components/common/ScrollStack";
import SEO from "../components/SEO";
import CollapsibleBanner from "../components/common/Banner";

const HomePage = ({ setActiveSection }) => {
  return (
    <div>
      <SEO
        title="Durgesh Bachhav - Full Stack Developer"
        description="Welcome to my portfolio website. I'm a Full Stack Developer specializing in modern web technologies."
        path="/"
      />
      <CollapsibleBanner />
      <Hero />
      <ScrollStack onSectionChange={setActiveSection} />
    </div>
  );
};

export default HomePage;
