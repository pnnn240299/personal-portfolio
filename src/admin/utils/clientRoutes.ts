import { useEffect, useState } from 'react';

interface Route {
  name: string;
  layout: string;
  path: string;
  icon: string;
}

const staticRoutes: Route[] = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: "📊",
  },
];

export function useClientRoutes() {
  const [routes, setRoutes] = useState<Route[]>(staticRoutes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('/api/admin/routes');
        if (response.ok) {
          const dynamicRoutes = await response.json();
          setRoutes(dynamicRoutes);
        } else {
          // Fallback to static routes
          console.warn('Could not fetch dynamic routes, using static routes');
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
        // Fallback to static routes
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return { routes, loading };
}
