'use client'

import React from "react";
import Navbar from "../../src/admin/components/navbar";
import Sidebar from "../../src/admin/components/sidebar";
import Footer from "../../src/admin/components/footer/Footer";
import { AuthProvider } from "../../src/admin/contexts/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  document.documentElement.dir = "ltr";

  return (
    <AuthProvider>
      <div className="flex h-full w-full">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
          <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                brandText="Admin Dashboard"
              />
              <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                {children}
              </div>
              <div className="p-3">
                <Footer />
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}