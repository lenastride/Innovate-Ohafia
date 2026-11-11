const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id || !uuidPattern.test(id)) {
    throw createError({ statusCode: 404, statusMessage: 'Event not found' })
  }

  const events = await fetchPublishedEvents({ id: `eq.${id}`, limit: '1' })
  const found = events[0]

  if (!found) {
    throw createError({ statusCode: 404, statusMessage: 'Event not found' })
  }

  return found
})
