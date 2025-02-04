<script setup>
  const testimonies = ref([
      {
        name: "James Brown",
        img: "/avatar.png",
        title: "Princess of africa",
        testimony: "#InnovateOhafia conferences bring together professionals, experts, and industry leaders from diverse backgrounds. This environment presents excellent networking opportunities, allowing you to meet and connect with like-minded individuals, potential clients, collaborators, and mentors.",
        isActive: false
      },
      {
        name: "James Brown",
        img: "/avatar.png",
        title: "Princess of africa",
        testimony: "#InnovateOhafia conferences bring together professionals, experts, and industry leaders from diverse backgrounds. This environment presents excellent networking opportunities, allowing you to meet and connect with like-minded individuals, potential clients, collaborators, and mentors.",
        isActive: true
      },
      {
        name: "James Brown",
        img: "/avatar.png",
        title: "Princess of africa",
        testimony: "#InnovateOhafia conferences bring together professionals, experts, and industry leaders from diverse backgrounds. This environment presents excellent networking opportunities, allowing you to meet and connect with like-minded individuals, potential clients, collaborators, and mentors.",
        isActive: false
      }
    ])
</script>
<template>
    <main class="py-[3em]">
        <section class="w-full max-w-[70em]">
            <h1 class="font-bold text-2xl max-w-[10em] md:max-w-full md:text-3xl text-[#D90000] ml-[6.3%] text-left">what do people say about us?</h1>
        </section>
        <section class="flex flex-col md:justify-center md:items-center">
            <div class="w-full max-w-[90em] flex gap-6 md:gap-0 md:justify-center md:item-center pt-[5em] overflow-auto">
                <TestimonialCard v-for="(testimony,index) in testimonies" :key="index" v-bind="testimony" />
            </div>
        </section>
    </main>
</template>
<style scoped>

</style>
