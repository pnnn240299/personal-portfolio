import { readdir, stat } from 'fs/promises';
import { join } from 'path';

interface Route {
  name: string;
  layout: string;
  path: string;
  icon: string;
}

const iconMap: { [key: string]: string } = {
  'dashboard': '📊',
  'blog': '📝',
  'contact': '📧',
  'project': '🚀',
  'external_link': '🔗',
  'profile': '👤',
  'user': '👥',
  'settings': '⚙️',
  'tables': '📋',
  'marketplace': '🛍️',
  'about': 'ℹ️',
  'default': '📄'
};

function formatRouteName(folderName: string): string {
  return folderName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getIcon(routeName: string): string {
  return iconMap[routeName.toLowerCase()] || iconMap.default;
}

export async function getDynamicRoutes(): Promise<Route[]> {
  try {
    const adminDir = join(process.cwd(), 'app', 'admin');
    const items = await readdir(adminDir);
    
    const routes: Route[] = [];
    
    for (const item of items) {
      const itemPath = join(adminDir, item);
      const itemStat = await stat(itemPath);
      
      // Only process directories that have a page.tsx file
      if (itemStat.isDirectory()) {
        const pageFile = join(itemPath, 'page.tsx');
        try {
          await stat(pageFile); // Check if page.tsx exists
          
          // Skip auth directories
          if (item === 'auth') continue;
          
          routes.push({
            name: formatRouteName(item),
            layout: '/admin',
            path: item,
            icon: getIcon(item)
          });
        } catch {
          // No page.tsx found, skip this directory
          continue;
        }
      }
    }
    
    // Sort routes alphabetically by name, but keep dashboard first
    routes.sort((a, b) => {
      if (a.path === 'dashboard') return -1;
      if (b.path === 'dashboard') return 1;
      return a.name.localeCompare(b.name);
    });
    
    return routes;
  } catch (error) {
    console.error('Error reading admin routes:', error);
    // Fallback to basic routes
    return [
      {
        name: 'Dashboard',
        layout: '/admin',
        path: 'dashboard',
        icon: '📊',
      }
    ];
  }
}
