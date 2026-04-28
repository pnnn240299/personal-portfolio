'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MaskImage from '@/frontend/components/MaskImage';
import type { Blog } from '@/services';

interface BlogDetailClientProps {
  blog: Blog;
  nextBlog: Blog | null;
  prevBlog: Blog | null;
}

export default function BlogDetailClient({ blog, nextBlog, prevBlog }: BlogDetailClientProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.2], [1, 0.95]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <MaskImage
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {blog.title}
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8"
          >
            {blog.summary}
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-center space-x-4 text-sm"
          >
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.categories?.[0] ?? 'General'}</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {prevBlog && (
            <Link href={`/blogs/${prevBlog.slug}`} className="flex items-center space-x-4 group">
              <ChevronLeft className="h-6 w-6 text-gray-400 group-hover:text-black transition-colors" />
              <div>
                <p className="text-sm text-gray-500">Previous</p>
                <p className="font-semibold group-hover:text-blue-600 transition-colors">{prevBlog.title}</p>
              </div>
            </Link>
          )}
          <div className="flex-1"></div>
          {nextBlog && (
            <Link href={`/blogs/${nextBlog.slug}`} className="flex items-center space-x-4 group">
              <div className="text-right">
                <p className="text-sm text-gray-500">Next</p>
                <p className="font-semibold group-hover:text-blue-600 transition-colors">{nextBlog.title}</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-black transition-colors" />
            </Link>
          )}
        </div>
      </section>
    </motion.div>
  );
}
