<script setup lang="ts">
useSeoMeta({
  title: 'Contact - Innovate Ohafia',
  description: 'Contact Innovate Ohafia to partner, volunteer, support youth technology education, or learn more about our work in Ohafia.',
  ogTitle: 'Contact Innovate Ohafia',
  ogDescription: 'Get in touch to partner, volunteer, support youth technology education, or learn more about Innovate Ohafia.',
  ogImage: 'https://innovateohafia.com/og-image.png',
  ogUrl: 'https://innovateohafia.com/contact',
  twitterTitle: 'Contact Innovate Ohafia',
  twitterDescription: 'Get in touch to support youth technology education and innovation in Ohafia.',
  twitterImage: 'https://innovateohafia.com/og-image.png'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://innovateohafia.com/contact' }
  ]
})
</script>

<template>
  <div>
    <section
      class="px-[1em] py-[5em] mt-5 bg-[url(/hero-background.png)] flex flex-col justify-center items-center text-white gap-4"
    >
      <h1 class="text-2xl text-center font-bold">
        Contact <span class="text-[#D90000]">Us</span>
      </h1>
    </section>
    <Form />
    <Testimonials />
  </div>
</template>
