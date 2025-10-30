<script setup lang="ts">
import { useTestimonialCarousel } from '~/composables/useTestimonialCarousel';

const { 
  testimonies, 
  activeIndex, 
  setActiveIndex, 
  nextTestimony, 
  prevTestimony 
} = useTestimonialCarousel();

// Auto-rotation
const interval = ref<NodeJS.Timeout>();
const mobileContainer = ref<HTMLElement>();

onMounted(() => {
  interval.value = setInterval(() => {
    nextTestimony();
    scrollToActiveCard();
  }, 5000);
});

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});

const pauseAutoRotate = () => {
  if (interval.value) {
    clearInterval(interval.value);
  }
};

const resumeAutoRotate = () => {
  interval.value = setInterval(() => {
    nextTestimony();
    scrollToActiveCard();
  }, 5000);
};

// Scroll to active card on mobile
const scrollToActiveCard = () => {
  if (mobileContainer.value) {
    const container = mobileContainer.value;
    const activeCard = container.children[activeIndex.value] as HTMLElement;
    if (activeCard) {
      const scrollLeft = activeCard.offsetLeft - (container.clientWidth - activeCard.clientWidth) / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }
};

// Scroll to active card when index changes
watch(activeIndex, () => {
  nextTick(() => {
    scrollToActiveCard();
  });
});
</script>

<template>
  <main class="py-[3em] md:px-[10em]">
    <section class="w-full flex justify-center">
      <div class="max-w-[90em] w-full">
        <h1
          class="font-bold text-2xl max-w-[10em] md:max-w-full md:text-3xl text-[#D90000] ml-[6.3%] md:ml-0 text-left"
        >
          what do people say about us?
        </h1>
      </div>
    </section>
    
    <section 
      class="flex flex-col items-center justify-center px-4 md:px-8"
      @mouseenter="pauseAutoRotate"
      @mouseleave="resumeAutoRotate"
    >
      <div class="relative w-full ">
        <!-- Navigation Buttons -->
        <button 
          @click="prevTestimony"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors md:-left-12"
          aria-label="Previous testimony"
        >
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          @click="nextTestimony"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors md:-right-12"
          aria-label="Next testimony"
        >
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Carousel Container -->
        <div class=" py-12">
          <!-- Mobile Layout with Centered Active Card -->
          <div 
            ref="mobileContainer"
            class="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-4 py-8"
            style="scroll-behavior: smooth;"
          >
            <div
              v-for="(testimony, index) in testimonies"
              :key="index"
              class="snap-center flex-shrink-0 transition-all duration-300"
              :class="index === activeIndex ? 'w-[85vw] max-w-[320px]' : 'w-[70vw] max-w-[280px]'"
            >
              <TestimonialCard
                v-bind="testimony"
                @click="setActiveIndex(index)"
              />
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="hidden md:grid place-items-center w-full">
              <div class="grid grid-cols-3 gap-6 place-items-center w-full">
                <TestimonialCard
                  v-for="(testimony, index) in testimonies"
                  :key="index"
                  v-bind="testimony"
                  :class="[
                    'transition-all duration-500 ease-out',
                    index === activeIndex 
                      ? 'scale-105 z-20 col-start-2 row-start-1' 
                      : index === activeIndex - 1
                      ? 'scale-100 opacity-80 z-10 col-start-1 row-start-1'
                      : 'scale-100 opacity-80 z-10 col-start-3 row-start-1'
                  ]"
                  @click="setActiveIndex(index)"
                />
              </div>
            </div>
        </div>

        <!-- Indicators -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(_, index) in testimonies"
            :key="index"
            @click="setActiveIndex(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="[
              index === activeIndex 
                ? 'bg-[#0072B5] w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            ]"
            :aria-label="`Go to testimony ${index + 1}`"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Ensure smooth snapping on mobile */
@media (max-width: 768px) {
  .snap-x {
    scroll-snap-type: x mandatory;
  }
  
  .snap-center {
    scroll-snap-align: center;
  }
}
</style>