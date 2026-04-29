'use client'

import Footer from "@/admin/components/footer/FooterAuthDefault";
import authImg from "@/admin/assets/img/auth/auth.png";
import FixedPlugin from "@/admin/components/fixedPlugin/FixedPlugin";
import { AuthProvider } from "@/admin/contexts/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-navy-900">
        <FixedPlugin />
        <main className="mx-auto min-h-screen flex items-center justify-center px-2 py-12">
          <div className="relative flex w-full max-w-full flex-col items-center justify-center md:max-w-[75%] lg:max-w-[1013px] xl:max-w-[1383px]">
            <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-between">
              {/* Left side - Auth form */}
              <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px] lg:mr-8">
                <div className="w-full">
                  {children}
                </div>
              </div>
              
              {/* Right side - Image (hidden on mobile) */}
              <div className="hidden lg:block lg:w-[49vw] 2xl:w-[44vw] relative">
                <div
                  className="absolute inset-0 flex items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                  style={{ backgroundImage: `url(${authImg.src})` }}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
