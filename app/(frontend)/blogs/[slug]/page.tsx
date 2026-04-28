import { blogsService } from '@/services';
import type { Blog } from '@/services';
import SEO from '@/frontend/components/SEO';
import { RevealLinks } from '@/frontend/components/common/RevealLinks';
import BlogDetailClient from './BlogDetailClient';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  try {
    const blog = await blogsService.getBlogBySlug(params.slug);
    return {
      title: blog?.title || 'Blog Post',
      description: blog?.summary || 'Read this blog post',
    };
  } catch {
    return {
      title: 'Blog Post',
      description: 'Read this blog post',
    };
  }
}

export default async function BlogDetailsPage({ params }: BlogDetailPageProps) {
  let blog: Blog | null = null;
  let nextBlog: Blog | null = null;
  let prevBlog: Blog | null = null;
  let error = null;

  try {
    const result = await blogsService.getBlogWithNavigation(params.slug);
    blog = result.blog;
    nextBlog = result.nextBlog;
    prevBlog = result.prevBlog;
  } catch (err) {
    error = `Failed to load blog: ${err}`;
    console.error(error);
  }

  if (!blog) {
    return (
      <>
        <SEO title="Blog Not Found" description="This blog post could not be found." path={`/blogs/${params.slug}`} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600">{error || 'The blog post you are looking for does not exist.'}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title={blog.title} description={blog.summary} path={`/blogs/${params.slug}`} />
      <BlogDetailClient blog={blog} nextBlog={nextBlog} prevBlog={prevBlog} />
      <RevealLinks />
    </>
  );
}
