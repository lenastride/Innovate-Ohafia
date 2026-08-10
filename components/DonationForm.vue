<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import {
  useDonation,
  donationPresets,
  donationMinimums,
  currencySymbols,
  formatCurrency,
  supportedDonationCurrencies,
  getDefaultDonationCurrency,
  type DonationCurrency,
} from '~/composables/useDonation';

const { beginDonation, errorMessage, isSubmitting } = useDonation();
const selectedCurrency = ref<DonationCurrency>(getDefaultDonationCurrency());
const currencyOptions = supportedDonationCurrencies;
const selectedAmount = ref<number | null>(donationPresets[selectedCurrency.value][0] ?? null);
const customAmount = ref('');
const form = reactive({ name: '', email: '', phoneNumber: '' });

const amount = computed(() => selectedAmount.value ?? Number(customAmount.value));
const minAmount = computed(() => donationMinimums[selectedCurrency.value]);
const currencySymbol = computed(() => currencySymbols[selectedCurrency.value]);

watch(selectedCurrency, (currency) => {
  customAmount.value = '';
  selectedAmount.value = donationPresets[currency][0] ?? null;
});

const selectAmount = (value: number) => {
  selectedAmount.value = value;
  customAmount.value = '';
};
const useCustomAmount = () => {
  selectedAmount.value = null;
};
const sanitizePhoneNumber = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const phoneNumber = input.value.replace(/[^\d+\s()\-]/g, '');

  input.value = phoneNumber;
  form.phoneNumber = phoneNumber.trim();
};
const submit = () => beginDonation({ amount: amount.value, ...form }, selectedCurrency.value);
</script>

<template>
  <form class="donation-form" @submit.prevent="submit">
    <fieldset class="space-y-4">
      <legend class="donation-form__label">Choose a currency and amount</legend>
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="block font-bold mb-2">Currency</span>
          <select v-model="selectedCurrency" class="donation-input w-full">
            <option v-for="currency in currencyOptions" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <button
          v-for="preset in donationPresets[selectedCurrency]"
          :key="preset"
          type="button"
          class="donation-amount"
          :class="{ 'donation-amount--selected': selectedAmount === preset }"
          @click="selectAmount(preset)"
        >
          {{ formatCurrency(preset, selectedCurrency) }}
        </button>
      </div>
      <label class="block relative">
        <span class="sr-only">Custom donation amount in selected currency</span>
        <span class="donation-input__prefix pr-5">{{ currencySymbol }}</span>
        <input
          v-model="customAmount"
          type="number"
          :min="minAmount"
          max="10000000"
          step="1"
          inputmode="decimal"
          class="donation-input donation-input--amount pl-5"
          :placeholder="`...Or enter another amount in ${selectedCurrency}`"
          @focus="useCustomAmount"
        />
      </label>
    </fieldset>

    <div class="grid gap-4 sm:grid-cols-2">
      <label class="donation-field">
        <span>Full name</span>
        <input v-model.trim="form.name" id="name" required maxlength="100" autocomplete="name" class="donation-input" placeholder="Your full name" />
      </label>
      <label class="donation-field">
        <span>Email address</span>
        <input v-model.trim="form.email" id="email" required type="email" autocomplete="email" class="donation-input" placeholder="you@example.com" />
      </label>
    </div>
    <label class="donation-field">
      <span>Phone number <em>(optional)</em></span>
      <input :value="form.phoneNumber" id="phoneNumber" maxlength="25" type="tel" inputmode="tel" autocomplete="tel" pattern="[\d\s+()-]*" class="donation-input" placeholder="+234 800 000 0000" @input="sanitizePhoneNumber" />
    </label>

    <p v-if="errorMessage" class="donation-error" role="alert">{{ errorMessage }}</p>
    <button type="submit" class="donation-submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Taking you to secure checkout…' : `Donate ${amount ? formatCurrency(amount, selectedCurrency) : ''}` }}
    </button>
    <p class="donation-security">Payments are securely processed by Flutterwave. We do not store your card or bank details.</p>
  </form>
</template>

<style scoped lang="postcss">
.donation-form { @apply bg-white p-6 sm:p-8 shadow-xl space-y-6; }
.donation-form__label, .donation-field > span { @apply block font-bold  mb-2; }
.donation-field em { @apply not-italic font-normal text-slate-500; }
.donation-amount { @apply border-2 border-slate-200 py-3 font-bold  transition hover:border-[#D90000]; }
.donation-amount--selected { @apply border-[#D90000] bg-red-50 text-[#D90000]; }
.donation-input { @apply w-full border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#D90000] focus:ring-2 focus:ring-red-100; }
.donation-input--amount { @apply pl-10; }
.donation-input__prefix { @apply absolute mt-3 ml-4 text-slate-500; }
.donation-submit { @apply w-full bg-[#D90000] px-5 py-4 font-bold text-white transition hover:bg-[#b80000] disabled:cursor-not-allowed disabled:opacity-60; }
.donation-error { @apply border-l-4 border-[#D90000] bg-red-50 px-4 py-3 text-sm text-red-800; }
.donation-security { @apply text-center text-sm leading-6 text-slate-500; }
</style>
