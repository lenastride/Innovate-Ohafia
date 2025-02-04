<script setup >
    defineProps({
        text: String,
        title: String,
        titlePosition: String
    })
</script>

<template>
    <div class="relative w-full md:px-4 md:max-w-[27em] max-w-[18em]">
    <div class="bg-white relative min-h-[13.5em] w-full flex items-center px-3 py-8 md:px-12 md:py-12 text-[1rem] md:text-x1 shadow-xl">
    <h1
      class="absolute text-white text-stroke text-[4.5rem] font-bold md:hidden"
      :class="{
        'bottom-[-25%]': titlePosition === 'bottom',
        'top-[-25%]': titlePosition === 'top',
        'left-[-15%]': titlePosition === 'top',
        'right-[-15%]': titlePosition === 'bottom'
      }"
    >
      {{ title }}
    </h1>
        <p>{{ text }}</p>
    </div>
    </div>
</template>
<style scoped>
 .text-stroke {
  /* text-shadow:
    -2px -2px 0 #D90000,
     2px -2px 0 #D90000,
    -2px  2px 0 #D90000,
     2px  2px 0 #D90000; */
     opacity:0.8;
     -webkit-text-stroke: 1px #D90000;
     -webkit-text-fill-color: white; /* Optional: Keeps inside text color */
}
</style>
