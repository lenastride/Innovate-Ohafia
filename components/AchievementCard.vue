<script setup>
    defineProps({
        title: String,
        description: String
    })
</script>

<template>
    <div class="w-full min-w-[19rem] p-4 border border-[#FF0000]">
       <section class="relative">
        <img src="/achievement-1.png" alt=""v>
        <p class="bg-white px-4 py-2 text-[#FF0000] text-xl font-bold absolute bottom-2">{{ title }}</p>
       </section>
       <p class="pt-4">{{ description }}</p>
    </div>
</template>
