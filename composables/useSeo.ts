export const useSeo = (seoData: {
    title: string;
    description: string;
    image?: string;
    url?: string;
    noIndex?: boolean;
  }) => {
    const route = useRoute();
    const config = useRuntimeConfig();
    
    const baseUrl = config.public.siteUrl || 'https://innovateohafia.com';
    const fullUrl = `${baseUrl}${route.path}`;
    
    useSeoMeta({
      title: seoData.title,
      description: seoData.description,
      ogTitle: seoData.title,
      ogDescription: seoData.description,
      ogImage: seoData.image || '/og-image.jpg',
      ogUrl: seoData.url || fullUrl,
      twitterTitle: seoData.title,
      twitterDescription: seoData.description,
      twitterImage: seoData.image || '/og-image.jpg',
      robots: seoData.noIndex ? 'noindex, nofollow' : 'index, follow'
    });
    
    useHead({
      link: [
        { rel: 'canonical', href: seoData.url || fullUrl }
      ]
    });
  };