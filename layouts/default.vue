<script setup lang="ts">
// This layout will provide default structure and each page can override the head
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Innovate Ohafia`
      : "Innovate Ohafia - Igniting Youth Passion for Technology";
  },
});

// Add sitemap reference
useHead({
  link: [
    {
      rel: "sitemap",
      type: "application/xml",
      title: "Sitemap",
      href: "/sitemap.xml",
    },
  ],
});
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>
