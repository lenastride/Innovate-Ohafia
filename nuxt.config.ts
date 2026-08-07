// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
    
  },
  runtimeConfig: {
    flutterwaveSecretKey: process.env.NUXT_FLUTTERWAVE_SECRET_KEY || '',
    flutterwaveWebhookHash: process.env.NUXT_FLUTTERWAVE_WEBHOOK_HASH || '',
    // These stay server-only and support both the newer NUXT_* names and the
    // older unprefixed Supabase names for compatibility.
    supabaseUrl: process.env.NUXT_SUPABASE_URL || process.env.SUPABASE_URL || '',
    supabaseKey: process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY || process.env.NUXT_SUPABASE_KEY || process.env.SUPABASE_KEY || '',
    communityMembersTable: process.env.NUXT_COMMUNITY_MEMBERS_TABLE || 'community_members',
    resendApiKey: process.env.NUXT_RESEND_API_KEY || '',
    communityWelcomeFrom: process.env.NUXT_COMMUNITY_WELCOME_FROM || '',
    communityWhatsappGroupUrl: process.env.NUXT_COMMUNITY_WHATSAPP_GROUP_URL || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.innovateohafia.com',
      flutterwavePublicKey: process.env.NUXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || ''
    }
  },
  // Nitro configuration for sitemap
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Innovate Ohafia - Igniting Innovation and Empowering Futures',
      meta: [
        { name: 'description', content: 'Igniting youths with a passion for technology and fostering economic development in Ohafia. Join us in transforming our community through innovation.' },
        { name: 'keywords', content: 'Ohafia, technology, innovation, youth development, economic growth, Nigeria' },
        { name: 'author', content: 'Innovate Ohafia' },
        { name: 'robots', content: 'index, follow' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Innovate Ohafia - Igniting Youth Passion for Technology' },
        { property: 'og:description', content: 'Igniting youths with a passion for technology and fostering economic development in Ohafia.' },
        { property: 'og:image', content: 'https://www.innovateohafia.com/og-image.jpg' },
        { property: 'og:url', content: 'https://www.innovateohafia.com' },
        { property: 'og:site_name', content: 'Innovate Ohafia' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:alt', content: 'Innovate Ohafia - Igniting Innovation and Empowering Futures' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Innovate Ohafia - Igniting Youth Passion for Technology' },
        { name: 'twitter:description', content: 'Igniting youths with a passion for technology and fostering economic development in Ohafia.' },
        { name: 'twitter:image', content: 'https://www.innovateohafia.com/og-image.jpg' },
        { name: 'twitter:site', content: '@innovateohafia' },
        { name: 'twitter:creator', content: '@innovateohafia' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'canonical', href: 'https://www.innovateohafia.com' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Innovate Ohafia",
            "url": "https://www.innovateohafia.com",
            "logo": "https://www.innovateohafia.com/innovate_ohafia_logo_colored.svg",
            "description": "Igniting youths with a passion for technology and fostering economic development in Ohafia.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ohafia",
              "addressCountry": "Nigeria"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+234-706-514-9973",
              "contactType": "Customer service",
              "email": "hi@lenastride.com"
            }
          })
        }
      ]
    }
  },
})
