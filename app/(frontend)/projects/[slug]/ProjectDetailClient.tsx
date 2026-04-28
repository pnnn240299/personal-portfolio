'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import FuzzyOverlay from '@/frontend/components/FuzzyOverlay';
import Image from 'next/image';
import type { Project } from '@/services';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statsRef = useRef(null);
  const infoRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);

  const statsInView = useInView(statsRef, { once: true });
  const infoInView = useInView(infoRef, { once: true });
  const descriptionInView = useInView(descriptionRef, { once: true });
  const imageInView = useInView(imageRef, { once: true });

  return (
    <div className="min-h-screen bg-black text-white">
      <FuzzyOverlay />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={project.image || ''}
            alt={project.title || project.name}
            fill
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            {project.title || project.name}
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8"
          >
            {project.description || project.longDescription}
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {project.stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section
        ref={infoRef}
        initial={{ opacity: 0, y: 50 }}
        animate={infoInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 md:px-8 lg:px-16 bg-gray-900"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Project Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-8">{project.longDescription || project.description}</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, index) => (
                    <span key={index} className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {(project.github || project.demo) && (
                <div className="pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mr-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
                    >
                      View on GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={imageInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={project.image || ''}
              alt={project.title || project.name}
              width={600}
              height={400}
              className="w-full rounded-lg"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Description Section */}
      <motion.section
        ref={descriptionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={descriptionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Detailed Description</h2>
          <p className="text-gray-300 leading-relaxed">{project.longDescription || project.description}</p>
        </div>
      </motion.section>
    </div>
  );
}
