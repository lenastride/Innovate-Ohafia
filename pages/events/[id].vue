<script setup lang="ts">
type EventDetail = {
  id: string | number
  title: string
  description: string
  fullDescription: string
  image: string
  imageAlt: string
  date: string
  time: string
  location: string
  organizer: string
}

const fallbackEvents: EventDetail[] = [
  {
    id: 1,
    title: "Innovate Ohafia 2025",
    description: "The flagship conference bringing together tech enthusiasts, entrepreneurs, and industry leaders to spark innovation in Ohafia. Join us for masterclasses, networking, startup pitches, and career opportunities. This two-day event features workshops on practical tech skills, career guidance from industry experts, and platforms for startups to showcase their ideas to potential investors.",
    fullDescription: "Innovate Ohafia 2025 is the flagship technology conference designed to ignite innovation and foster economic development in Ohafia. Over two intensive days, participants will engage in hands-on workshops, hear from industry experts, network with like-minded individuals, and explore career opportunities in technology. The event features masterclasses, startup pitch contests, career fairs, and networking sessions with tech professionals and entrepreneurs.",
    image: "/about_page_hero.png",
    imageAlt: "Innovate Ohafia Conference",
    date: "7th - 8th Aug. 2025",
    time: "9:00AM",
    location: "Ohafia, Abia State",
    organizer: "Lenastride"
  },
  {
    id: 2,
    title: "Tech Career Fair",
    description: "Connect directly with hiring tech companies and explore job opportunities in the tech industry. Meet recruiters, submit your resume, and discover career paths in technology.",
    fullDescription: "The Tech Career Fair provides a platform for job seekers to connect directly with hiring companies in the tech industry. Attendees can submit resumes, speak with recruiters, learn about job openings, and get insights into career paths in technology. This event bridges the gap between talent in Ohafia and opportunities in the tech ecosystem.",
    image: "/Connect_with_career.jpg",
    imageAlt: "Tech Career Fair",
    date: "Coming Soon",
    time: "To be announced",
    location: "Ohafia",
    organizer: "Innovate Ohafia"
  },
  {
    id: 3,
    title: "Startup Pitch Contest",
    description: "Aspiring founders pitch their tech startup ideas to potential investors and industry experts. Win funding, mentorship, and the resources needed to turn your idea into a viable business.",
    fullDescription: "The Startup Pitch Contest gives aspiring entrepreneurs the opportunity to present their innovative tech ideas to a panel of investors, mentors, and industry experts. Participants compete for funding, mentorship, and resources to help scale their startups. This platform is designed to foster entrepreneurship and create pathways for new businesses in Ohafia.",
    image: "/Startup_pitches.jpg",
    imageAlt: "Startup Pitch Contest",
    date: "Coming Soon",
    time: "To be announced",
    location: "Ohafia",
    organizer: "Innovate Ohafia"
  },
  {
    id: 4,
    title: "Coding Bootcamp",
    description: "Intensive coding training program designed to equip participants with practical programming skills. Learn web development, mobile app development, and data basics from experienced instructors.",
    fullDescription: "The Coding Bootcamp is an intensive training program designed to equip participants with hands-on programming skills. Through practical sessions, participants learn web development fundamentals, mobile app development, and essential tech skills. The program focuses on project-based learning to ensure graduates can build real-world solutions.",
    image: "/Learn_through_practice.jpg",
    imageAlt: "Coding Bootcamp",
    date: "Coming Soon",
    time: "To be announced",
    location: "Ohafia",
    organizer: "Innovate Ohafia"
  }
]

const route = useRoute()
const eventId = computed(() => String(route.params.id))

const { data: fetched } = await useAsyncData(
  () => `event-${eventId.value}`,
  async () => {
    try {
      return await $fetch<EventDetail>(`/api/events/${encodeURIComponent(eventId.value)}`)
    } catch {
      return null
    }
  },
  { watch: [eventId] },
)

const event = computed(
  () => fetched.value ?? fallbackEvents.find((item) => String(item.id) === eventId.value) ?? null,
)

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl || 'https://innovateohafia.com').replace(/\/+$/, '')

