<script setup>
    defineProps({
        icon: String,
        title: String,
        description: String
    })
</script>

<template>
    <div class="w-full max-w-[30em] p-4 border border-[#FFC2C2] flex flex-col gap-4">
        <img :src="icon" alt="" class="w-20">
        <section class="flex flex-col pt-4 gap-2">
            <h1 class="text-xl font-bold">{{ title }}</h1>
            <p class="text-sm md:text-xl">{{ description }}</p>
        </section>
    </div>
</template>
