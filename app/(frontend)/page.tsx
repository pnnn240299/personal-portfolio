import * as React from "react";
import Hero from "../../src/frontend/components/Hero";
import ScrollStack from "../../src/frontend/components/common/ScrollStack";
import SEO from "../../src/frontend/components/SEO";
import CollapsibleBanner from "../../src/frontend/components/common/Banner";

const HomePage = () => {
  return (
    <div>
      <SEO
        title="Nhan - Full Stack Developer"
        description="Welcome to my portfolio website. I'm a Full Stack Developer specializing in modern web technologies."
        path="/"
      />
      <CollapsibleBanner />
      <Hero />
      <ScrollStack />
    </div>
  );
};

export default HomePage;