'use client'

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import blogData from '../lib/blogData.json'
import MaskImage from '../components/MaskImage'
import { RevealLinks } from '../components/common/RevealLinks'
import SEO from '../components/SEO'

export default function BlogDetails() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [nextBlog, setNextBlog] = useState(null)
  const [prevBlog, setPrevBlog] = useState(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0.1, 0.2], [1, 0.95])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const currentBlogIndex = blogData?.blogs?.findIndex(blog => blog.slug === slug)
    if (currentBlogIndex !== -1) {
      setBlog(blogData.blogs[currentBlogIndex])
      setNextBlog(blogData.blogs[currentBlogIndex + 1] || null)
      setPrevBlog(blogData.blogs[currentBlogIndex - 1] || null)
    }
  }, [slug])

  if (!blog) return null

  return (
    <>
     <SEO
        title={blog.metaTitle}
        description={blog.metaDescription}
        path={`/blogs/${blog.slug}`}
      />
    <div className="relative bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <motion.section
        style={{ opacity, scale }}
        className="relative grid min-h-[50vh] md:min-h-screen w-full place-content-center overflow-hidden px-4 py-12 md:py-0"
      >
        <h2 className="relative text-center max-w-4xl mx-auto z-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-neutral-800">
          {blog.title}<span className="text-orange-500">.</span>
        </h2>
        <p className="mt-4 text-center text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto">
          {blog.summary}
        </p>
      </motion.section>

      <MaskImage src={blog.image} />

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 py-8 md:py-16">
        <motion.div
          className="prose prose-lg max-w-none order-2 lg:order-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="rounded-2xl p-6 md:p-8 ">
            <p className="text-lg md:text-xl leading-relaxed text-neutral-700">{blog.content}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 lg:order-2"
        >
          <div className="rounded-2xl p-6 md:p-8 ">
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div>
                <p className="mb-2 text-orange-400 font-medium">TOPIC NAME</p>
                <p className="font-medium text-neutral-800">{blog.topic}</p>
              </div>
              <div>
                <p className="mb-2 text-orange-400 font-medium">READING TIME</p>
                <p className="font-medium text-neutral-800">{blog.readingTime}</p>
              </div>
              <div>
                <p className="mb-2 text-orange-400 font-medium">PUBLISH DATE</p>
                <p className="font-medium text-neutral-800">{blog.publishDate || blog.date}</p>
              </div>
              <div>
                <p className="mb-2 text-orange-400 font-medium">CATEGORIES</p>
                {blog.categories.map((item, index) => (
                  <p key={index} className="font-medium text-neutral-800">{item}</p>
                ))}
              </div>
            </div>

            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gradient-to-r from-orange-500 to-orange-300 px-4 py-1.5 text-sm text-white font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex  sm:flex-row justify-between items-center gap-4">
        {prevBlog && (
          <Link
            to={`/blogs/${prevBlog.slug}`}
            className="flex w-full sm:w-auto items-center justify-center sm:justify-start px-6 py-3 bg-orange-100 hover:bg-orange-200 rounded-full text-orange-600 hover:text-orange-700 transition-colors duration-300 ease-in-out"
          >
            <ChevronLeft className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="truncate">Previous</span>
          </Link>
        )}
        {nextBlog && (
          <Link
            to={`/blogs/${nextBlog.slug}`}
            className="flex w-full sm:w-auto items-center justify-center sm:justify-end px-6 py-3 bg-orange-100 hover:bg-orange-200 rounded-full text-orange-600 hover:text-orange-700 transition-colors duration-300 ease-in-out"
          >
            <span className="truncate">Next</span>
            <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0" />
          </Link>
        )}
      </div>

      <RevealLinks />
    </div>
    </>
    
  )
}