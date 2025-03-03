import Navbar from "./components/Navbar"
import LocomotiveScroll from 'locomotive-scroll';
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import BlogPage from "./pages/BlogPage";
import { AboutsPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import ProjectDetails from "./pages/ProjectDetails";
import BlogDetails from "./pages/BlogDetails";
import { ResumeActions } from "./components/common/ResumeActions";
import { useEffect, useState } from "react";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import RtlLayout from "./layouts/rtl";
export default function App() {

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });

    return () => scroll.destroy();
  }, []);
  const [activeSection, setActiveSection] = useState('');
  console.log('')
  return (
    <>
      {/* <Navbar activeSection={activeSection} /> */}
      <Routes>
        {/* Portfolio */}
        {/* <Route path="/" element={<HomePage setActiveSection={setActiveSection} />} /> */}
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/about" element={<AboutsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Admin */}
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="rtl/*" element={<RtlLayout />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
      <ResumeActions />
    </>
  )
}