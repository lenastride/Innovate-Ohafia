<script setup lang="ts">
useSeoMeta({
  title: 'About - Innovate Ohafia',
  description: 'Learn how Innovate Ohafia equips young people with practical technology skills, creative spaces, and pathways to opportunity.',
  ogTitle: 'About Innovate Ohafia',
  ogDescription: 'Discover how we equip young people in Ohafia with technology skills, creative spaces, and pathways to opportunity.',
  ogImage: 'https://innovateohafia.com/og-image.png',
  ogUrl: 'https://innovateohafia.com/about',
  twitterTitle: 'About Innovate Ohafia',
  twitterDescription: 'Technology skills, creative spaces, and opportunity for young people in Ohafia.',
  twitterImage: 'https://innovateohafia.com/og-image.png'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://innovateohafia.com/about' }
  ]
})
</script>

<template>
  <header
    class="h-[90vh] px-[1.5em] md:px-[1em] flex flex-cols justify-center bg-[url(/about_page_mobile_hero.png)] md:bg-[url(./about_page_hero.png)] bg-no-repeat bg-cover bg-position[center bottom] items-center gap-4"
  >
    <div class="flex flex-col md:flex-row items-center max-w-[90em] w-full">
      <section class="w-full md:p-[4em] flex justify-center items-center pl-0">
        <div class="relative pb-10 max-w-[30em]">
          <h1
            class="absolute top-[-1.5em] w-full left-[-.25em] text-white text-stroke text-[4rem] font-bold md:hidden"
          >
            About Us
          </h1>
          <p class="relative max-w-[30em]">
            Innovate Ohafia is more than a conference—it is the catalyst for a technological revolution in Ohafia. Designed by Lenastride, this initiative begins with an intensive two-day gathering designed to spark innovation, but its impact extends far beyond the event. By equipping youth with future-ready skills, facilitating high-value industry connections, and fostering a culture of collaboration, Innovate Ohafia lays the groundwork for a self-sustaining tech ecosystem. Our goal is to transform Ohafia into a hub where talent is nurtured, businesses are born, and economic prosperity is built for generations to come.
          </p>
        </div>
      </section>
      <section class="w-full flex justify-end px-[2em] md:px-0">
        <div
          class="border-solid border-[10px] border-[#ff2e2d] max-w-[40em] w-full"
        >
          <img src="/7xm.xyz847854.png" alt="" class="w-full" />
        </div>
      </section>
    </div>
  </header>
  <!-- <Partners /> -->
  <!-- <Speakers /> -->
  <!-- <Testimonials /> -->
  <JoinCommunity />
</template>

<style scoped>
.text-stroke {
  /* text-shadow:
    -2px -2px 0 #D90000,
     2px -2px 0 #D90000,
    -2px  2px 0 #D90000,
     2px  2px 0 #D90000; */
  opacity: 0.8;
  -webkit-text-stroke: 1px #d90000;
  -webkit-text-fill-color: white; /* Optional: Keeps inside text color */
}
</style>
