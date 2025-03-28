<script lang="ts" setup>
interface Organizers {
  name: string;
  title: string;
  image: string;
}

const organizers: Organizers[] = [
  {
    title: "Lead Organizers",
    name: "James Madison",
    image: "/profile.png",
  },
  {
    title: "Lead Organizers",
    name: "James Madison",
    image: "/profile.png",
  },
  {
    title: "Lead Organizers",
    name: "James Madison",
    image: "/profile.png",
  },
  {
    title: "Lead Organizers",
    name: "James Madison",
    image: "/profile.png",
  },
  {
    title: "Lead Organizers",
    name: "James Madison",
    image: "/profile.png",
  },
  {
    title: "Lead Organizers",
    name: "James Madison",
    image: "/profile.png",
  },
  {
    title: "Lead Organizers",
    name: "James Madison",
    image: "/profile.png",
  },
  {
    title: "Lead Organizers",
    name: "James Madison",
    image: "/profile.png",
  },
  {
    title: "Lead Organizers",
    name: "James Madison",
    image: "/profile.png",
  },
];
</script>
<template>
  <main class="flex flex-col justify-center items-center bg-[#F5F5F5] py-[7em]">
    <div class="w-full max-w-[90em]">
      <section class="w-full max-w-[90em]">
        <div class="px-3 md:px-0">
          <h3 class="uppercase text-[1.6rem]">Event organizer</h3>
          <h1 class="text-[#D90000] text-[2rem] md:text-[3rem] font-bold">
            Meet the Organizers / Speakers
          </h1>
        </div>
      </section>
      <section class="w-full">
        <div class="pt-10 grid px-3 md:px-0 grid-cols-2 md:grid-cols-3 gap-3">
          <div
            class="card relative"
            v-for="(organizer, key) in organizers"
            :data-key="key"
          >
            <div class="absolute bottom-[.5em]">
              <h3
                class="bg-white text-[.5rem] md:text-[1rem] px-2 w-[fit-content] py-2"
              >
                {{ organizer.title }}
              </h3>
              <h1
                class="bg-white mt-1 font-bold md:min-w-[11em] text-[.7rem] md:text-[1.4em] px-2 py-2 text-[#D90000]"
              >
                {{ organizer.name }}
              </h1>
            </div>
            <img :src="organizer.image" alt="" />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
