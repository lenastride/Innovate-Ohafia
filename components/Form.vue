<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  email: '',
  fullName: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const success = ref(false)
const errorMessage = ref('')

const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const resetForm = () => {
  form.email = ''
  form.fullName = ''
  form.subject = ''
  form.message = ''
}

const submit = async () => {
  success.value = false
  errorMessage.value = ''

  if (!form.email.trim() || !isEmailValid(form.email.trim())) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  if (!form.fullName.trim()) {
    errorMessage.value = 'Please enter your full name.'
    return
  }

  if (!form.subject.trim()) {
    errorMessage.value = 'Please enter a subject for your message.'
    return
  }

  if (!form.message.trim()) {
    errorMessage.value = 'Please enter your message.'
    return
  }

  isSubmitting.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        email: form.email.trim(),
        fullName: form.fullName.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      },
    })

    resetForm()
    success.value = true
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'Something went wrong while sending your message. Please try again later.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="flex p-[1em] justify-center items-center flex-col md:p-[4em]">
    <form class="w-full flex flex-col justify-center items-center max-w-[90em]" @submit.prevent="submit">
      <div
        class="max-w-[50em] p-[1em] md:px-[8em] md:py-[5em] border-solid border-[1px] md:border-[2px] border-[#D90000] bg-cover bg-no-repeat w-full bg-[url(./form_bg.png)]"
      >
        <div class="flex justify-center items-center flex-col">
          <h1 class="font-bold text-[1.7rem] text-[#D90000]">Send a Message</h1>
          <p class="text-center">
            Send a Message We're here to help! Whether you have questions about
            our initiative, want to collaborate, or simply say hello, we'd love
            to hear from you.
          </p>
        </div>
        <div class="flex flex-col gap-2 pt-8 justify-center items-center">
          <div class="w-full flex gap-3 flex-col md:flex-row">
            <label class="w-full">
              <span class="sr-only">Email address</span>
              <input
                v-model.trim="form.email"
                type="email"
                placeholder="Email address"
                class="p-3 w-full border-[#D90000] border-solid border-[1px] md:border-2"
                id="email"
                required
              />
            </label>
            <label class="w-full">
              <span class="sr-only">Full Name</span>
              <input
                v-model.trim="form.fullName"
                type="text"
                placeholder="Full Name"
                class="p-3 w-full border-[#D90000] border-solid border-[1px] md:border-2"
                id="fullName"
                required
              />
            </label>
          </div>
          <div class="w-full">
            <label class="w-full">
              <span class="sr-only">Subject</span>
              <input
                v-model.trim="form.subject"
                type="text"
                placeholder="Subject"
                class="p-3 w-full border-[#D90000] border-solid border-[1px] border-2"
                id="subject"
                required
              />
            </label>
          </div>
          <div class="w-full">
            <label class="w-full">
              <span class="sr-only">Message</span>
              <textarea
                v-model.trim="form.message"
                class="p-3 w-full resize-none h-[13em] border-[#D90000] border-solid border-[1px] border-2"
                placeholder="Type your message here..."
                id="message"
                required
              ></textarea>
            </label>
          </div>
          <div class="w-full">
            <div v-if="errorMessage" class="mb-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
              {{ errorMessage }}
            </div>
            <div v-else-if="success" class="mb-4 rounded border border-green-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">
              Your message has been sent. We will get back to you shortly.
            </div>
          </div>
          <div class="w-full justify-center flex">
            <button
              class="bg-[#D90000] max-w-[15em] text-white font-bold w-full p-3 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Sending…' : 'Send Message' }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
