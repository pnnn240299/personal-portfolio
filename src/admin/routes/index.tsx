// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
// Admin Imports
import MainDashboard from "@/admin/pages/default";
import NFTMarketplace from "@/admin/pages/marketplace";
import Profile from "@/admin/pages/profile";
import DataTables from "@/admin/pages/tables";
import Project from "@/admin/pages/project";
import BlogList from "@/admin/pages/blog";
import ContactList from "@/admin/pages/contact";
import SignIn from "@/admin/pages/auth/SignIn";
import Settings from "../pages/Settings";
import About from "../pages/about";
import ProfilePage from "../pages/profiles";
import ExternalLinksManager from "../pages/external_links";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    icon: <MdHome className="h-6 w-6" />,
    path: "dashboard",
    component: <MainDashboard />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profiles",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ProfilePage />,
  },
  {
    name: "Project",
    layout: "/admin",
    path: "project",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Project />,
  },
  {
    name: "external_links",
    layout: "/admin",
    path: "external_link",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ExternalLinksManager />,
  },
  {
    name: "Blog",
    layout: "/admin",
    path: "blog",
    icon: <MdPerson className="h-6 w-6" />,
    component: <BlogList />,
  },
  {
    name: "Contact",
    layout: "/admin",
    path: "contact",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ContactList />,
  },
  {
    name: "About",
    layout: "/admin",
    path: "about",
    icon: <MdPerson className="h-6 w-6" />,
    component: <About />,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "settings",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Settings />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
