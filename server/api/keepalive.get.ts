import { timingSafeEqual } from 'node:crypto'

const secureEqual = (provided: string, expected: string) => {
  const providedBuffer = Buffer.from(provided)
  const expectedBuffer = Buffer.from(expected)

  if (providedBuffer.length !== expectedBuffer.length) {
    return false
  }

  return timingSafeEqual(providedBuffer, expectedBuffer)
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { supabaseUrl, supabaseKey, keepaliveToken, communityMembersTable } = config

  if (!keepaliveToken || !supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 503, statusMessage: 'Keep-alive is not configured.' })
  }

  const authorization = getHeader(event, 'authorization') || ''
  const providedToken = authorization.replace(/^Bearer\s+/i, '')

  if (!providedToken || !secureEqual(providedToken, keepaliveToken)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' })
  }

  const possibleTables = Array.from(new Set([communityMembersTable, 'community_members', 'members']))
  let lastStatus = 0
  let lastErrorBody = ''

  for (const tableName of possibleTables) {
    const membersUrl = new URL(`/rest/v1/${encodeURIComponent(tableName)}`, supabaseUrl)
    membersUrl.searchParams.set('select', 'id')
    membersUrl.searchParams.set('limit', '1')

    try {
      const response = await fetch(membersUrl, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      })

      if (response.ok) {
        await response.arrayBuffer()
        return { ok: true, checkedAt: new Date().toISOString() }
      }

      lastStatus = response.status
      lastErrorBody = await response.text()
      if (lastStatus !== 404) {
        break
      }
    } catch (error) {
      lastErrorBody = error instanceof Error ? error.message : String(error)
      break
    }
  }

  console.error('[keepalive] Supabase ping failed', lastStatus, lastErrorBody)
  throw createError({ statusCode: 502, statusMessage: 'Keep-alive ping failed.' })
})
