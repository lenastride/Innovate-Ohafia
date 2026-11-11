export type ShareableEvent = {
  id: string | number
  title: string
  description?: string
  image?: string
  imageAlt?: string
  date?: string
  time?: string
  location?: string
  organizer?: string
}

export type ShareTarget = {
  name: string
  label: string
  href: string
}

const DEFAULT_SITE_URL = 'https://innovateohafia.com'

/**
 * Sharing helpers for events. The native Web Share API is preferred because it
 * opens the OS share sheet with every social platform installed on the device
 * and supports sharing the event image as a file. A share dialog with direct
 * links to the major social platforms is used as a fallback (mostly desktop).
 */
export const useShare = () => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, '')

  const resolveAbsoluteUrl = (path: string): string => {
    if (!path) return ''
    if (/^https?:\/\//i.test(path)) return path
    const base = import.meta.client ? window.location.origin : siteUrl
    try {
      return new URL(path, `${base}/`).href
    } catch {
      return path
    }
  }

  const eventShareUrl = (event: ShareableEvent): string => {
    return resolveAbsoluteUrl(`/events/${event.id}`)
  }

  const eventImageUrl = (event: ShareableEvent): string => {
    return event.image ? resolveAbsoluteUrl(event.image) : ''
  }

  const buildEventShareText = (event: ShareableEvent): string => {
    const lines: string[] = [event.title]
    if (event.description) {
      lines.push('', event.description)
    }
    const details: string[] = []
    if (event.date) details.push(`Date: ${event.date}`)
    if (event.time) details.push(`Time: ${event.time}`)
    if (event.location) details.push(`Venue: ${event.location}`)
    if (event.organizer) details.push(`Organizer: ${event.organizer}`)
    if (details.length) {
      lines.push('', details.join(' | '))
    }
    return lines.join('\n')
  }

  const imageCandidates = (event: ShareableEvent): string[] => {
    const direct = eventImageUrl(event)
    if (!direct) return []
    const candidates: string[] = []
    if (/^https?:\/\//i.test(direct) && event.id !== '') {
      // Remote images can be blocked by CORS in the browser; route them
      // through our own origin so they can always be fetched.
      candidates.push(`/api/events/${encodeURIComponent(String(event.id))}/image`)
    }
    candidates.push(direct)
    return candidates
  }

  const fetchImageBlob = async (event: ShareableEvent): Promise<Blob | null> => {
    for (const candidate of imageCandidates(event)) {
      try {
        const response = await fetch(candidate)
        if (!response.ok) continue
        const blob = await response.blob()
        if (blob.size > 0 && blob.type.startsWith('image/')) return blob
      } catch {
        // Try the next candidate.
      }
    }
    return null
  }

  const imageFileName = (event: ShareableEvent, type: string): string => {
    const slug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'event'
    const extension = type.split('/')[1]?.replace(/[^a-z0-9]/gi, '') || 'png'
    return `${slug}.${extension}`
  }

  const fetchImageFile = async (event: ShareableEvent): Promise<File | null> => {
    const blob = await fetchImageBlob(event)
    if (!blob) return null
    return new File([blob], imageFileName(event, blob.type), { type: blob.type })
  }

  const downloadEventImage = async (event: ShareableEvent): Promise<boolean> => {
    if (!import.meta.client) return false
    const blob = await fetchImageBlob(event)
    if (!blob) return false
    const objectUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = objectUrl
    anchor.download = imageFileName(event, blob.type)
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000)
    return true
  }

  const shareEvent = async (
    event: ShareableEvent,
    options: { url?: string; onFallback?: () => void } = {},
  ): Promise<void> => {
    const url = options.url || eventShareUrl(event)
    const text = buildEventShareText(event)

    if (!import.meta.client || typeof navigator === 'undefined' || !navigator.share) {
      options.onFallback?.()
      return
    }

    let imageFile: File | null = null
    if (typeof navigator.canShare === 'function') {
      imageFile = await fetchImageFile(event)
      if (imageFile && !navigator.canShare({ files: [imageFile] })) {
        imageFile = null
      }
    }

    try {
      if (imageFile) {
        // The url field is not supported together with files, so the link is
        // appended to the shared text instead.
        await navigator.share({
          files: [imageFile],
          title: event.title,
          text: `${text}\n${url}`,
        })
      } else {
        await navigator.share({ title: event.title, text, url })
      }
    } catch (error) {
      // AbortError means the user dismissed the share sheet.
      if ((error as DOMException)?.name !== 'AbortError') {
        options.onFallback?.()
      }
    }
  }

  const shareTargets = (event: ShareableEvent, url?: string): ShareTarget[] => {
    const link = url || eventShareUrl(event)
    const text = buildEventShareText(event)
    const fullText = `${text}\n${link}`

    return [
      {
        name: 'facebook',
        label: 'Facebook',
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
      },
      {
        name: 'x',
        label: 'X (Twitter)',
        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(link)}`,
      },
      {
        name: 'whatsapp',
        label: 'WhatsApp',
        href: `https://wa.me/?text=${encodeURIComponent(fullText)}`,
      },
      {
        name: 'linkedin',
        label: 'LinkedIn',
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
      },
      {
        name: 'telegram',
        label: 'Telegram',
        href: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(event.title)}`,
      },
      {
        name: 'email',
        label: 'Email',
        href: `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(fullText)}`,
      },
    ]
  }

  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!import.meta.client) return false
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return true
      }
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const copied = document.execCommand('copy')
      document.body.removeChild(textarea)
      return copied
    } catch {
      return false
    }
  }

  return {
    shareEvent,
    shareTargets,
    buildEventShareText,
    eventShareUrl,
    eventImageUrl,
    copyToClipboard,
    downloadEventImage,
  }
}