const absoluteEventImage = computed(() => {
  const image = event.value?.image
  if (!image) return `${siteUrl}/og-image.png`
  if (/^https?:\/\//i.test(image)) return image
  return `${siteUrl}${image}`
})

useSeoMeta({
  title: computed(() => event.value ? `${event.value.title} - Innovate Ohafia` : 'Event - Innovate Ohafia'),
  description: computed(() => event.value?.description || 'Event details from Innovate Ohafia'),
  ogTitle: computed(() => event.value ? `${event.value.title} | Innovate Ohafia` : 'Event | Innovate Ohafia'),
  ogDescription: computed(() => event.value?.description || 'Event details from Innovate Ohafia'),
  ogImage: absoluteEventImage,
  ogImageSecureUrl: absoluteEventImage,
  ogImageAlt: computed(() => event.value?.imageAlt || event.value?.title || 'Innovate Ohafia event'),
  ogUrl: computed(() => `https://innovateohafia.com/events/${eventId.value}`),
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => event.value ? `${event.value.title} | Innovate Ohafia` : 'Event | Innovate Ohafia'),
  twitterDescription: computed(() => event.value?.description || 'Event details from Innovate Ohafia'),
  twitterImage: absoluteEventImage
})
</script>

<template>
  <div v-if="event">
    <section class="px-[1em] py-[5em] mt-5 bg-[url(/hero-background.png)] flex flex-col justify-center items-center text-white gap-4">
      <h1 class="text-3xl md:text-5xl text-center font-bold max-w-4xl">
        {{ event.title }}
      </h1>
      <p class="text-center max-w-2xl text-lg">
        {{ event.description }}
      </p>
    </section>
    
    <section class="bg-white w-full py-14 flex flex-col items-center">
      <div class="w-full max-w-[70em] px-4 md:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Event Media -->
          <div class="w-full">
            <div class="border-solid border-[8px] border-[#ff2e2d] w-full overflow-hidden">
              <img 
                :src="event.image" 
                :alt="event.imageAlt"
                class="w-full h-auto block"
              />
            </div>
          </div>
          
          <!-- Event Details -->
          <div class="w-full space-y-8">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-[#D90000] mb-4">Event Details</h2>
              <MarkdownContent :content="event.fullDescription" />
            </div>
            
            <div class="bg-[#F5F5F5] p-6 space-y-4">
              <div v-if="event.date" class="flex items-start gap-3">
                <div class="w-8 h-8 flex items-center justify-center bg-[#D90000] text-white rounded-full flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Date</p>
                  <p class="text-gray-600">{{ event.date }}</p>
                </div>
              </div>
              
              <div v-if="event.time" class="flex items-start gap-3">
                <div class="w-8 h-8 flex items-center justify-center bg-[#D90000] text-white rounded-full flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Time</p>
                  <p class="text-gray-600">{{ event.time }}</p>
                </div>
              </div>
              
              <div v-if="event.location" class="flex items-start gap-3">
                <div class="w-8 h-8 flex items-center justify-center bg-[#D90000] text-white rounded-full flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Venue</p>
                  <p class="text-gray-600">{{ event.location }}</p>
                </div>
              </div>
              
              <div v-if="event.organizer" class="flex items-start gap-3">
                <div class="w-8 h-8 flex items-center justify-center bg-[#D90000] text-white rounded-full flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Organizer</p>
                  <p class="text-gray-600">{{ event.organizer }}</p>
                </div>
              </div>
            </div>
            
            <div class="flex gap-4 flex-col sm:flex-row">
              <NuxtLink to="/events" class="bg-[#D90000] text-white font-bold px-6 py-3 text-center hover:bg-red-700 transition-colors">
                Back to Events
              </NuxtLink>
              <NuxtLink to="/contact" class="border-2 border-[#D90000] text-[#D90000] font-bold px-6 py-3 text-center hover:bg-red-50 transition-colors">
                Contact Us
              </NuxtLink>
              <ShareEventButton
                :event="event"
                variant="button"
                label="Share Event"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <JoinCommunity />
  </div>
  <div v-else class="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <h1 class="text-2xl font-bold text-[#D90000]">Event Not Found</h1>
    <p class="text-gray-600">The event you're looking for doesn't exist.</p>
    <NuxtLink to="/events" class="bg-[#D90000] text-white font-bold px-6 py-3 hover:bg-red-700 transition-colors">
      View All Events
    </NuxtLink>
  </div>
</template>
