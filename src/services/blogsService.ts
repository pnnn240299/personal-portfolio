import mysqlProvider from '@/providers/mysqlProvider';

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  image?: string;
  date?: string;
  categories?: string[];
}

class BlogsService {
  private provider = mysqlProvider('blogs');

  async getAllBlogs(): Promise<Blog[]> {
    try {
      const blogs = await this.provider.fetchData();
      // Business logic: sort, filter, format, etc.
      return (blogs as Blog[]).sort((a: Blog, b: Blog) => 
        new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
      );
    } catch (error) {
      throw new Error(`Failed to fetch blogs: ${error}`);
    }
  }

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
      const blog = await this.provider.getItemByField('slug', slug);
      if (!blog) {
        return null;
      }
      return blog;
    } catch (error) {
      throw new Error(`Failed to fetch blog with slug ${slug}: ${error}`);
    }
  }

  async getBlogWithNavigation(slug: string): Promise<{ blog: Blog | null; nextBlog: Blog | null; prevBlog: Blog | null }> {
    try {
      const blogs = await this.getAllBlogs();
      const currentIndex = blogs.findIndex((b) => b.slug === slug);

      if (currentIndex === -1) {
        return { blog: null, nextBlog: null, prevBlog: null };
      }

      return {
        blog: blogs[currentIndex],
        nextBlog: blogs[currentIndex + 1] || null,
        prevBlog: blogs[currentIndex - 1] || null,
      };
    } catch (error) {
      throw new Error(`Failed to fetch blog with navigation: ${error}`);
    }
  }

  async createBlog(data: Partial<Blog>): Promise<Blog> {
    try {
      if (!data.title || !data.slug) {
        throw new Error('Title and slug are required');
      }
      return await this.provider.createItem(data);
    } catch (error) {
      throw new Error(`Failed to create blog: ${error}`);
    }
  }

  async updateBlog(slug: string, data: Partial<Blog>): Promise<Blog> {
    try {
      return await this.provider.updateItemByField('slug', slug, data);
    } catch (error) {
      throw new Error(`Failed to update blog: ${error}`);
    }
  }

  async deleteBlog(slug: string): Promise<void> {
    try {
      await this.provider.deleteItemByField('slug', slug);
    } catch (error) {
      throw new Error(`Failed to delete blog: ${error}`);
    }
  }
}

export default new BlogsService();
