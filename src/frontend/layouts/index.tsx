import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "../components/Navbar";
import getRoutes from "../routes";
import { ResumeActions } from "../components/common/ResumeActions";

export default function Frontend() {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });

    return () => scroll.destroy();
  }, []);

  const [activeSection, setActiveSection] = useState("");

  return (
    <>
      <Navbar activeSection={activeSection} />
      <Routes>
        {getRoutes(setActiveSection).map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
      <ResumeActions />
    </>
  );
}
