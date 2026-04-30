import mysqlProvider from '@/providers/mysqlProvider';
import pool from '@/lib/mysqlClient';

export interface ProjectExternalLink {
  id: number;
  project_id: number;
  external_link_id: number;
  created_at: string;
  updated_at: string;
}

class ProjectExternalLinksService {
  private provider = mysqlProvider('project_external_links');

  async getProjectExternalLinks(projectId: string | number): Promise<ProjectExternalLink[]> {
    try {
      const links = await this.provider.fetchData();
      return (links as ProjectExternalLink[]).filter(link => link.project_id === Number(projectId));
    } catch (error) {
      throw new Error(`Failed to fetch project external links: ${error}`);
    }
  }

  async addExternalLinkToProject(projectId: string | number, externalLinkId: string | number): Promise<ProjectExternalLink> {
    try {
      const result = await this.provider.createItem({
        project_id: projectId,
        external_link_id: externalLinkId
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to add external link to project: ${error}`);
    }
  }

  async removeExternalLinkFromProject(projectId: string | number, externalLinkId: string | number): Promise<void> {
    try {
      // Find the record first, then delete by ID
      const links = await this.getProjectExternalLinks(projectId);
      const linkToDelete = links.find(link => link.external_link_id === Number(externalLinkId));
      
      if (linkToDelete) {
        await this.provider.deleteItem(linkToDelete.id);
      }
    } catch (error) {
      throw new Error(`Failed to remove external link from project: ${error}`);
    }
  }

  async updateProjectExternalLinks(projectId: string | number, externalLinkIds: (string | number)[]): Promise<void> {
    try {
      // Get current external links for this project
      const currentLinks = await this.getProjectExternalLinks(projectId);
      const currentLinkIds = currentLinks.map(link => link.external_link_id);

      // Convert to numbers for comparison
      const newLinkIds = externalLinkIds.map(id => Number(id));

      // Find links to add (in newLinkIds but not in currentLinkIds)
      const linksToAdd = newLinkIds.filter(id => !currentLinkIds.includes(id));

      // Find links to remove (in currentLinkIds but not in newLinkIds)
      const linksToRemove = currentLinkIds.filter(id => !newLinkIds.includes(id));

      // Add new links
      for (const linkId of linksToAdd) {
        await this.addExternalLinkToProject(projectId, linkId);
      }

      // Remove old links
      for (const linkId of linksToRemove) {
        await this.removeExternalLinkFromProject(projectId, linkId);
      }
    } catch (error) {
      throw new Error(`Failed to update project external links: ${error}`);
    }
  }

  async getProjectTechnologies(projectId: string | number): Promise<any[]> {
    try {
      const query = `
        SELECT el.* 
        FROM external_links el
        JOIN project_external_links pel ON el.id = pel.external_link_id
        WHERE pel.project_id = ?
        ORDER BY el.title
      `;
      
      const [rows] = await pool.query(query, [projectId]);
      return rows;
    } catch (error) {
      console.error('Database error in getProjectTechnologies:', error);
      throw new Error(`Failed to fetch project technologies: ${error}`);
    }
  }
}

export default new ProjectExternalLinksService();
