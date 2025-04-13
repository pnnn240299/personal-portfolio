import BlogForm from "../pages/blog/BlogForm";
import ContactForm from "../pages/contact/ContactForm";
import ProjectForm from "../pages/project/ProjectForm";

const excludedRoutes = [
  { path: "blog/create", component: <BlogForm /> },
  { path: "blog/edit/:id", component: <BlogForm /> },
  { path: "contacts/create", component: <ContactForm /> },
  { path: "contacts/edit/:id", component: <ContactForm /> },
  { path: "project/create", component: <ProjectForm /> },
  { path: "project/edit/:id", component: <ProjectForm /> },
];

export default excludedRoutes;
