export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const baseUrl = config.public.siteUrl;
    
    // Get all your dynamic routes (from CMS, database, etc.)
    const dynamicRoutes = await $fetch('/api/posts').then(posts => 
      posts.map(post => `/blog/${post.slug}`)
    ).catch(() => []);
  
    // Static routes
    const staticRoutes = [
      '',
      '/about',
      '/contact',
      '/tickets',
      '/donate'
    ];
  
    const routes = [...staticRoutes, ...dynamicRoutes];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(route => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${getChangeFreq(route)}</changefreq>
        <priority>${getPriority(route)}</priority>
      </url>
    `).join('')}
  </urlset>`;
  
    event.node.res.setHeader('content-type', 'text/xml');
    event.node.res.end(sitemap);
  });
  
  function getChangeFreq(route: string): string {
    if (route === '') return 'daily';
    if (route.startsWith('/blog')) return 'weekly';
    return 'monthly';
  }
  
  function getPriority(route: string): number {
    if (route === '') return 1.0;
    if (route === '/about') return 0.9;
    if (route === '/contact') return 0.8;
    if (route.startsWith('/donate')) return 0.7;
    return 0.5;
  }