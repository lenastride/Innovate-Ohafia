<script setup>
    const route = useRoute()
    const currentRoute = computed(() => route.name)
</script>

<template>
    <header class="bg-white px-32 py-4 flex items-center  justify-center sticky top-0 z-20">
       <div class="w-full flex  justify-center items-center">
          <Logo />
          <nav class="flex justify-center gap-12 w-full">
             <NuxtLink to="/" :class="currentRoute === 'index' ? 'active' : undefined">Home</NuxtLink>
             <NuxtLink to="about" :class="currentRoute === 'about' ? 'active' : undefined">About</NuxtLink>
             <NuxtLink to="contact" :class="currentRoute === 'contact' ? 'active' : undefined">Contact</NuxtLink>
          </nav>
          <section class="flex items-center justify-end w-full gap-12">
             <NuxtLink href="#" class="text-[#D90000]">Get Tickets</NuxtLink>
             <button class="bg-[#D90000] self-stretch px-8 py-4 text-white">Donate</button>
          </section>
       </div>
    </header>
</template>

<style scoped>
    .active{
        color: #D90000;
    }
</style>

