<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentSlide = ref(0);

const obj = {
  activities: [
    {
      name: "Masterclass",
      image: "/what_to_expect_image_444.png", // Replace with actual image paths
    },
    {
      name: "Network",
      image: "/what_to_expect_image_444.png",
    },
    {
      name: "Start-up Pitches",
      image: "/what_to_expect_image_444.png",
    },
  ],
};

function addLeadingZero(num) {
  return num >= 1 && num <= 9 ? `0${num}` : `${num}`;
}

let slideInterval;

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % obj.activities.length;
  }, 5000); // Change every 3 seconds
};

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
};

// Restart auto-slide when user interacts
const handleUserInteraction = (index) => {
  stopAutoSlide();
  goToSlide(index);
  setTimeout(startAutoSlide, 5000); // Restart after 5 seconds
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<template>
  <main class="flex flex-col justif-center items-center">
    <section class="w-full max-w-[70em]">
      <h1
        class="font-bold text-2xl md:text-3xl text-[#D90000] ml-[6.3%] text-left"
      >
        What to expect
      </h1>
    </section>

    <section
      class="flex flex-col w-full pt-10 md:flex-row justify-center items-center 2xl:mb-0 md:mb-0 -mb-48"
    >
      <!-- Image Section - Slides through different images -->
      <div class="w-full overflow-hidden 2xl:max-h-[34em] relative">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <img
            v-for="(activity, index) in obj.activities"
            :key="index"
            class="w-full flex-shrink-0"
            :src="activity.image"
            :alt="activity.name"
          />
        </div>

        <!-- Slide Indicators -->
        <!-- <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <button
            v-for="(activity, index) in obj.activities"
            :key="index"
            @click="handleUserInteraction(index)"
            class="w-3 h-3 rounded-full transition-all duration-300 border-2 border-white"
            :class="currentSlide === index ? 'bg-white' : 'bg-transparent'"
            :aria-label="`Go to ${activity.name}`"
          ></button>
        </div> -->
      </div>

      <!-- Content Section - Maintains original layout -->
      <div
        class="w-full 2xl:p-[5em] md:p-[2em] 2xl:pl-[7em] md:pl-[2em] bg-cover md:bg-[url(/who_to_expect_bg.png)] g-[url(/innovate_patter.png)] h-[34em] overflow-y-auto custom-scrollbar flex 2xl:items-center md:items-center"
      >
        <div class="w-full 2xl:px-0 md:px-10 px-10">
          <div
            v-for="(activity, index) in obj.activities"
            :key="index"
            class="flex items-center cursor-pointer group relative pl-10 w-full justify-between"
            @click="handleUserInteraction(index)"
            @mouseenter="stopAutoSlide"
            @mouseleave="startAutoSlide"
          >
            <!-- Left Border Indicator -->
            <div
              class="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
              :class="
                currentSlide === index
                  ? 'bg-[#D90000]'
                  : 'bg-gray-300 group-hover:bg-gray-400'
              "
            ></div>
            <span
              class="block w-full 2xl:text-[2rem] md:text-[1.7rem] text-[1.7rem] font-bold transition-colors duration-300 border-red-700 "
              :class="
                currentSlide === index ? 'text-[#D90000]' : 'text-gray-800'
              "
            >
              {{ activity.name }}
            </span>
            <span
              class="flex justify-around w-full font-bold 2xl:text-[5rem] md:text-[3rem] text-[3rem] transition-colors duration-300"
              :class="
                currentSlide === index
                  ? 'text-[#D90000] font-extrabold'
                  : 'font-semibold text-white font-outline-2'
              "
            >
              {{ addLeadingZero(index + 1) }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Custom styles for smooth transitions */
.flex {
  display: flex;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-colors {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure proper image scaling */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Custom scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
