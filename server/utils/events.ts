export type PublicEvent = {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  imageAlt: string
  date: string
  time: string
  location: string
  organizer: string
}

type EventRow = {
  id: string
  title: string
  description: string
  full_description: string | null
  image: string | null
  image_alt: string | null
  event_date: string | null
  event_time: string | null
  location: string | null
  organizer: string | null
  published: boolean
  sort_order: number
}

const FALLBACK_IMAGE = '/about_page_hero.png'

function mapEvent(row: EventRow): PublicEvent {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    fullDescription: row.full_description?.trim() || row.description,
    image: row.image?.trim() || FALLBACK_IMAGE,
    imageAlt: row.image_alt?.trim() || row.title,
    date: row.event_date?.trim() || '',
    time: row.event_time?.trim() || '',
    location: row.location?.trim() || '',
    organizer: row.organizer?.trim() || 'Innovate Ohafia',
  }
}

/**
 * Reads published events from Supabase. Returns an empty list when Supabase is
 * not configured or the request fails, so the website can fall back to the
 * built-in event content.
 */
export async function fetchPublishedEvents(
  filters: Record<string, string> = {},
): Promise<PublicEvent[]> {
  const config = useRuntimeConfig()
  const supabaseUrl = config.supabaseUrl
  const supabaseKey = config.supabaseKey

  if (!supabaseUrl || !supabaseKey) {
    return []
  }

  try {
    const url = new URL('/rest/v1/events', supabaseUrl)
    url.searchParams.set('select', '*')
    url.searchParams.set('published', 'eq.true')
    url.searchParams.set('order', 'sort_order.asc,created_at.desc')

    for (const [key, value] of Object.entries(filters)) {
      url.searchParams.set(key, value)
    }

    const headers: Record<string, string> = { apikey: supabaseKey }
    if (!supabaseKey.startsWith('sb_publishable_') && !supabaseKey.startsWith('sb_secret_')) {
      headers.Authorization = `Bearer ${supabaseKey}`
    }

    const response = await fetch(url, { headers })

    if (!response.ok) {
      console.error('[events] Supabase request failed', response.status, await response.text())
      return []
    }

    const rows = (await response.json()) as EventRow[]
    return Array.isArray(rows) ? rows.map(mapEvent) : []
  } catch (error) {
    console.error('[events] Supabase request error', error)
    return []
  }
}
