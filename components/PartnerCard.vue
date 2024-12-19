<script setup>
    defineProps({
        text: String
    })
</script>

<template>
    <div class="bg-white w-full max-w-[27rem] flex items-center px-12 py-12 text-xl shadow-xl">
        <p>{{ text }}</p>
    </div>
</template>