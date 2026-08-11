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

const statusMeta = computed(() => {
  const defaultDescription = 'Please contact us if you need help confirming your payment.';

  return {
    verifying: {
      label: 'Please wait',
      title: 'Confirming your donation',
      description: 'We are securely verifying your payment with Flutterwave. This usually takes only a few moments.',
      buttonLabel: 'Return home',
      buttonLink: '/',
      showReference: !!txRef.value,
    },
    successful: {
      label: 'Donation confirmed',
      title: 'Thank you for your support',
      description: receipt.value
        ? `Your gift of ${formatCurrency(receipt.value.amount, receipt.value.currency)} is confirmed and will help empower the next generation of innovators in Ohafia.`
        : 'Your donation is confirmed. Thank you for supporting practical technology education and opportunity in Ohafia.',
      buttonLabel: 'Return home',
      buttonLink: '/',
      showReference: !!receipt.value?.reference || !!txRef.value,
    },
    pending: {
      label: 'Payment pending',
      title: 'Your transaction is still processing',
      description: 'Flutterwave is still finalizing the payment. We will update the status as soon as it is complete.',
      buttonLabel: 'Return home',
      buttonLink: '/',
      showReference: !!txRef.value,
    },
    cancelled: {
      label: 'Donation cancelled',
      title: 'Your donation was not completed',
      description: 'No payment was confirmed. You can start again when you are ready.',
      buttonLabel: 'Try again',
      buttonLink: '/donate',
      showReference: false,
    },
    failed: {
      label: 'Payment failed',
      title: 'Unable to complete your donation',
      description: 'The payment could not be processed. Please try again or reach out if the issue continues.',
      buttonLabel: 'Try again',
      buttonLink: '/donate',
      showReference: false,
    },
    unconfirmed: {
      label: 'Unconfirmed donation',
      title: 'We could not verify this payment',
      description: errorMessage.value || 'No payment was made, or the payment details were unavailable. Please try again when you are ready.',
      buttonLabel: 'Try again',
      buttonLink: '/donate',
      showReference: false,
    },
  }[callbackState.value];
});

const referenceText = computed(() => {
  if (receipt.value?.reference) return `Reference: ${receipt.value.reference}`;
  if (txRef.value) return `Reference: ${txRef.value}`;
  return '';
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
        <p class="status-hero__eyebrow">Payment status</p>
        <h1>Donation status</h1>
        <p>View the current outcome of your payment in one place.</p>
      </div>
    </section>

    <section class="status-content">
      <article class="status-card" aria-live="polite">
        <div class="status-card__accent" aria-hidden="true"></div>
        <div class="status-card__header">
          <p class="status-eyebrow">{{ statusMeta.label }}</p>
          <h2>{{ statusMeta.title }}</h2>
        </div>
        <p>{{ statusMeta.description }}</p>
        <p v-if="receipt && callbackState === 'successful'" class="status-note">Donor: {{ receipt.donor }}</p>
        <p v-if="statusMeta.showReference && referenceText" class="status-reference">{{ referenceText }}</p>
        <p v-if="errorMessage && callbackState === 'unconfirmed'" class="status-note">{{ errorMessage }}</p>
        <div class="status-actions">
          <NuxtLink :to="statusMeta.buttonLink" class="status-button">{{ statusMeta.buttonLabel }}</NuxtLink>
        </div>
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
.status-card__header { @apply space-y-4; }
.status-card h2 { @apply text-3xl font-bold leading-tight text-[#004873] md:text-4xl; }
.status-card > p:not(.status-eyebrow):not(.status-reference):not(.status-note) { @apply mt-5 max-w-2xl text-lg leading-8 text-slate-600; }
.status-note { @apply mt-4 text-sm text-slate-500; }
.status-reference { @apply mt-7 break-all border-l-2 border-[#D90000] pl-4 text-sm text-slate-500; }
.status-actions { @apply mt-8; }
.status-button { @apply inline-block bg-[#D90000] px-6 py-3 font-bold text-white transition hover:bg-[#b80000] focus:outline-none focus:ring-2 focus:ring-[#D90000] focus:ring-offset-2; }
</style>
