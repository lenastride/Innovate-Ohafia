<script setup lang="ts">
defineProps<{
  title: string
  description: string
  lastUpdated: string
  content: string
}>()
</script>

<template>
  <main>
    <section class="policy-hero">
      <div class="policy-hero__inner">
        <p class="policy-eyebrow">Legal</p>
        <h1>{{ title }}</h1>
        <p class="policy-hero__description">{{ description }}</p>
        <p class="policy-hero__updated">Last updated: {{ lastUpdated }}</p>
      </div>
    </section>

    <section class="policy-body">
      <div class="policy-body__inner">
        <MarkdownContent :content="content" />
        <div class="policy-body__footer">
          <p>
            Questions about this policy?
            <a href="mailto:hi@innovateohafia.com">Get in touch with us</a>.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.policy-hero {
  @apply bg-[#004873] bg-cover bg-center px-5 py-20 text-white md:px-12 md:py-24;
  background-image: linear-gradient(90deg, rgba(0, 72, 115, 0.96), rgba(0, 72, 115, 0.72)), url('/hero-background.png');
}
.policy-hero__inner {
  @apply mx-auto w-full max-w-4xl;
}
.policy-eyebrow {
  @apply mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#ff8383];
}
.policy-hero h1 {
  @apply text-4xl font-bold leading-tight md:text-5xl;
}
.policy-hero__description {
  @apply mt-5 max-w-2xl text-lg leading-8 text-slate-100;
}
.policy-hero__updated {
  @apply mt-6 text-sm text-slate-300;
}
.policy-body {
  @apply bg-white px-5 py-16 md:px-12 md:py-20;
}
.policy-body__inner {
  @apply mx-auto w-full max-w-4xl;
}
.policy-body :deep(h2) {
  @apply mt-10 border-b border-slate-200 pb-2 text-2xl text-[#004873] first:mt-0;
}
.policy-body :deep(p) {
  @apply text-slate-700;
}
.policy-body__footer {
  @apply mt-12 border-t border-slate-200 pt-6 text-slate-600;
}
.policy-body__footer a {
  @apply font-semibold text-[#D90000] hover:underline;
}
</style>
