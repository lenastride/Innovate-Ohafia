<script setup lang="ts">
defineProps({
  id: {
    type: [String, Number],
    default: ''
  },
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
  },
  date: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <article 
    class="event-card group flex-shrink-0 w-80 bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-103 border border-[#FF0000] p-2 cursor-pointer"
    aria-labelledby="card-title"
  >
    <!-- Image Section -->
    <div class="relative h-[18em] bg-gray-200 overflow-hidden">
      <img 
        :src="image" 
        :alt="imageAlt || title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <ShareEventButton
        :event="{ id, title, description, image, imageAlt, date, location }"
        variant="icon"
        :label="`Share ${title}`"
      />
      <h3 
        id="card-title"
        class="absolute -bottom-[0.1em] -left-2 px-5 bg-white items-baseline py-1 text-xl font-bold mb-3 text-[#D90000] z-10"
      >
        {{ title }}
      </h3>
    </div>
    
    <!-- Content Section -->
    <div class="p-4 space-y-2">
      <div v-if="date || location" class="flex flex-col gap-1 text-xs text-gray-500">
        <p v-if="date" class="flex items-center gap-1">
          <span class="font-semibold">Date:</span> {{ date }}
        </p>
        <p v-if="location" class="flex items-center gap-1">
          <span class="font-semibold">Venue:</span> {{ location }}
        </p>
      </div>
      
      <p class="text-gray-600 leading-relaxed text-sm line-clamp-4">
        {{ description }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.event-card {
  scroll-snap-align: start;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
