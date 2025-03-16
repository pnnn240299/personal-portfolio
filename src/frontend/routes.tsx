import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetails from "./pages/ProjectDetails";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetails";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const getRoutes = (setActiveSection) => [
  { path: "/", element: <HomePage setActiveSection={setActiveSection} /> },
  { path: "/projects", element: <ProjectPage /> },
  { path: "/projects/:slug", element: <ProjectDetails /> },
  { path: "/blogs", element: <BlogPage /> },
  { path: "/blogs/:slug", element: <BlogDetails /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
];

export default getRoutes;
