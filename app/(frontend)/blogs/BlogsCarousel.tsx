'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import { throttle } from '@/frontend/lib/utils';
import { Card, CardContent } from '@/frontend/components/ui/card';
import { Badge } from '@/frontend/components/ui/badge';
import type { Blog } from '@/services';

interface BlogsCarouselProps {
  initialBlogs: Blog[];
}

function useElementViewportPosition(ref) {
  const [position, setPosition] = useState([0, 0]);
  useEffect(() => {
    if (!ref || !ref.current) return;
    const pageHeight = document.body.scrollHeight;
    const start = ref.current.offsetTop;
    const end = start + ref.current.offsetHeight;
    setPosition([start / pageHeight, end / pageHeight]);
  }, []);
  return { position };
}

const slideAnimation = {
  variants: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { amount: 0.3, once: true },
};

export default function BlogsCarousel({ initialBlogs }: BlogsCarouselProps) {
  const mainRef = useRef(null);
  const carouselRef = useRef(null);
  const { position } = useElementViewportPosition(mainRef);
  const [carouselEndPosition, setCarouselEndPosition] = useState(0);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, position, [0, carouselEndPosition]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!carouselRef || !carouselRef.current) return;
    const parent = carouselRef.current.parentElement;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const resetCarouselEndPosition = () => {
      if (carouselRef && carouselRef.current) {
        const newPosition =
          carouselRef.current.clientWidth - window.innerWidth + scrollbarWidth + parent.offsetLeft * 2;
        setCarouselEndPosition(-newPosition);
      }
    };
    resetCarouselEndPosition();
    const handleResize = throttle(resetCarouselEndPosition, 10);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialBlogs]);

  return (
    <section ref={mainRef} className="relative bg-white">
      <div className="w-full mx-auto" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen w-full flex flex-col items-start justify-center overflow-hidden">
          <motion.div ref={carouselRef} className="flex gap-10" style={{ x }}>
            {initialBlogs.map((blog) => (
              <motion.div
                {...slideAnimation}
                key={blog.slug}
                className="group relative w-[300px] md:w-[500px] overflow-hidden bg-white rounded-3xl shadow-lg"
              >
                <Link href={`/blogs/${blog.slug}`}>
                  <Card className="h-full border-0 shadow-none">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-3xl">
                        <motion.img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-white/90 text-black">
                            {blog.categories?.[0] ?? 'General'}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{blog.date}</span>
                          <ArrowUpRightIcon className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
