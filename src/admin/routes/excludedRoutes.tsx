import BlogForm from "../pages/blog/BlogForm";
import ContactForm from "../pages/contact/ContactForm";

const excludedRoutes = [
  { path: "blog/create", component: <BlogForm /> },
  { path: "blog/edit/:id", component: <BlogForm /> },
  { path: "contacts/create", component: <ContactForm /> },
  { path: "contacts/edit/:id", component: <ContactForm /> },
];

export default excludedRoutes;
