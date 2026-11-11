<script setup lang="ts">
useSeoMeta({
  title: 'Events - Innovate Ohafia',
  description: 'Explore upcoming and past events by Innovate Ohafia. Join conferences, tech career fairs, startup pitches, and networking opportunities in Ohafia.',
  ogTitle: 'Events | Innovate Ohafia',
  ogDescription: 'Explore upcoming and past events by Innovate Ohafia including conferences, tech career fairs, startup pitches, and more.',
  ogImage: 'https://innovateohafia.com/og-image.png',
  ogUrl: 'https://innovateohafia.com/events',
  twitterTitle: 'Events | Innovate Ohafia',
  twitterDescription: 'Explore upcoming and past events by Innovate Ohafia.',
  twitterImage: 'https://innovateohafia.com/og-image.png'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://innovateohafia.com/events' }
  ]
})

type EventCardData = {
  id: string | number
  title: string
  description: string
  image: string
  imageAlt: string
  date: string
  location: string
}

const fallbackEvents: EventCardData[] = [
  {
    id: 1,
    title: "Innovate Ohafia 2025",
    description: "The flagship conference bringing together tech enthusiasts, entrepreneurs, and industry leaders to spark innovation in Ohafia. Join us for masterclasses, networking, startup pitches, and career opportunities.",
    image: "/about_page_hero.png",
    imageAlt: "Innovate Ohafia Conference",
    date: "7th - 8th Aug. 2025",
    location: "Ohafia, Abia State"
  },
  {
    id: 2,
    title: "Tech Career Fair",
    description: "Connect directly with hiring tech companies and explore job opportunities in the tech industry. Meet recruiters, submit your resume, and discover career paths in technology.",
    image: "/Connect_with_career.jpg",
    imageAlt: "Tech Career Fair",
    date: "Coming Soon",
    location: "Ohafia"
  },
  {
    id: 3,
    title: "Startup Pitch Contest",
    description: "Aspiring founders pitch their tech startup ideas to potential investors and industry experts. Win funding, mentorship, and the resources needed to turn your idea into a viable business.",
    image: "/Startup_pitches.jpg",
    imageAlt: "Startup Pitch Contest",
    date: "Coming Soon",
    location: "Ohafia"
  },
  {
    id: 4,
    title: "Coding Bootcamp",
    description: "Intensive coding training program designed to equip participants with practical programming skills. Learn web development, mobile app development, and data basics from experienced instructors.",
    image: "/Learn_through_practice.jpg",
    imageAlt: "Coding Bootcamp",
    date: "Coming Soon",
    location: "Ohafia"
  }
]

const { data } = await useFetch<EventCardData[]>('/api/events', { key: 'events-page' })

const events = computed(() => {
  const live = data.value ?? []
  return live.length ? live : fallbackEvents
})
</script>

<template>
  <div>
    <section class="px-[1em] py-[5em] mt-5 bg-[url(/hero-background.png)] flex flex-col justify-center items-center text-white gap-4">
      <h1 class="text-3xl md:text-4xl text-center font-bold">
        Our <span class="text-[#D90000]">Events</span>
      </h1>
      <p class="text-center max-w-2xl">
        Discover upcoming events, conferences, and opportunities to connect with the innovation community.
      </p>
    </section>
    
    <section class="bg-white w-full py-14 flex flex-col items-center">
      <div class="w-full max-w-[70em] px-4 md:px-0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <NuxtLink 
            v-for="event in events" 
            :key="event.id"
            :to="`/events/${event.id}`"
            class="no-underline"
          >
            <EventCard
              :id="event.id"
              :title="event.title"
              :description="event.description"
              :image="event.image"
              :image-alt="event.imageAlt"
              :date="event.date"
              :location="event.location"
            />
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <JoinCommunity />
  </div>
</template>
