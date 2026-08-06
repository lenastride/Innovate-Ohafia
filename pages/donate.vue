<script setup lang="ts">
useSeoMeta({
  title: 'Donate',
  description: 'Support Innovate Ohafia as we equip young people with technology skills and opportunity.',
  ogTitle: 'Donate to Innovate Ohafia',
  ogDescription: 'Help empower the next generation of innovators in Ohafia.',
  ogImage: '/og-image.jpg',
});
useHead({ link: [{ rel: 'canonical', href: 'https://www.innovateohafia.com/donate' }] });
</script>

<template>
  <main>
    <section class="donation-hero">
      <div class="donation-hero__content">
        <p class="donation-eyebrow">Fuel the future</p>
        <h1>Invest in an <span>innovative</span> Ohafia.</h1>
        <p>Every donation helps young people access practical technology education, creative spaces, and paths to meaningful work.</p>
      </div>
    </section>
    <section class="donation-section">
      <div class="donation-grid">
        <div class="donation-copy">
          <p class="donation-eyebrow">Make a difference today</p>
          <h2>Your support creates opportunity that lasts.</h2>
          <p>We are building a community where young people can learn, create, and lead with confidence. Choose a one-time amount and complete your gift through our secure checkout.</p>
          <div class="donation-impact">
            <div><strong>Learn</strong><span>Access to digital skills and mentorship.</span></div>
            <div><strong>Create</strong><span>Tools and spaces for bold new ideas.</span></div>
            <div><strong>Grow</strong><span>More pathways to local opportunity.</span></div>
          </div>
        </div>
        <DonationForm />
      </div>
    </section>
  </main>
</template>

<style scoped>
.donation-hero { @apply bg-[#004873] bg-cover bg-center px-5 py-20 text-white md:px-12 md:py-28; background-image: linear-gradient(90deg, rgba(0,72,115,.96), rgba(0,72,115,.72)), url('/hero-background.png'); }
.donation-hero__content, .donation-grid { @apply mx-auto w-full max-w-6xl; }
.donation-hero__content { @apply max-w-3xl; }
.donation-eyebrow { @apply mb-3 font-bold uppercase tracking-[.18em] text-[#D90000] text-sm; }
.donation-hero h1 { @apply text-4xl font-bold leading-tight md:text-6xl; }
.donation-hero h1 span { @apply text-[#ff8383]; }
.donation-hero p:last-child { @apply mt-5 max-w-2xl text-lg leading-8 text-slate-100; }
.donation-section { @apply bg-slate-50 px-5 py-16 md:px-12 md:py-24; }
.donation-grid { @apply grid items-start gap-12 lg:grid-cols-2; }
.donation-copy h2 { @apply text-3xl font-bold leading-tight  md:text-4xl; }
.donation-copy > p:not(.donation-eyebrow) { @apply mt-5 max-w-xl leading-8 text-slate-600; }
.donation-impact { @apply mt-8 space-y-5 border-l-2 border-[#D90000] pl-5; }
.donation-impact div { @apply flex flex-col; }
.donation-impact strong { @apply text-lg ; }
.donation-impact span { @apply mt-1 text-slate-600; }
/* text-[#004873] */
</style>
