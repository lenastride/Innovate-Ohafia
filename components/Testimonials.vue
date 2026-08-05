<script setup lang="ts">
import { useTestimonialCarousel } from '~/composables/useTestimonialCarousel';

const { 
  testimonies, 
  activeIndex, 
  setActiveIndex, 
  nextTestimony, 
  prevTestimony 
} = useTestimonialCarousel();

const AUTO_ROTATE_DELAY = 5000;
let interval: ReturnType<typeof setInterval> | undefined;
const mobileContainer = ref<HTMLElement>();

const stopAutoRotate = () => {
  if (interval) clearInterval(interval);
  interval = undefined;
};

const startAutoRotate = () => {
  stopAutoRotate();
  interval = setInterval(nextTestimony, AUTO_ROTATE_DELAY);
};

const pauseAutoRotate = () => {
  stopAutoRotate();
};

const resumeAutoRotate = () => {
  startAutoRotate();
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

const desktopOffset = (index: number) => {
  const total = testimonies.value.length;
  const distance = (index - activeIndex.value + total) % total;
  return distance === total - 1 ? -1 : distance;
};

const desktopCardStyle = (index: number) => {
  const offset = desktopOffset(index);
  const isActive = offset === 0;

  return {
    opacity: isActive ? '1' : '0.72',
    transform: `translateX(calc(-50% + ${offset * 120}%)) scale(${isActive ? 1.05 : 1})`,
    zIndex: isActive ? 2 : 1,
  };
};

onMounted(startAutoRotate);
onUnmounted(stopAutoRotate);
</script>

<template>
  <main class="2xl:py-[3em] 2xl:px-[10em] md:px-[3em]">
    <section class="w-full flex justify-center">
      <div class="max-w-[90em] w-full md:pl-[6em]">
        <h1
          class="font-bold text-2xl max-w-[10em] 2xl:max-w-full md:text-3xl text-[#D90000] ml-[6.3%] md:ml-0 text-left "
        >
          what do people say about us?
        </h1>
      </div>
    </section>
    
    <section 
      class="flex flex-col items-center justify-center px-4 md:px-8"
      @mouseenter="pauseAutoRotate"
      @mouseleave="resumeAutoRotate"
      @focusin="pauseAutoRotate"
      @focusout="resumeAutoRotate"
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
              class="w-[82vw] max-w-[320px] snap-center flex-shrink-0 transition-transform duration-500 ease-out"
              :class="index === activeIndex ? 'scale-[1.02]' : 'scale-100 opacity-80'"
            >
              <TestimonialCard
                v-bind="testimony"
                @click="setActiveIndex(index)"
              />
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="relative hidden h-[21rem] w-full overflow-hidden md:block">
            <div
              v-for="(testimony, index) in testimonies"
              :key="index"
              class="absolute left-1/2 top-8 w-[30%] min-w-[16rem] max-w-[22rem] transition-[transform,opacity] duration-700 ease-in-out"
              :style="desktopCardStyle(index)"
            >
              <TestimonialCard
                v-bind="testimony"
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
