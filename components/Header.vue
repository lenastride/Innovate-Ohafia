<script setup lang="ts">
// Single source for menu items
const { menuItems } = useNavigation();
const route = useRoute();
const currentRoute = computed(() => route.name);

const navOpen = ref(false);

const toggleNavState = () => {
  navOpen.value = !navOpen.value;
};

const closeMobileMenu = () => {
  navOpen.value = false;
};

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    closeMobileMenu();
  }
);

// Close mobile menu on escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && navOpen.value) {
    closeMobileMenu();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <header class="header" role="banner">
    <div class="header__container">
      <!-- Logo -->
      <NuxtLink to="/" class="header__logo" aria-label="Go to home page">
        <slot name="logo">
          <span class="py-2 block">
            <HeaderLogo />
          </span>
        </slot>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="header__nav desktop-nav" aria-label="Main navigation">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.routeName"
          :to="item.path"
          class="nav-link"
          :class="{ 'nav-link--active': currentRoute === item.routeName }"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Header Actions -->
      <section class="header__actions">
        <!-- Get Tickets Link - Desktop Only -->
        <NuxtLink to="/tickets" class="tickets-link"> Get Tickets </NuxtLink>

        <!-- Donate Button -->
        <button class="donate-btn">Donate</button>

        <!-- Mobile Menu Toggle -->
        <button
          class="mobile-menu-toggle"
          :aria-expanded="navOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
          @click="toggleNavState"
        >
          <svg
            v-if="!navOpen"
            class="menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M32.666 13.25H7.334a.5.5 0 0 1 0-1h25.332a.5.5 0 0 1 0 1m0 7.25H7.334a.5.5 0 0 1 0-1h25.332a.5.5 0 0 1 0 1m0 7.25H7.334a.5.5 0 0 1 0-1h25.332a.5.5 0 0 1 0 1"
            />
          </svg>
          <svg
            v-else
            class="close-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M28.5 12.5L27.5 11.5L20 19L12.5 11.5L11.5 12.5L19 20L11.5 27.5L12.5 28.5L20 21L27.5 28.5L28.5 27.5L21 20L28.5 12.5Z"
            />
          </svg>
        </button>
      </section>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      id="mobile-menu"
      class="mobile-menu"
      :class="{ 'mobile-menu--open': navOpen }"
      role="dialog"
      aria-modal="true"
      :aria-hidden="!navOpen"
    >
      <div class="mobile-menu__content">
        <!-- Mobile Menu Header with Back Arrow -->
        <div class="mobile-menu__header">
          <button
            class="mobile-menu__back-btn font-bold"
            @click="closeMobileMenu"
            aria-label="Close mobile menu"
          >
            <svg
              width="33"
              height="33"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H5.25C5.05109 12.75 4.86032 12.671 4.71967 12.5303C4.57902 12.3897 4.5 12.1989 4.5 12C4.5 11.8011 4.57902 11.6103 4.71967 11.4697C4.86032 11.329 5.05109 11.25 5.25 11.25Z"
                fill="black"
              />
              <path
                d="M5.56062 12L11.7811 18.219C11.9219 18.3598 12.0011 18.5508 12.0011 18.75C12.0011 18.9491 11.9219 19.1401 11.7811 19.281C11.6403 19.4218 11.4493 19.5009 11.2501 19.5009C11.051 19.5009 10.8599 19.4218 10.7191 19.281L3.96912 12.531C3.89928 12.4613 3.84386 12.3785 3.80605 12.2874C3.76824 12.1963 3.74878 12.0986 3.74878 12C3.74878 11.9013 3.76824 11.8036 3.80605 11.7125C3.84386 11.6214 3.89928 11.5386 3.96912 11.469L10.7191 4.71897C10.8599 4.57814 11.051 4.49902 11.2501 4.49902C11.4493 4.49902 11.6403 4.57814 11.7811 4.71897C11.9219 4.8598 12.0011 5.05081 12.0011 5.24997C12.0011 5.44913 11.9219 5.64014 11.7811 5.78097L5.56062 12Z"
                fill="black"
              />
            </svg>
            <span class="mobile-menu__back-text"></span>
          </button>
        </div>
        <!-- Mobile Navigation - Same menuItems source -->
        <nav class="mobile-nav px-12" aria-label="Mobile navigation">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.routeName"
            :to="item.path"
            class="mobile-nav__link"
            :class="{
              'mobile-nav__link--active': currentRoute === item.routeName,
            }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- Mobile Actions -->
        <div class="mobile-actions">
          <NuxtLink
            to="/tickets"
            class="mobile-tickets-link"
            @click="closeMobileMenu"
          >
            Get Tickets
          </NuxtLink>
          <button class="mobile-donate-btn">Donate</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Base Header Styles */
