type ResendWebhookPayload = {
  from?: { name?: string; address?: string }
  to?: Array<{ name?: string; address?: string }> | string | string[]
  subject?: string
  html?: string
  text?: string
  attachments?: Array<{ filename?: string; contentType?: string; size?: number }>
}

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}[character] as string))

const normalizeAddresses = (value: unknown): string[] => {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      if (typeof item === 'string') return [item.trim().toLowerCase()]
      if (item && typeof item === 'object' && 'address' in item && item.address) return [String(item.address).trim().toLowerCase()]
      return []
    })
  }

  if (typeof value === 'string') return [value.trim().toLowerCase()]
  if (typeof value === 'object' && value && 'address' in value && value.address) return [String(value.address).trim().toLowerCase()]
  return []
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const {
    resendApiKey,
    resendWebhookSecret,
    resendForwardFromAddress,
    resendForwardTo,
  } = config

  const webhookSecret = getRequestHeader(event, 'resend-webhook-secret')
  if (resendWebhookSecret && webhookSecret !== resendWebhookSecret) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  if (!resendApiKey) {
    throw createError({ statusCode: 503, statusMessage: 'Resend is not configured.' })
  }

  const payload = await readBody<ResendWebhookPayload>(event)
  const senderEmail = payload.from?.address?.trim().toLowerCase()
  const senderName = payload.from?.name?.trim() || 'Website Visitor'
  const toAddresses = normalizeAddresses(payload.to)
  const inboundAddress = 'hi@innovateohafia.com'

  if (!senderEmail) {
    throw createError({ statusCode: 400, statusMessage: 'Sender email address is missing.' })
  }

  if (!toAddresses.includes(inboundAddress)) {
    return { received: true, skipped: true, reason: 'Not sent to hi@innovateohafia.com' }
  }

  const subject = payload.subject?.trim() || 'New inbound message'
  const rawText = payload.text?.trim() || ''
  const rawHtml = payload.html?.trim() || ''
  const attachmentCount = payload.attachments?.length || 0

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="background-color: #f8f9fa; padding: 18px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
        <p style="margin: 4px 0;"><strong>From:</strong> ${escapeHtml(senderName)} (${escapeHtml(senderEmail)})</p>
        <p style="margin: 4px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p style="margin: 10px 0 0; color: #6b7280; font-size: 13px;">
          💡 Reply to this email in Gmail and your response will go directly to the customer.
        </p>
      </div>
      <div style="padding: 10px 0;">
        ${rawHtml || `<pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(rawText || 'No message content provided.')}</pre>`}
      </div>
      ${attachmentCount > 0 ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #6b7280; font-size: 13px; margin: 0;">
          📎 This inbound email includes ${attachmentCount} attachment(s). Resend forwards attachments separately if you want to include them in the forwarded email.
        </p>
      ` : ''}
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
        This message was forwarded automatically from hi@innovateohafia.com.
      </p>
    </div>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `"${senderName} via Innovate Ohafia" <${resendForwardFromAddress}>`,
      to: [resendForwardTo],
      subject: `[Forwarded] ${subject}`,
      replyTo: senderEmail,
      html: emailHtml,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('[resend/webhook] forward failed', response.status, errorBody)
    throw createError({ statusCode: 502, statusMessage: 'Could not forward inbound email.' })
  }

  const responseData = await response.json()
  return { success: true, forwarded: true, id: responseData?.id }
})
