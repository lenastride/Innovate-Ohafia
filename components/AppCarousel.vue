<!-- components/AppCarousel.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  autoPlayInterval: {
    type: Number,
    default: 5000
  }
})

const carouselRef = ref(null)
const currentIndex = ref(0)
const isPaused = ref(false)
let autoPlayTimer = null

const cardWidth = 320 // w-80 = 320px
const gap = 32 // gap-8 = 32px

const scrollToIndex = (index) => {
  if (!carouselRef.value) return
  
  const scrollPosition = index * (cardWidth + gap)
  carouselRef.value.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  })
  currentIndex.value = index
}

const next = () => {
  const nextIndex = (currentIndex.value + 1) % props.items.length
  scrollToIndex(nextIndex)
}

const prev = () => {
  const prevIndex = (currentIndex.value - 1 + props.items.length) % props.items.length
  scrollToIndex(prevIndex)
}

const goToSlide = (index) => {
  scrollToIndex(index)
  resetAutoPlay()
}

const startAutoPlay = () => {
  if (!props.autoPlay || isPaused.value) return
  
  stopAutoPlay()
  autoPlayTimer = setInterval(next, props.autoPlayInterval)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

const handleMouseEnter = () => {
  isPaused.value = true
  stopAutoPlay()
}

const handleMouseLeave = () => {
  isPaused.value = false
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section 
    class="carousel-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Navigation Buttons -->
    <div class="carousel-navigation">
      <button
        @click="prev"
        class="carousel-btn carousel-btn--prev"
        :disabled="currentIndex === 0"
        aria-label="Previous slide"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        @click="next"
        class="carousel-btn carousel-btn--next"
        :disabled="currentIndex === items.length - 1"
        aria-label="Next slide"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Carousel Track -->
    <div
      ref="carouselRef"
      class="carousel-track"
      role="region"
      aria-label="Achievements carousel"
    >
      <div class="carousel-inner">
        <AchievementCard
          v-for="(item, index) in items"
          :key="index"
          :title="item.title"
          :description="item.description"
          :image="item.image"
          :image-alt="item.imageAlt"
        />
      </div>
    </div>

    <!-- Indicators -->
    <div class="carousel-indicators">
      <button
        v-for="(item, index) in items"
        :key="index"
        @click="goToSlide(index)"
        class="carousel-indicator"
        :class="{ 'carousel-indicator--active': currentIndex === index }"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>
  </section>
</template>

<style scoped>
.carousel-container {
  @apply relative w-full px-4;
}

.carousel-navigation {
  @apply absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-10;
}

.carousel-btn {
  @apply bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 pointer-events-auto transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D90000] focus:ring-offset-2;
}

.carousel-btn--prev {
  @apply -left-4;
}

.carousel-btn--next {
  @apply -right-4;
}

.carousel-btn:disabled {
  @apply opacity-50 cursor-not-allowed hover:scale-100;
}

.carousel-track {
  @apply overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth;
  -webkit-overflow-scrolling: touch;
}

.carousel-inner {
  @apply flex gap-8 py-2;
}

.carousel-indicators {
  @apply flex justify-center gap-2 mt-6;
}

.carousel-indicator {
  @apply w-3 h-3 rounded-full bg-gray-300 transition-all duration-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D90000] focus:ring-offset-2;
}

.carousel-indicator--active {
  @apply bg-[#D90000] scale-125;
}

/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .carousel-btn {
    @apply p-2;
  }
  
  .carousel-btn--prev {
    @apply -left-2;
  }
  
  .carousel-btn--next {
    @apply -right-2;
  }
}
</style>