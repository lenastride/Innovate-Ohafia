/**
 * Serves an event's image/flyer through the app's own origin. This lets the
 * browser fetch remote event images (e.g. Supabase Storage) without CORS
 * issues so they can be attached to native Web Share (image files) or
 * downloaded from the share dialog.
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing event id' })
  }

  const events = await fetchPublishedEvents({ id: `eq.${encodeURIComponent(id)}`, limit: '1' })
  const found = events[0]

  if (!found?.image) {
    throw createError({ statusCode: 404, statusMessage: 'Event image not found' })
  }

  if (/^https?:\/\//i.test(found.image)) {
    const upstream = await fetch(found.image)
    if (!upstream.ok) {
      throw createError({ statusCode: 502, statusMessage: 'Unable to fetch event image' })
    }

    setResponseHeaders(event, {
      'content-type': upstream.headers.get('content-type') || 'image/jpeg',
      'cache-control': 'public, max-age=3600',
    })

    return Buffer.from(await upstream.arrayBuffer())
  }

  // Relative paths point at static assets in /public; let the client fetch
  // them directly.
  return sendRedirect(event, found.image, 307)
})
