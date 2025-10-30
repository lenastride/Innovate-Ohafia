<!-- components/AchievementCard.vue -->
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <article 
    class="achievement-card group flex-shrink-0 w-80 bg-white  shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-103 border border-[#FF0000] p-2"
    aria-labelledby="card-title"
  >
    <!-- Image Section -->
    <div class="relative h-[18em] bg-gray-200 overflow-hidden">
      <img 
        :src="image" 
        :alt="imageAlt || title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 -z-5"
      />
      <h3 
        id="card-title"
        class="absolute -bottom-[0.1em] -left-2 px-5 bg-white items-baseline py-1 text-xl font-bold mb-3  text-[#D90000] z-10 "
      >
        {{ title }}
      </h3>
    </div>
    
    <!-- Content Section -->
    <div class="p-4">
      
      <p class="text-gray-600 leading-relaxed text-sm">
        {{ description }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.achievement-card {
  scroll-snap-align: start;
}
</style>