import mysqlProvider from '@/providers/mysqlProvider';

export interface ExternalLink {
  id: number;
  title: string;
  url: string;
  category?: string;
  description?: string;
}

class ExternalLinksService {
  private provider = mysqlProvider('external_links');

  async getAllLinks(): Promise<ExternalLink[]> {
    try {
      const links = await this.provider.fetchData();
      // Business logic: sort, filter, format, etc.
      return links;
    } catch (error) {
      throw new Error(`Failed to fetch external links: ${error}`);
    }
  }

  async getLinkById(id: string | number): Promise<ExternalLink | null> {
    try {
      const link = await this.provider.getItem(id);
      if (!link) {
        return null;
      }
      return link;
    } catch (error) {
      throw new Error(`Failed to fetch link with id ${id}: ${error}`);
    }
  }

  async createLink(data: Partial<ExternalLink>): Promise<ExternalLink> {
    try {
      if (!data.title || !data.url) {
        throw new Error('Title and URL are required');
      }
      return await this.provider.createItem(data);
    } catch (error) {
      throw new Error(`Failed to create external link: ${error}`);
    }
  }

  async updateLink(id: string | number, data: Partial<ExternalLink>): Promise<ExternalLink> {
    try {
      return await this.provider.updateItem(id, data);
    } catch (error) {
      throw new Error(`Failed to update external link: ${error}`);
    }
  }

  async deleteLink(id: string | number): Promise<void> {
    try {
      await this.provider.deleteItem(id);
    } catch (error) {
      throw new Error(`Failed to delete external link: ${error}`);
    }
  }
}

export default new ExternalLinksService();
