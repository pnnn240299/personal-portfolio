import mysqlProvider from '@/providers/mysqlProvider';
import { projectExternalLinksService, mediaService } from '@/services';

export interface Project {
  id: number;
  title: string;
  name?: string;
  slug?: string;
  description?: string;
  longDescription?: string;
  image?: string;
  image_url?: string;
  image_media_id?: number;
  technologies?: string[];
  selectedTechnologies?: (string | number)[];
  github?: string;
  repo_url?: string;
  demo?: string;
  live_url?: string;
  stats?: Array<{ label: string; value: string }>;
}

class ProjectsService {
  private provider = mysqlProvider('projects');

  async getAllProjects(): Promise<Project[]> {
    try {
      const projects = await this.provider.fetchData();
      const projectsWithTech = [];
      
      // Fetch technologies and media for each project
      for (const project of projects as Project[]) {
        try {
          const technologies = await projectExternalLinksService.getProjectTechnologies(project.id);
          
          // Fetch image URL from media relations
          let imageUrl = '';
          try {
            const entityMedia = await mediaService.getEntityMedia(project.id, 'project', 'thumbnail');
            if (entityMedia.length > 0 && entityMedia[0].media) {
              imageUrl = entityMedia[0].media.file_path || '';
            }
          } catch (mediaError) {
            console.error(`Error fetching media for project ${project.id}:`, mediaError);
          }
          
          // Check if technologies is an array and has items
          if (Array.isArray(technologies) && technologies.length > 0) {
            const techTitles = technologies.map(tech => tech.title || tech.name || String(tech));
            
            projectsWithTech.push({
              ...project,
              technologies: techTitles, // Convert to array of strings
              image_url: imageUrl // Add image_url from media
            });
          } else {
            projectsWithTech.push({
              ...project,
              technologies: [],
              image_url: imageUrl // Add image_url from media
            });
          }
        } catch (techError) {
          console.error(`Error fetching technologies for project ${project.id}:`, techError);
          projectsWithTech.push({
            ...project,
            technologies: [],
            image_url: project.image_url || project.image || '' // Fallback to existing image fields
          });
        }
      }
      
      // Business logic: sort, filter, format, etc.
      return projectsWithTech.sort((a: Project, b: Project) => b.id - a.id);
    } catch (error) {
      throw new Error(`Failed to fetch projects: ${error}`);
    }
  }

  async getProjectById(id: string | number): Promise<Project | null> {
    try {
      let project = null;
      
      // First try to get by id (for numeric ids)
      if (typeof id === 'number' || !isNaN(Number(id))) {
        project = await this.provider.getItem(id);
      }
      
      // If not found by id, try to get by slug
      if (!project) {
        project = await this.provider.getItemByField('slug', id);
      }
      
      if (!project) {
        return null;
      }
      
      // Fetch technologies for this project
      try {
        const technologies = await projectExternalLinksService.getProjectTechnologies(project.id);
        return {
          ...project,
          technologies: technologies.map(tech => tech.title) // Convert to array of strings
        };
      } catch (techError) {
        console.error(`Error fetching technologies for project ${project.id}:`, techError);
        return {
          ...project,
          technologies: []
        };
      }
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
      
      if (!data.name) {
        console.error('Name validation failed - data.name is:', data.name);
        throw new Error('Name is required');
      }
      
      // Extract selected technologies before creating project
      const selectedTechnologies = (data as any).selectedTechnologies || [];
      
      // Map form fields to database schema - exclude selectedTechnologies as it's handled separately
      const fieldMapping = {
        'name': 'name',
        'slug': 'slug', 
        'description': 'description',
        'repo_url': 'repo_url',
        'image_url': 'image_url',
        'live_url': 'live_url'
      };
      
      const dbData: any = {};
      
      Object.keys(data).forEach(key => {
        const dbField = fieldMapping[key];
        if (dbField) {
          dbData[dbField] = data[key];
        } else if (key !== 'selectedTechnologies') {
        }
      });
      
      
      const result = await this.provider.createItem(dbData);
      // Handle technologies through relationship table
      if (selectedTechnologies.length > 0 && Array.isArray(selectedTechnologies)) {
        await projectExternalLinksService.updateProjectExternalLinks(result.id, selectedTechnologies);
      }
      
      // Handle media relations (image)
      if (data.image_media_id) {
        await mediaService.createMediaRelation(data.image_media_id, result.id, 'project', 'thumbnail');
      }
      
      return result;
    } catch (error) {
      console.error('Error in createProject:', error);
      throw new Error(`Failed to create project: ${error}`);
    }
  }

  async updateProject(id: string | number, data: Partial<Project>): Promise<Project> {
    try {
      // Handle media relations (image) if provided
      if (data.image_media_id) {
        // Remove existing thumbnail relations for this project
        const existingRelations = await mediaService.getMediaRelations(id, 'project', 'thumbnail');
        for (const relation of existingRelations) {
          await mediaService.deleteMediaRelation(relation.id);
        }
        // Create new media relation
        await mediaService.createMediaRelation(data.image_media_id, id, 'project', 'thumbnail');
      }
      
      // Handle technologies through relationship table if provided
      if (data.selectedTechnologies && Array.isArray(data.selectedTechnologies)) {
        await projectExternalLinksService.updateProjectExternalLinks(id, data.selectedTechnologies);
      }
      
      // Remove fields that shouldn't be in the main project table
      const { selectedTechnologies, image_media_id, ...projectData } = data;
      
      return await this.provider.updateItem(id, projectData);
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
