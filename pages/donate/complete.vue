<script setup lang="ts">
import { formatCurrency } from '~/composables/useDonation';
type DonationReceipt = { amount: number; currency: string; reference: string; donor: string };
const route = useRoute();
const paymentStatus = computed(() => typeof route.query.status === 'string' ? route.query.status.toLowerCase() : '');
const transactionId = computed(() => typeof route.query.transaction_id === 'string' ? route.query.transaction_id : '');
const txRef = computed(() => typeof route.query.tx_ref === 'string' ? route.query.tx_ref : '');
const receipt = ref<DonationReceipt | null>(null);
const errorMessage = ref('');
const isVerifying = ref(paymentStatus.value === 'successful' && !!transactionId.value && !!txRef.value);
const callbackState = computed(() => {
  if (isVerifying.value) return 'verifying';
  if (receipt.value) return 'successful';
  if (paymentStatus.value === 'pending') return 'pending';
  if (['cancelled', 'canceled'].includes(paymentStatus.value)) return 'cancelled';
  if (['failed', 'failure'].includes(paymentStatus.value)) return 'failed';
  return 'unconfirmed';
});

useSeoMeta({ title: 'Donation status', robots: 'noindex, nofollow' });

onMounted(async () => {
  if (!isVerifying.value) return;
  try {
    receipt.value = await $fetch<DonationReceipt>('/api/donations/verify', { query: { transaction_id: transactionId.value, tx_ref: txRef.value } });
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'We could not confirm this donation yet. Please contact us with your payment reference.';
  } finally {
    isVerifying.value = false;
  }
});
</script>

<template>
  <main class="status-page">
    <section class="status-hero">
      <div class="status-hero__content">
        <p class="status-hero__eyebrow">Giving back to Ohafia</p>
        <h1>Donation <span>Status</span></h1>
        <p>Thank you for supporting practical technology education, creative spaces, and opportunity for young people in Ohafia.</p>
      </div>
    </section>

    <section class="status-content">
      <article class="status-card" aria-live="polite">
        <div class="status-card__accent" aria-hidden="true"></div>
        <template v-if="callbackState === 'verifying'">
          <p class="status-eyebrow">Please wait</p><h2>Confirming your donation…</h2><p>We are securely verifying the payment with Flutterwave.</p>
        </template>
        <template v-else-if="callbackState === 'successful' && receipt">
          <p class="status-eyebrow">Thank you, {{ receipt.donor }}!</p><h2>Your donation is confirmed.</h2>
          <p>Your gift of <strong>{{ formatCurrency(receipt.amount, receipt.currency) }}</strong> will help empower the next generation of innovators in Ohafia.</p>
          <p class="status-reference">Reference: {{ receipt.reference }}</p>
          <NuxtLink to="/" class="status-button">Return home</NuxtLink>
        </template>
        <template v-else-if="callbackState === 'pending'">
          <p class="status-eyebrow">Donation pending</p><h2>Your payment is still processing.</h2>
          <p>We will confirm your donation once Flutterwave completes the payment. Please do not make another payment unless the first one fails.</p>
          <p v-if="txRef" class="status-reference">Reference: {{ txRef }}</p>
          <NuxtLink to="/" class="status-button">Return home</NuxtLink>
        </template>
        <template v-else-if="callbackState === 'cancelled'">
          <p class="status-eyebrow">Donation cancelled</p><h2>Your donation was cancelled.</h2>
          <p>No donation has been confirmed. You can safely try again whenever you are ready.</p>
          <NuxtLink to="/donate" class="status-button">Try again</NuxtLink>
        </template>
        <template v-else-if="callbackState === 'failed'">
          <p class="status-eyebrow">Donation unsuccessful</p><h2>We could not complete your donation.</h2>
          <p>Please try again or choose another payment method at checkout. You will only be charged for a confirmed donation.</p>
          <NuxtLink to="/donate" class="status-button">Try again</NuxtLink>
        </template>
        <template v-else>
          <p class="status-eyebrow">Donation not confirmed</p><h2>We could not confirm this donation.</h2>
          <p>{{ errorMessage || 'No payment was made. You can safely try again when you are ready.' }}</p>
          <NuxtLink to="/donate" class="status-button">Try again</NuxtLink>
        </template>
      </article>
    </section>
  </main>
</template>

<style scoped>
.status-hero { @apply bg-[#004873] bg-cover bg-center px-5 py-16 text-white md:px-12 md:py-20; background-image: linear-gradient(90deg, rgba(0, 72, 115, .96), rgba(0, 72, 115, .72)), url('/hero-background.png'); }
.status-hero__content { @apply mx-auto w-full max-w-6xl; }
.status-hero__eyebrow, .status-eyebrow { @apply mb-3 font-bold uppercase tracking-[.16em] text-sm text-[#ff8383]; }
.status-hero h1 { @apply text-4xl font-bold leading-tight md:text-5xl; }
.status-hero h1 span { @apply text-[#ff8383]; }
.status-hero__content > p:last-child { @apply mt-5 max-w-2xl text-lg leading-8 text-slate-100; }
.status-content { @apply bg-slate-50 px-5 py-16 md:px-12 md:py-24; }
.status-card { @apply relative mx-auto w-full max-w-3xl bg-white p-8 shadow-xl md:p-14; }
.status-card__accent { @apply absolute left-0 top-0 h-2 w-full bg-[#D90000]; }
.status-card h2 { @apply text-3xl font-bold leading-tight text-[#004873] md:text-4xl; }
.status-card > p:not(.status-eyebrow):not(.status-reference) { @apply mt-5 max-w-2xl text-lg leading-8 text-slate-600; }
.status-reference { @apply mt-7 break-all border-l-2 border-[#D90000] pl-4 text-sm text-slate-500; }
.status-button { @apply mt-8 inline-block bg-[#D90000] px-6 py-3 font-bold text-white transition hover:bg-[#b80000] focus:outline-none focus:ring-2 focus:ring-[#D90000] focus:ring-offset-2; }
</style>
