import mysqlProvider from '@/providers/mysqlProvider';

export interface Project {
  id: number;
  title: string;
  name?: string;
  slug?: string;
  description?: string;
  longDescription?: string;
  image?: string;
  technologies?: string[];
  github?: string;
  demo?: string;
  stats?: Array<{ label: string; value: string }>;
}

class ProjectsService {
  private provider = mysqlProvider('projects');

  async getAllProjects(): Promise<Project[]> {
    try {
      const projects = await this.provider.fetchData();
      // Business logic: sort, filter, format, etc.
      return projects.sort((a: Project, b: Project) => b.id - a.id);
    } catch (error) {
      throw new Error(`Failed to fetch projects: ${error}`);
    }
  }

  async getProjectById(id: string | number): Promise<Project | null> {
    try {
      const project = await this.provider.getItem(id);
      if (!project) {
        return null;
      }
      return project;
    } catch (error) {
      throw new Error(`Failed to fetch project with id ${id}: ${error}`);
    }
  }

  async getProjectWithNavigation(id: string | number): Promise<{ project: Project | null; nextProject: Project | null; prevProject: Project | null }> {
    try {
      const projects = await this.getAllProjects();
      const currentIndex = projects.findIndex((p) => String(p.id) === String(id) || p.slug === id);

      if (currentIndex === -1) {
        return { project: null, nextProject: null, prevProject: null };
      }

      return {
        project: projects[currentIndex],
        nextProject: projects[currentIndex + 1] || null,
        prevProject: projects[currentIndex - 1] || null,
      };
    } catch (error) {
      throw new Error(`Failed to fetch project with navigation: ${error}`);
    }
  }

  async createProject(data: Partial<Project>): Promise<Project> {
    try {
      if (!data.title) {
        throw new Error('Title is required');
      }
      return await this.provider.createItem(data);
    } catch (error) {
      throw new Error(`Failed to create project: ${error}`);
    }
  }

  async updateProject(id: string | number, data: Partial<Project>): Promise<Project> {
    try {
      return await this.provider.updateItem(id, data);
    } catch (error) {
      throw new Error(`Failed to update project: ${error}`);
    }
  }

  async deleteProject(id: string | number): Promise<void> {
    try {
      await this.provider.deleteItem(id);
    } catch (error) {
      throw new Error(`Failed to delete project: ${error}`);
    }
  }
}

export default new ProjectsService();
