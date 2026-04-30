import mysqlProvider from '@/providers/mysqlProvider';

export interface Media {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  mime_type: string;
  size: number;
  alt_text?: string;
  created_at: string;
  updated_at: string;
}

export interface MediaRelation {
  id: number;
  media_id: number;
  entity_id: number;
  entity_type: string;
  type?: string;
  sort_order: number;
  created_at: string;
}

class MediaService {
  private mediaProvider = mysqlProvider('media');
  private mediaRelationsProvider = mysqlProvider('media_relations');

  // Get media by ID
  async getMediaById(id: string | number): Promise<Media | null> {
    try {
      return await this.mediaProvider.getItem(id);
    } catch (error) {
      throw new Error(`Failed to get media: ${error}`);
    }
  }

  // Get media relations for an entity
  async getMediaRelations(entityId: string | number, entityType: string, type?: string): Promise<MediaRelation[]> {
    try {
      const relations = await this.mediaRelationsProvider.fetchData();
      let filteredRelations = (relations as MediaRelation[]).filter(
        relation => relation.entity_id === Number(entityId) && relation.entity_type === entityType
      );
      
      if (type) {
        filteredRelations = filteredRelations.filter(relation => relation.type === type);
      }
      
      return filteredRelations.sort((a, b) => a.sort_order - b.sort_order);
    } catch (error) {
      throw new Error(`Failed to get media relations: ${error}`);
    }
  }

  // Create media relation
  async createMediaRelation(mediaId: string | number, entityId: string | number, entityType: string, type: string = 'thumbnail', sortOrder: number = 0): Promise<MediaRelation> {
    try {
      const relationData = {
        media_id: mediaId,
        entity_id: entityId,
        entity_type: entityType,
        type: type,
        sort_order: sortOrder
      };
      
      return await this.mediaRelationsProvider.createItem(relationData);
    } catch (error) {
      throw new Error(`Failed to create media relation: ${error}`);
    }
  }

  // Update media relations for an entity (replace all relations of a specific type)
  async updateMediaRelations(entityId: string | number, entityType: string, mediaIds: (string | number)[], type: string = 'thumbnail'): Promise<void> {
    try {
      // Get existing relations
      const existingRelations = await this.getMediaRelations(entityId, entityType, type);
      
      // Remove existing relations
      for (const relation of existingRelations) {
        await this.mediaRelationsProvider.deleteItem(relation.id);
      }
      
      // Create new relations
      for (let i = 0; i < mediaIds.length; i++) {
        await this.createMediaRelation(mediaIds[i], entityId, entityType, type, i);
      }
    } catch (error) {
      throw new Error(`Failed to update media relations: ${error}`);
    }
  }

  // Delete media relation
  async deleteMediaRelation(id: string | number): Promise<void> {
    try {
      await this.mediaRelationsProvider.deleteItem(id);
    } catch (error) {
      throw new Error(`Failed to delete media relation: ${error}`);
    }
  }

  // Get media with relations for an entity
  async getEntityMedia(entityId: string | number, entityType: string, type?: string): Promise<(MediaRelation & { media: Media })[]> {
    try {
      const relations = await this.getMediaRelations(entityId, entityType, type);
      const result = [];
      
      for (const relation of relations) {
        const media = await this.getMediaById(relation.media_id);
        if (media) {
          result.push({ ...relation, media });
        }
      }
      
      return result;
    } catch (error) {
      throw new Error(`Failed to get entity media: ${error}`);
    }
  }
}

export default new MediaService();
