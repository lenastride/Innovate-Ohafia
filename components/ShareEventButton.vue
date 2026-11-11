<script setup lang="ts">
import type { PropType } from 'vue'
import type { ShareableEvent } from '~/composables/useShare'

const props = defineProps({
  event: {
    type: Object as PropType<ShareableEvent>,
    required: true
  },
  url: {
    type: String,
    default: ''
  },
  variant: {
    type: String as PropType<'button' | 'icon'>,
    default: 'button'
  },
  label: {
    type: String,
    default: 'Share Event'
  }
})

const { shareEvent, shareTargets, eventShareUrl, copyToClipboard, downloadEventImage } = useShare()

const showModal = ref(false)
const copied = ref(false)
const flyerDownloaded = ref(false)
let copiedTimeout: ReturnType<typeof setTimeout> | undefined
let flyerTimeout: ReturnType<typeof setTimeout> | undefined

const shareUrl = computed(() => props.url || eventShareUrl(props.event))
const targets = computed(() => shareTargets(props.event, shareUrl.value))

const brandIcons: Record<string, string> = {
  facebook:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  x:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>',
  whatsapp:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
  linkedin:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  telegram:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.191-.041-.274-.023c-.115.026-1.973 1.256-5.572 3.686-.527.362-.99.537-1.405.525-.466-.012-1.326-.25-1.98-.461-.8-.255-1.432-.39-1.408-.833.026-.451.644-.941 1.855-1.47 2.398-.981 4.088-1.616 5.07-1.904 2.384-.705 3.681-.83 4.55-.74.48.045.627.285.687.43z"/></svg>',
  email:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>'
}

const openShare = async () => {
  await shareEvent(props.event, {
    url: shareUrl.value,
    onFallback: () => {
      copied.value = false
      showModal.value = true
    }
  })
}

const closeShare = () => {
  showModal.value = false
}

const copyLink = async () => {
  const success = await copyToClipboard(shareUrl.value)
  if (success) {
    copied.value = true
    if (copiedTimeout) clearTimeout(copiedTimeout)
    copiedTimeout = setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

const downloadFlyer = async () => {
  const success = await downloadEventImage(props.event)
  if (success) {
    flyerDownloaded.value = true
    if (flyerTimeout) clearTimeout(flyerTimeout)
    flyerTimeout = setTimeout(() => {
      flyerDownloaded.value = false
    }, 2000)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeShare()
}

watch(showModal, (open) => {
  if (!import.meta.client) return
  if (open) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
  if (copiedTimeout) clearTimeout(copiedTimeout)
  if (flyerTimeout) clearTimeout(flyerTimeout)
})
</script>

<template>
  <button
    v-if="variant === 'button'"
    type="button"
    class="bg-gray-900 text-white font-bold px-6 py-3 inline-flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
    :aria-label="label"
    @click="openShare"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>
    {{ label }}
  </button>

  <button
    v-else
    type="button"
    class="absolute top-3 right-3 z-20 w-9 h-9 bg-white/95 text-[#D90000] rounded-full shadow-md flex items-center justify-center hover:bg-white hover:scale-110 transition-all"
    :aria-label="label"
    :title="label"
    @click.stop.prevent="openShare"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>
  </button>

  <Teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Share event"
    >
      <div class="absolute inset-0 bg-black/60" @click="closeShare" />

      <div class="relative bg-white w-full max-w-md shadow-2xl border border-gray-200 overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 class="text-xl font-bold text-gray-900">Share this event</h2>
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Close share dialog"
            @click="closeShare"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="event.image || event.title" class="flex gap-4 px-6 py-4 border-b border-gray-100">
          <img
            v-if="event.image"
            :src="event.image"
            :alt="event.imageAlt || event.title"
            class="w-20 h-20 object-cover border border-gray-200 flex-shrink-0"
          />
          <div class="min-w-0">
            <p class="font-bold text-gray-900">{{ event.title }}</p>
            <p v-if="event.date" class="text-sm text-gray-600 mt-1">{{ event.date }}</p>
            <p v-if="event.location" class="text-sm text-gray-600">{{ event.location }}</p>
          </div>
        </div>

        <div class="px-6 py-5">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Share to</p>
          <div class="grid grid-cols-3 gap-3">
            <a
              v-for="target in targets"
              :key="target.name"
              :href="target.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center gap-2 px-2 py-3 border border-gray-200 hover:border-[#D90000] hover:bg-red-50 transition-colors"
            >
              <span
                class="w-9 h-9 flex items-center justify-center bg-[#D90000] text-white rounded-full"
                v-html="brandIcons[target.name]"
              ></span>
              <span class="text-xs font-semibold text-gray-700 text-center">{{ target.label }}</span>
            </a>
          </div>

          <button
            type="button"
            class="mt-4 w-full flex items-center justify-center gap-2 border-2 border-[#D90000] text-[#D90000] font-bold px-4 py-3 hover:bg-red-50 transition-colors"
            @click="copyLink"
          >
            <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            {{ copied ? 'Link Copied!' : 'Copy Event Link' }}
          </button>

          <button
            v-if="event.image"
            type="button"
            class="mt-3 w-full flex items-center justify-center gap-2 text-gray-600 font-semibold text-sm py-2 hover:text-[#D90000] transition-colors"
            @click="downloadFlyer"
          >
            <svg v-if="flyerDownloaded" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            {{ flyerDownloaded ? 'Flyer Saved!' : 'Download flyer image' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
