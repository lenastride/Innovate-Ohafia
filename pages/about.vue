<script setup lang="ts">
useSeoMeta({
  title: 'About - Empowering Ohafia Through Technology',
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
  <header
    class="h-[90vh] px-[1.5em] md:px-[1em] flex flex-cols justify-center bg-[url(./about_page_mobile_hero.png)] md:bg-[url(./about_page_hero.png)] bg-no-repeat bg-cover bg-position[center bottom] items-center gap-4"
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
            Innovate Ohafia is a transformative initiative designed to ignite a
            passion for technology, empower youth, and foster economic
            development in Ohafia. Over five action-packed days, participants
            will gain valuable tech skills, explore career opportunities, build
            crucial networks, and collaborate to create sustainable
            tech-driven communities.
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
  <Partners />
  <Speakers />
  <Testimonials />
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
