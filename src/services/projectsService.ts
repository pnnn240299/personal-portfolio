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
      return (projects as Project[]).sort((a: Project, b: Project) => b.id - a.id);
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
      console.log('createProject called with data:', JSON.stringify(data, null, 2));
      
      if (!data.name) {
        console.error('Name validation failed - data.name is:', data.name);
        throw new Error('Name is required');
      }
      
      // Map form fields to database schema - chỉ map các field có thật trong database
      const fieldMapping = {
        'name': 'name',
        'slug': 'slug', 
        'description': 'description',
        'skill': 'skill',
        'selectedTechnologies': 'skill', // Convert array to comma-separated string
        'repo_url': 'repo_url',
        'github_url': 'repo_url', // Map github_url to repo_url
        'image_url': 'image_url',
        'live_url': 'live_url'
      };
      
      const dbData: any = {};
      
      Object.keys(data).forEach(key => {
        const dbField = fieldMapping[key];
        if (dbField) {
          let value = data[key];
          
          // Convert selectedTechnologies array to comma-separated string for skill field
          if (key === 'selectedTechnologies' && Array.isArray(value)) {
            value = value.join(', ');
          }
          
          dbData[dbField] = value;
          console.log(`Mapping field '${key}' -> '${dbField}' = ${value}`);
        } else {
          console.log(`Skipping field '${key}' - not in database schema`);
        }
      });
      
      console.log('Final database data:', JSON.stringify(dbData, null, 2));
      console.log('Calling provider.createItem...');
      
      const result = await this.provider.createItem(dbData);
      console.log('Provider.createItem succeeded:', result);
      
      return result;
    } catch (error) {
      console.error('Error in createProject:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
      
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
