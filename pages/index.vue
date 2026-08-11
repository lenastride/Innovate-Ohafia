<script setup lang="ts">
useSeoMeta({
  title: 'Home - Empowering Ohafia Through Technology',
  description: 'Igniting youth with a passion for technology and fostering economic development in Ohafia. Join Innovate Ohafia in transforming our community through tech education, innovation hubs, and youth empowerment programs.',
  ogTitle: 'Innovate Ohafia - Empowering Ohafia Through Technology',
  ogDescription: 'Igniting youth with a passion for technology and fostering economic development in Ohafia. Join Innovate Ohafia in transforming our community through tech education, innovation hubs, and youth empowerment programs.',
  ogImage: 'https://innovateohafia.com/og-image.png',
  ogUrl: 'https://innovateohafia.com',
  twitterTitle: 'Innovate Ohafia - Home',
  twitterDescription: 'Transforming Ohafia through technology and innovation.',
  twitterImage: 'https://innovateohafia.com/og-image.png'
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
        <!-- <Testimonials /> -->
        <JoinCommunity />
    </div>
</template>
