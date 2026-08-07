type ContactRequest = {
  email?: string
  fullName?: string
  subject?: string
  message?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}[character] as string))

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactRequest>(event)
  const email = body.email?.trim().toLowerCase()
  const fullName = body.fullName?.trim()
  const subject = body.subject?.trim()
  const message = body.message?.trim()

  if (!email || !emailPattern.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid email address.' })
  }

  if (!fullName || fullName.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide your full name.' })
  }

  if (!subject || subject.length > 150) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a subject (up to 150 characters).' })
  }

  if (!message || message.length > 2000) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a message (up to 2000 characters).' })
  }

  const config = useRuntimeConfig()
  const { resendApiKey, contactRecipientEmail, contactFromEmail } = config

  if (!resendApiKey) {
    throw createError({ statusCode: 503, statusMessage: 'Contact form is not configured. Please try again later.' })
  }

  const from = contactFromEmail || 'Innovate Ohafia <hi@lenastride.com>'
  const to = contactRecipientEmail || 'hi@lenastride.com'

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Contact form: ${subject}`,
      text: `New contact request from ${fullName} <${email}>\n\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `<p><strong>New contact request</strong></p><p><strong>Name:</strong> ${escapeHtml(fullName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
      headers: {
        'Reply-To': email,
      },
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('[contact] resend email failed', response.status, errorBody)
    throw createError({ statusCode: 502, statusMessage: 'We could not send your message. Please try again later.' })
  }

  return { success: true }
})
