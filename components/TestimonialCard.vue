<script setup>
  defineProps({
    name: String,
    img: String,
    title: String,
    testimony: String,
    isActive: Boolean
  })
</script>
<template>
        <div :class="isActive? 'max-w-[35em]' : 'max-w-[25em]' " class="w-full min-w-[19em] relative flex justify-center text-center " >
            <div :class="isActive? 'is_active' : ''" class="bg-[#0072B5] opacity-60 py-[2em] pb-[4em] md:bg-white md:text-black text-white p-[1em] flex flex-col items-center ">
                <img :src="img" :class="!isActive? 'hidden' : '' " class="absolute w-[6em] border-2 border-white top-[-4em]">
                <div class="pt-[2em]">
                    <h2 class="text-2xl font-semibold">{{ name }}</h2>
                    <h2 class="font-semibold">{{ title }}</h2>
                </div>
                <p :class="!isActive? 'md:text-[.8rem]': 'md:text-[1rem]'" class="pt-4 text-sm "> {{ testimony}} </p>
            </div>
        </div>
</template>

<style>
    .is_active{
        opacity:1 !important;
        color: white !important;
        background-color: #0072B5 !important;
    }
</style>
