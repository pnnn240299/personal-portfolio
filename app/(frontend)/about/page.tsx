'use client'

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { RevealLinks } from "../../../src/frontend/components/common/RevealLinks";
import SEO from "../../../src/frontend/components/SEO";
import ScrollElement from "../../../src/frontend/components/ui/scroll-element";
import { FlipWords } from "../../../src/frontend/components/ui/flip-words";

const AboutPage = () => {
  const words = [
    "Creative",
    "Innovative",
    "Dynamic",
    "Interactive",
    "Visionary",
    "Passionate",
    "Adaptive",
    "Tech-Savvy",
    "Problem-Solving",
    "Skilled",
    "Experienced",
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const rotation = scrollY * 0.1;
        containerRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="About Nhan"
        description="Learn more about Nhan, a passionate Full Stack Developer with expertise in modern web technologies."
        path="/about"
      />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-8">
            About <span className="text-blue-500">Me</span>
          </h1>
          <div className="text-4xl font-semibold mb-8">
            I am a{" "}
            <FlipWords
              words={words}
              className="text-blue-500"
              duration={2000}
            />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate Full Stack Developer with 3+ years of experience in
            creating innovative web solutions. I specialize in modern
            technologies like React, Next.js, Node.js, and cloud platforms.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">My Journey</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Started my coding journey during college, where I discovered my
              passion for creating digital experiences. Since then, I've been
              constantly learning and adapting to new technologies.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I believe in writing clean, efficient code and creating
              user-centric applications that solve real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div
              ref={containerRef}
              className="w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto"
            >
              <div className="text-center text-white">
                <div className="text-6xl font-bold">3+</div>
                <div className="text-xl">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <RevealLinks />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;