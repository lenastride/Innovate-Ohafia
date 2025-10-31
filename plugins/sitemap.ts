export default defineNuxtPlugin(() => {
    const sitemap = {
      path: '/sitemap.xml',
      hostname: 'https://innovateohafia.com',
      gzip: true,
      routes: async () => {
        // You can dynamically generate routes here
        return [
          '/',
          '/about',
          '/contact',
          '/services',
          '/events'
        ];
      }
    };
    
    // In a real implementation, you might want to use @nuxtjs/sitemap module
  });