<script setup lang="ts">
const isOpen = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');
const joined = ref(false);
const form = reactive({ firstName: '', lastName: '', email: '', phoneNumber: '' });

const sanitizePhoneNumber = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const phoneNumber = input.value.replace(/[^\d+\s()-]/g, '');

  input.value = phoneNumber;
  form.phoneNumber = phoneNumber.trim();
};

const open = () => {
  isOpen.value = true;
  joined.value = false;
  errorMessage.value = '';
};

const close = () => {
  if (!isSubmitting.value) isOpen.value = false;
};

const submit = async () => {
  errorMessage.value = '';
  isSubmitting.value = true;

  try {
    await $fetch('/api/community/join', {
      method: 'POST',
      body: form,
    });
    joined.value = true;
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'We are still setting up things. Please try again later.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section class="mt-5 flex flex-col items-center justify-center gap-4 bg-[url(/hero-background.png)] px-[1em] py-[2em] text-white">
    <h2 class="text-center text-2xl font-bold">Join the Innovate Ohafia community</h2>
    <button type="button" class="bg-[#D90000] px-4 py-2 font-bold" @click="open">Join the community</button>
  </section>

  <Teleport to="body">
    <Transition name="community-modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" role="presentation">
        <section class="community-modal__panel relative w-full max-w-lg bg-white p-6 text-slate-900 shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="join-community-title">
          <button type="button" class="absolute right-4 top-3 text-3xl leading-none text-slate-500 hover:text-slate-900" aria-label="Close join community form" @click="close">&times;</button>

        <template v-if="joined">
          <h2 id="join-community-title" class="pr-8 text-2xl font-bold ">Welcome to the community!</h2>
          <p class="mt-3 leading-6">Please check your email for your welcome message and WhatsApp group link.</p>
          <button type="button" class="mt-6 bg-[#D90000] px-5 py-3 font-bold text-white" @click="close">Done</button>
        </template>

        <template v-else>
          <h2 id="join-community-title" class="pr-8 text-2xl font-bold ">Join the community</h2>
          <p class="mt-2 text-slate-600">Get updates and connect with Innovate Ohafia members.</p>

          <form class="mt-6 space-y-4" @submit.prevent="submit">
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block font-semibold ">
                First name
                <input v-model.trim="form.firstName" id="first_name" required maxlength="50" autocomplete="given-name" class="mt-1 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#D90000] focus:ring-2 focus:ring-red-100" />
              </label>
              <label class="block font-semibold ">
                Last name
                <input v-model.trim="form.lastName" id="last_name" required maxlength="50" autocomplete="family-name" class="mt-1 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#D90000] focus:ring-2 focus:ring-red-100" />
              </label>
            </div>
            <label class="block font-semibold ">
              Email address
              <input v-model.trim="form.email" id="email" required type="email" maxlength="254" autocomplete="email" class="mt-1 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#D90000] focus:ring-2 focus:ring-red-100" placeholder="you@example.com" />
            </label>
            <label class="block font-semibold ">
              Phone number
              <input :value="form.phoneNumber" id="phone" required type="tel" inputmode="tel" maxlength="25" autocomplete="tel" pattern="[\d\s+()-]*" class="mt-1 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#D90000] focus:ring-2 focus:ring-red-100" placeholder="+234 800 000 0000" @input="sanitizePhoneNumber" />
            </label>
            <p v-if="errorMessage" class="border-l-4 border-[#D90000] bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">{{ errorMessage }}</p>
            <button type="submit" class="w-full bg-[#D90000] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60" :disabled="isSubmitting">
              {{ isSubmitting ? 'Joining…' : 'Join the community' }}
            </button>
          </form>
        </template>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.community-modal-enter-active,
.community-modal-leave-active {
  transition: opacity 200ms ease;
}

.community-modal-enter-active .community-modal__panel,
.community-modal-leave-active .community-modal__panel {
  transition: opacity 200ms ease, transform 200ms ease;
}

.community-modal-enter-from,
.community-modal-leave-to {
  opacity: 0;
}

.community-modal-enter-from .community-modal__panel,
.community-modal-leave-to .community-modal__panel {
  opacity: 0;
  transform: translateY(0.75rem) scale(0.97);
}
</style>
