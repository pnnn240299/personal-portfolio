export interface GetProjects {
  id: number;
  name: string;
  description: string;
  live_url: string;
  image_url: string;
  external_links: [];
  action?: string;
}