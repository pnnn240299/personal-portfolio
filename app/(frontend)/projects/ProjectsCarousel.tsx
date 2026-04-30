'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react';
import { throttle } from '@/frontend/lib/utils';
import type { Project } from '@/services';

interface ProjectsCarouselProps {
  initialProjects: Project[];
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
    full: { backgroundColor: '#fff' },
    partial: { backgroundColor: '#fff' },
  },
  initial: 'partial',
  whileInView: 'full',
  viewport: { amount: 1, once: false },
};

export default function ProjectsCarousel({ initialProjects }: ProjectsCarouselProps) {
  const mainRef = useRef(null);
  const carouselRef = useRef(null);
  const { position } = useElementViewportPosition(mainRef);

  // Debug: Log projects data
  initialProjects.forEach((project, index) => {
    console.log(`Project ${index}:`, {
      id: project.id,
      title: project.title,
      image_url: project.image_url,
      image: project.image,
      finalImage: project.image_url || project.image || ''
    });
  });
  const [carouselEndPosition, setCarouselEndPosition] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();
  const x = useTransform(scrollYProgress, position, [0, carouselEndPosition]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log('Page scroll: ', latest);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!carouselRef || !carouselRef.current) return;
    const parent = carouselRef.current.parentElement;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const resetCarouselEndPosition = () => {
      if (carouselRef && carouselRef.current) {
        const newPosition =
          carouselRef.current.clientWidth -
          window.innerWidth +
          scrollbarWidth +
          parent.offsetLeft * 2;
        setCarouselEndPosition(-newPosition);
      }
    };
    resetCarouselEndPosition();
    const handleResize = throttle(resetCarouselEndPosition, 10);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialProjects]);

  return (
    <section ref={mainRef}>
      <div className="w-full mx-auto" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen w-full flex flex-col items-start justify-center overflow-hidden">
          <motion.div ref={carouselRef} className="flex gap-10" style={{ x }}>
            {initialProjects.map((item) => (
              <motion.div
                {...slideAnimation}
                key={item.id}
                className="group relative w-[300px] md:w-[500px] overflow-hidden"
              >
                <Link href={`/projects/${item.slug || item.id}`}>
                    <Image
                      className="w-full flex-shrink-0 object-cover rounded-3xl !h-[300px]"
                      src={item?.image_url || item?.image || '/placeholder-image.jpg'}
                      alt={item.name}
                      width={500}
                      height={300}
                      onError={(e) => {
                        console.error('Image failed to load:', {
                          src: e.currentTarget.src,
                          projectId: item.id,
                          title: item.title
                        });
                        // Fallback to placeholder
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className='absolute top-4 right-4 bg-green-200 p-2 rounded-3xl'>
                      <MoveUpRight />
                    </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
