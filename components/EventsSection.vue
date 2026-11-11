<script setup lang="ts">
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
  }
]

const { data } = await useFetch<EventCardData[]>('/api/events', { key: 'home-events' })

const events = computed(() => {
  const live = data.value ?? []
  return (live.length ? live : fallbackEvents).slice(0, 3)
})
</script>

<template>
  <section class="bg-[#F5F5F5] w-full py-14 flex flex-col items-center">
    <div class="w-full max-w-[70em] flex flex-col justify-center gap-4 px-4 md:px-0">
      <div class="flex justify-between items-center ml-[6.3%] mr-[6.3%]">
        <h1 class="font-bold text-2xl md:text-3xl text-[#D90000] text-left">
          Upcoming Events
        </h1>
        <NuxtLink 
          to="/events" 
          class="text-[#D90000] font-semibold hover:underline transition-all duration-200 text-sm md:text-base"
        >
          See more →
        </NuxtLink>
      </div>
      
      <div class="flex flex-wrap gap-8 justify-center mt-6">
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
</template>
