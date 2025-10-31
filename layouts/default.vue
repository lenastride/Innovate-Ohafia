<script setup lang="ts">
// This layout will provide default structure and each page can override the head
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Innovate Ohafia` : 'Innovate Ohafia - Igniting Youth Passion for Technology';
  }
})
</script>

<template>
    <div>
        <Header />
        <NuxtPage />
        <Footer />
    </div>
</template>
