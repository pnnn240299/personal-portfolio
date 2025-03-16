import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "@/admin/components/navbar";
import Sidebar from "@/admin/components/sidebar";
import Footer from "@/admin/components/footer/Footer";
import routes from "@/admin/routes";

export default function Admin({
  extraRoutes = [],
  ...rest
}: {
  extraRoutes?: any[]; // Route bổ sung không nằm trong menu
  [x: string]: any;
}) {
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  React.useEffect(() => {
    getActiveRoute([...routes, ...extraRoutes]);
  }, [location.pathname]);

  const getActiveRoute = (routes: any[]) => {
    for (let i = 0; i < routes.length; i++) {
      if (window.location.pathname.includes(`/admin/${routes[i].path}`)) {
        setCurrentRoute(routes[i].name || "Admin Dashboard");
      }
    }
  };

  const getRoutes = (routes: any[]) => {
    return routes.map((route, key) => (
      <Route path={`/${route.path}`} element={route.component} key={key} />
    ));
  };

  document.documentElement.dir = "ltr";

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes([...routes, ...extraRoutes])}
                <Route path="/" element={<Navigate to="/admin/default" replace />} />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
