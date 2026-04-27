import React from 'react';
import SEO from '../../../src/frontend/components/SEO';
import { RevealLinks } from '../../../src/frontend/components/common/RevealLinks';
import { blogsService, type Blog } from '../../../src/services';
import BlogsCarousel from './BlogsCarousel';

export const metadata = {
  title: 'Blogs',
  description: 'Read my latest thoughts on web development, technology, and more.',
};

export default async function BlogPage() {
  let blogs: Blog[] = [];
  let error: string | null = null;

  try {
    blogs = await blogsService.getAllBlogs();
  } catch (err) {
    error = `Failed to load blogs: ${err}`;
    console.error(error);
  }

  return (
    <>
      <SEO
        title="Blogs"
        description="Read my latest thoughts on web development, technology, and more."
        path="/blogs"
      />
      <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-black text-white">
        <h2 className="relative z-0 text-[14vw] font-black md:text-[200px]">
          BLOGS<span className="text-orange-500">.</span>
        </h2>
      </section>

      {error ? (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </section>
      ) : (
        <BlogsCarousel initialBlogs={blogs} />
      )}

      <RevealLinks />
    </>
  );
}