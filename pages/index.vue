<script setup lang="ts">
useSeoMeta({
  title: 'Home - Empowering Ohafia Through Technology',
  description: 'Join Innovate Ohafia in transforming our community through technology education, innovation hubs, and youth empowerment programs.',
  ogTitle: 'Innovate Ohafia - Home',
  ogDescription: 'Join Innovate Ohafia in transforming our community through technology education and youth empowerment.',
  ogImage: '/og-image.jpg',
  ogUrl: 'https://innovateohafia.com',
  twitterTitle: 'Innovate Ohafia - Home',
  twitterDescription: 'Transforming Ohafia through technology and innovation.',
  twitterImage: '/og-image.jpg'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://innovateohafia.com' }
  ]
})
</script>

<template>
    <div>
        <Hero />
        <Partners />
        <Achievement />
        <WhyAttend />
        <WhatToExpect />
        <Testimonials />
        <JoinCommunity />
    </div>
</template>
