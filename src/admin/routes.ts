import { getDynamicRoutes } from './utils/dynamicRoutes';

// Dynamic routes that will be generated from the file system
let cachedRoutes: any[] = [];
let lastCacheTime = 0;
const CACHE_DURATION = 60000; // 1 minute cache

export async function getRoutes() {
  const now = Date.now();
  
  // Return cached routes if still valid
  if (cachedRoutes.length > 0 && (now - lastCacheTime) < CACHE_DURATION) {
    return cachedRoutes;
  }
  
  try {
    // Get dynamic routes from file system
    cachedRoutes = await getDynamicRoutes();
    lastCacheTime = now;
    return cachedRoutes;
  } catch (error) {
    console.error('Error getting dynamic routes:', error);
    // Fallback to basic routes
    cachedRoutes = [
      {
        name: "Dashboard",
        layout: "/admin",
        path: "dashboard",
        icon: "📊",
      },
    ];
    return cachedRoutes;
  }
}

// For backward compatibility, export a default function
export default getRoutes;
