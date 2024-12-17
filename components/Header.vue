<template>
    <header class="bg-white px-32 py-4 flex items-center justify-between sticky top-0 z-10">
        <Logo />
        <nav class="flex gap-12">
            <NuxtLink href="#" class="active">Home</NuxtLink>
            <NuxtLink href="#">About</NuxtLink>
            <NuxtLink href="#">Contact</NuxtLink>
        </nav>
        <div class="flex items-center gap-12">
            <NuxtLink href="#" class="text-[#D90000]">Get Tickets</NuxtLink>
            <button class="bg-[#D90000] self-stretch px-8 py-4 text-white">Donate</button>
        </div>
    </header>
</template>

<style scoped>
    .active{
        color: #D90000;
    }
</style>