'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import blogData from '../lib/blogData.json'
import { RevealLinks } from '../components/common/RevealLinks'
import { ArrowUpRightIcon } from 'lucide-react'
import { throttle } from '../lib/utils'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SEO from '../components/SEO'

function useElementViewportPosition(ref) {
  const [position, setPosition] = useState([0, 0])
  useEffect(() => {
    if (!ref || !ref.current) return
    const pageHeight = document.body.scrollHeight
    const start = ref.current.offsetTop
    const end = start + ref.current.offsetHeight
    setPosition([start / pageHeight, end / pageHeight])
  }, [])
  return { position }
}

const slideAnimation = {
  variants: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function BlogPage() {
  const mainRef = useRef(null)
  const carouselRef = useRef(null)
  const { position } = useElementViewportPosition(mainRef)
  const [carouselEndPosition, setCarouselEndPosition] = useState(0)
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, position, [0, carouselEndPosition])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!carouselRef || !carouselRef.current) return
    const parent = carouselRef.current.parentElement
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const resetCarouselEndPosition = () => {
      if (carouselRef && carouselRef.current) {
        const newPosition =
          carouselRef.current.clientWidth -
          window.innerWidth +
          scrollbarWidth +
          parent.offsetLeft * 2
        setCarouselEndPosition(-newPosition)
      }
    }
    resetCarouselEndPosition()
    const handleResize = throttle(resetCarouselEndPosition, 10)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    
    <>
    <SEO
        title="Blogs"
        description="Welcome to my portfolio website. I'm a Full Stack Developer specializing in modern web technologies."
        path="/blogs"
      />
    <div className="min-h-screen bg-background">
      <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-background">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-0 text-[14vw] font-black text-foreground md:text-[200px] text-center"
        >
          BLOGS<span className="text-green-300">.</span>
        </motion.h1>
      </section>

      <section ref={mainRef}>
        <div className="w-full mx-auto" style={{ height: '300vh' }}>
          <div className="sticky top-0 h-screen w-full flex flex-col items-start justify-center overflow-hidden">
            <motion.div ref={carouselRef} className="flex gap-6" style={{ x }}>
              {blogData?.blogs?.map((blog, index) => (
                <motion.div
                  {...slideAnimation}
                  key={index}
                  className="group relative h-[400px] w-[300px] md:w-[350px] "
                >
                  <img
                    className="h-full w-full object-cover rounded-3xl transition-transform "
                    src={blog?.image}
                    alt={blog.title}
                  />
                  <div className="p-4">

                    <Link to={blog.slug}>
                      <h2 className="text-xl font-semibold line-clamp-2 mb-2">{blog.title}</h2>
                      <div className='flex hover:border-2 p-4 absolute bottom-3 bg-green-200 rounded-2xl border-green-300 text-gray-900'><p>Read More</p> <ArrowUpRightIcon /></div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <RevealLinks />
    </div>
    </>
  )
}