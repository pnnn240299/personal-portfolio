'use client'

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { RevealLinks } from "../../../src/frontend/components/common/RevealLinks";
import shakehand from '../../../src/frontend/assets/images/shakehands.svg';
import Link from "next/link";
import { Mail } from "lucide-react";
import { ReactLenis } from 'lenis/react';
import SEO from "../../../src/frontend/components/SEO";
import Image from "next/image";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="Contact"
        description="Welcome to my portfolio website. I'm a Full Stack Developer specializing in modern web technologies."
        path="/contact"
      />
      <ReactLenis root>
        <section className={twMerge(
          "sticky top-0 grid min-h-screen w-full place-content-center overflow-hidden bg-[#f5f5f5]",
          "lenis-section"
        )}>
          <h2 className="relative z-0 text-[14vw] font-black text-[#333] md:text-[200px]">
            Contact<span className="text-[#ff6b6b]">.</span>
          </h2>
        </section>
        <section className="relative z-10 bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                Let's Work Together
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">nhan@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">LinkedIn</h4>
                    <Link href="https://linkedin.com/in/nhan" className="text-blue-600 hover:underline">
                      linkedin.com/in/nhan
                    </Link>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">GitHub</h4>
                    <Link href="https://github.com/nhan" className="text-blue-600 hover:underline">
                      github.com/nhan
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center"
              >
                <Image
                  src={shakehand}
                  alt="Handshake"
                  className="w-full max-w-md mx-auto mb-8"
                />
                <p className="text-lg text-gray-600">
                  Ready to bring your ideas to life? Let's connect and create something amazing together.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <RevealLinks />
      </ReactLenis>
    </>
  );
}