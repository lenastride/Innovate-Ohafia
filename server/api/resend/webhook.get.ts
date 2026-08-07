export default defineEventHandler(() => {
  return {
    success: true,
    message: 'Resend webhook endpoint is active. Send POST requests to this URL to deliver inbound email events.',
  }
})
