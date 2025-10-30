<script setup lang="ts">
useSeoMeta({
  title: 'Contact - Innovate Ohafia',
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
    <section
      class="px-[1em] py-[5em] mt-5 bg-[url(./hero-background.png)] flex flex-col justify-center items-center text-white gap-4"
    >
      <h1 class="text-2xl text-center font-bold">
        Contact <span class="text-[#D90000]">Us</span>
      </h1>
    </section>
    <Form />
    <Testimonials />
  </div>
</template>

