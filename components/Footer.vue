<script setup lang="ts">
const { menuItems } = useNavigation();

const phoneNumber = "+2347065149973";
const emailAddress = "hi@lenastride.com";
const ccEmail = "lenastride@gmail.com";
</script>

<template>
  <footer
    class="bg-[#004873] w-full px-3 2xl:px-32 md:px-[3em] md:py-4 pt-5 items-center flex flex-col gap-3"
  >
    <div class="w-full flex md:flex-row flex-col justify-center py-7">
      <div
        class="pb-0 text-white w-full list-none flex flex-col md:flex-row md:justify-between"
      >
        <div class="w-full">
          <span class="pb-8 block">
            <FooterLogo />
          </span>
          <p class="pb-10 2xl:max-w-[25em] md:max-w-[18em]">
            Igniting youths with a passion for technology and fostering economic
            development in Ohafia.
          </p>
        </div>
        <div
          class="flex items-start justify-between md:justify-end w-full 2xl:gap-40 md:gap-20"
        >
          <div class="text-sm leading-8">
            <h1 class="font-bold text-x1 text-white pb-3">Services</h1>
            <NuxtLink
              v-for="item in menuItems"
              :key="item.routeName"
              :to="item.path"
              class="mobile-nav__link flex flex-col hover:underline"
              :class="{
                'mobile-nav__link--active': currentRoute === item.routeName,
              }"
              @click="closeMobileMenu"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
          <div class="text-sm leading-8">
            <h1 class="font-bold text-x1 text-white pb-3">Contact Us</h1>
            <a 
              :href="`tel:${phoneNumber}`"
              class="hover:underline transition-all duration-200 hover:text-blue-200 cursor-pointer block w-full text-left"
            >
              +234 (0) 706 514 9973
            </a>
            <a 
              :href="`mailto:${emailAddress}?cc=${ccEmail}`" target="blank"
              class="hover:underline transition-all duration-200 hover:text-blue-200 cursor-pointer block w-full text-left"
            >
              hi@lenastride.com
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Social Media Buttons -->
    <div class="w-full p-2 pb-5 gap-3 flex md:max-w-[100em] opacity-60">
      <a
        href="https://x.com/innovateohafia"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Innovate Ohafia on X"
        class="rounded-full border w-9 h-9 flex justify-center items-center p-2 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M22 5.8a8.5 8.5 0 0 1-2.36.64a4.13 4.13 0 0 0 1.81-2.27a8.2 8.2 0 0 1-2.61 1a4.1 4.1 0 0 0-7 3.74a11.64 11.64 0 0 1-8.45-4.29a4.16 4.16 0 0 0-.55 2.07a4.09 4.09 0 0 0 1.82 3.41a4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4a4 4 0 0 1-1.1.17a5 5 0 0 1-.77-.07a4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 3 18.34a8 8 0 0 1-1-.06a11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53a8.4 8.4 0 0 0 2-2.12"
          />
        </svg>
      </a>
      <a
        href="https://www.facebook.com/innovateohafia"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Innovate Ohafia on Facebook"
        class="rounded-full border w-9 h-9 flex justify-center items-center p-2 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"
          />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/innovateohafia"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Innovate Ohafia on Instagram"
        class="rounded-full border w-9 h-9 flex justify-center items-center p-2 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fill="#fff"
            d="M10 1.8c2.67 0 2.99.01 4.04.06c1.08.05 1.82.22 2.47.47a4.98 4.98 0 0 1 1.8 1.17a4.98 4.98 0 0 1 1.17 1.8c.25.65.42 1.39.47 2.47c.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.05 1.08-.22 1.82-.47 2.47a4.98 4.98 0 0 1-1.17 1.8a4.98 4.98 0 0 1-1.8 1.17c-.65.25-1.39.42-2.47.47c-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-1.08-.05-1.82-.22-2.47-.47a4.98 4.98 0 0 1-1.8-1.17a4.98 4.98 0 0 1-1.17-1.8c-.25-.65-.42-1.39-.47-2.47C.01 14.79 0 14.47 0 11.8s.01-2.99.06-4.04c.05-1.08.22-1.82.47-2.47a4.98 4.98 0 0 1 1.17-1.8a4.98 4.98 0 0 1 1.8-1.17c.65-.25 1.39-.42 2.47-.47C7.01 1.81 7.33 1.8 10 1.8m0 1.82c-2.62 0-2.93.01-3.96.06c-.95.04-1.47.2-1.82.34c-.47.18-.81.4-1.17.76c-.36.36-.58.7-.76 1.17c-.14.35-.3.87-.34 1.82c-.05 1.03-.06 1.34-.06 3.96s.01 2.93.06 3.96c.04.95.2 1.47.34 1.82c.18.47.4.81.76 1.17c.36.36.7.58 1.17.76c.35.14.87.3 1.82.34c1.03.05 1.34.06 3.96.06s2.93-.01 3.96-.06c.95-.04 1.47-.2 1.82-.34c.47-.18.81-.4 1.17-.76c.36-.36.58-.7.76-1.17c.14-.35.3-.87.34-1.82c.05-1.03.06-1.34.06-3.96s-.01-2.93-.06-3.96c-.04-.95-.2-1.47-.34-1.82c-.18-.47-.4-.81-.76-1.17c-.36-.36-.7-.58-1.17-.76c-.35-.14-.87-.3-1.82-.34c-1.03-.05-1.34-.06-3.96-.06m0 3.1a5.08 5.08 0 1 0 0 10.16a5.08 5.08 0 0 0 0-10.16m0 1.82a3.26 3.26 0 1 1 0 6.52a3.26 3.26 0 0 1 0-6.52m6.47-2.03a1.19 1.19 0 1 1-2.38 0a1.19 1.19 0 0 1 2.38 0"
          />
        </svg>
      </a>
      <!-- <button
        class="rounded-full border w-9 h-9 flex justify-center items-center p-2 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fill="#fff"
            d="M8.617 13.227C8.091 15.981 7.45 18.621 5.549 20c-.586-4.162.861-7.287 1.534-10.605c-1.147-1.93.138-5.812 2.555-4.855c2.975 1.176-2.576 7.172 1.15 7.922c3.891.781 5.479-6.75 3.066-9.199C10.369-.275 3.708 3.18 4.528 8.245c.199 1.238 1.478 1.613.511 3.322c-2.231-.494-2.897-2.254-2.811-4.6c.138-3.84 3.449-6.527 6.771-6.9c4.201-.471 8.144 1.543 8.689 5.494c.613 4.461-1.896 9.293-6.389 8.945c-1.218-.095-1.728-.699-2.682-1.279"
          />
        </svg>
      </button> -->
    </div>
    
    <!-- Footer Bottom -->
    <div
      class="w-full flex items-center text-sm py-10 pt-5 border-t-2 border-gray-400 justify-between md:max-w-[100em] text-white"
    >
      <p class="flex justify-around w-full">
        <span class="block md:w-full"> © 2024 Innovate Ohafia</span>
        <a href="#" class="text-white md:w-40 hover:underline">Privacy Policy</a>
        <a class="text-white md:w-40 hover:underline" href="#">Term of Service</a>
      </p>
    </div>
  </footer>
</template>