.header {
  @apply bg-white px-3 py-4 2xl:px-32 md:px-[3em] md:py-4 flex items-center justify-center sticky top-0 z-50 shadow-sm;
}

.header__container {
  @apply w-full flex max-w-[90em] justify-between items-center;
}

/* Logo */
.header__logo {
  @apply flex-shrink-0;
}

.logo-image {
  @apply h-10 md:h-12 w-auto; /* Adjust height as needed for your logo */
}

.logo-text {
  @apply font-bold text-2xl text-[#D90000];
}

/* Desktop Navigation - Centered using justify-between */
.desktop-nav {
  @apply hidden md:flex justify-center flex-1 mx-8;
}

.nav-link {
  @apply text-gray-800 font-medium py-2 px-4 transition-colors duration-200 relative;
}

.nav-link:hover {
  @apply text-[#D90000];
}

.nav-link--active {
  @apply text-[#D90000];
}

.nav-link--active::after {
  content: "";
  @apply absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-[#D90000];
}

/* Header Actions */
.header__actions {
  @apply flex items-center justify-end gap-1 md:gap-6;
}

.tickets-link {
  @apply text-[#D90000] font-medium hidden md:block transition-opacity duration-200;
}

.tickets-link:hover {
  @apply opacity-80;
}

.donate-btn {
  @apply bg-[#D90000] text-white px-4 py-2 md:px-6 md:py-3 font-bold transition-all duration-200;
}

.donate-btn:hover {
  @apply bg-[#B80000] transform scale-105;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  @apply md:hidden p-2 transition-colors duration-200;
}

.mobile-menu-toggle:hover {
  @apply font-bold rounded;
}

.menu-icon,
.close-icon {
  @apply transition-transform duration-200;
}

.mobile-menu-toggle:hover .menu-icon {
  @apply transform scale-110;
}

.mobile-menu-toggle:hover .close-icon {
  @apply transform scale-110;
}

/* Mobile Menu Overlay */
.mobile-menu {
  @apply fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out;
  transform: translateX(-100%);
}

.mobile-menu--open {
  transform: translateX(0);
}

.mobile-menu__content {
  @apply h-full flex flex-col pt-10 pb-10;
}

/* Mobile Menu Header with Back Arrow */
.mobile-menu__header {
  @apply pb-0 mb-0;
}

.mobile-menu__back-btn {
  @apply flex items-center gap-3 px-6 py-0 text-gray-700 transition-colors duration-200;
}

.mobile-menu__back-btn:hover {
  @apply text-[#D90000] bg-gray-50;
}

.back-arrow {
  @apply transition-transform duration-200;
}

.mobile-menu__back-btn:hover .back-arrow {
  @apply transform -translate-x-1;
}

.mobile-menu__back-text {
  @apply font-medium text-lg;
}

/* Mobile Navigation */
.mobile-nav {
  @apply flex flex-col gap-0 flex-1;
}

.mobile-nav__link {
  @apply text-[1.2rem] font-bold text-gray-800 transition-colors duration-200 py-4 px-4 pt-5 border-b border-gray-400 text-right;
}

.mobile-nav__link:hover {
  @apply text-[#D90000];
}

.mobile-nav__link--active {
  @apply text-[#D90000];
}

/* Mobile Actions */
.mobile-actions {
  @apply flex flex-col gap-4 px-6 border-t border-gray-200;
}

.mobile-tickets-link {
  @apply text-[#D90000] font-medium text-lg transition-opacity duration-200 text-center py-3;
}

.mobile-tickets-link:hover {
  @apply opacity-80 bg-gray-50 rounded;
}

.mobile-donate-btn {
  @apply bg-[#D90000] text-white px-8 py-4 font-bold transition-all duration-200;
}

.mobile-donate-btn:hover {
  @apply bg-[#B80000] transform scale-105;
}

/* Focus styles for accessibility */
.nav-link:focus,
.tickets-link:focus,
.donate-btn:focus,
.mobile-menu-toggle:focus,
.mobile-nav__link:focus,
.mobile-tickets-link:focus,
.mobile-donate-btn:focus,
.mobile-menu__back-btn:focus {
  @apply outline-2 outline-offset-2 outline-[#D90000];
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .mobile-menu {
    transition: none;
  }

  .nav-link,
  .tickets-link,
  .donate-btn,
  .mobile-nav__link,
  .mobile-tickets-link,
  .mobile-donate-btn,
  .mobile-menu__back-btn {
    transition: none;
  }
}

/* Large desktop screens */
@media (min-width: 1280px) {
  .desktop-nav {
    @apply mx-16;
  }

  .nav-link {
    @apply px-6;
  }

  .logo-image {
    @apply h-14; /* Larger logo on big screens */
  }
}

/* Small mobile screens */
@media (max-width: 640px) {
  .logo-image {
    @apply h-8; /* Smaller logo on mobile */
  }
}
</style>
