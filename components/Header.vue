<script setup>
    const route = useRoute()
    const currentRoute = computed(() => route.name)

    let navOpen = ref(false)

    const toggleNavState = () => navOpen.value = !navOpen.value


</script>

<template>
    <header class="bg-white px-3 py-4 md:px-32 md:py-4 flex items-center  justify-center sticky top-0 z-20">
       <div class="w-full flex max-w-[90em] justify-center items-center">
          <Logo />
          <nav class="md:flex hidden justify-center gap-12 w-full">
             <NuxtLink to="/" :class="currentRoute === 'index' ? 'active' : undefined">Home</NuxtLink>
             <NuxtLink to="about" :class="currentRoute === 'about' ? 'active' : undefined">About</NuxtLink>
             <NuxtLink to="contact" :class="currentRoute === 'contact' ? 'active' : undefined">Contact</NuxtLink>
          </nav>
          <section class="flex items-center justify-end w-full gap-1 md:gap-12">
             <NuxtLink href="#" class="text-[#D90000] hidden md:block">Get Tickets</NuxtLink>
             <button class="bg-[#D90000] self-stretch px-2 py-1 md:px-8 md:py-4 text-white">Donate</button>
             <button class="md:hidden" @click="toggleNavState">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path fill="currentColor" d="M32.666 13.25H7.334a.5.5 0 0 1 0-1h25.332a.5.5 0 0 1 0 1m0 7.25H7.334a.5.5 0 0 1 0-1h25.332a.5.5 0 0 1 0 1m0 7.25H7.334a.5.5 0 0 1 0-1h25.332a.5.5 0 0 1 0 1"/></svg>
             </button>
          </section>
       </div>
        <div @click="toggleNavState" class="bg-white h-[100vh] w-full absolute top-0 transition-all" :class="navOpen? `nav__open` : 'nav__closed' ">

        </div>
    </header>
</template>

<style scoped>
    .active{
        color: #D90000;
    }

    .nav__open{
        left: 0%;
    }
    .nav__closed {
        left: -100%;
    }
</style>
