'use client'

import Footer from "@/admin/components/footer/FooterAuthDefault";
import authImg from "@/admin/assets/img/auth/auth.png";
import Link from "next/link";
import FixedPlugin from "@/admin/components/fixedPlugin/FixedPlugin";
import { AuthProvider } from "@/admin/contexts/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  document.documentElement.dir = "ltr";
  return (
    <AuthProvider>
      <div>
        <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
          <FixedPlugin />
          <main className={`mx-auto min-h-screen`}>
            <div className="relative flex">
              <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
                <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                  <Link href="/admin" className="mt-0 w-max lg:pt-10">
                    <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                      <svg
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.70994 2.11997L5.28994 0.709961C4.89994 0.319961 4.26994 0.319961 3.87994 0.709961L0.289941 4.29996C-0.100059 4.68996 -0.100059 5.31996 0.289941 5.70996L3.87994 9.29996C4.26994 9.68996 4.89994 9.68996 5.28994 9.29996L6.70994 7.87996C7.09994 7.48996 7.09994 6.85996 6.70994 6.46996L3.53994 3.29996L6.70994 0.119968C7.09994 -0.270032 7.08994 -0.900032 6.70994 0.489968L6.70994 2.11997Z"
                          fill="#111827"
                        />
                      </svg>
                      <p className="ml-3 text-sm font-medium text-navy-700 hover:text-navy-900 dark:text-white dark:hover:text-white">
                        Back to Dashboard
                      </p>
                    </div>
                  </Link>
                  {children}
                  <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                    <div
                      className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                      style={{ backgroundImage: `url(${authImg.src})` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}