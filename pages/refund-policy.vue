<script setup lang="ts">
useSeoMeta({
  title: 'Refund Policy - Innovate Ohafia',
  description: 'Learn about the Innovate Ohafia refund policy, including the 24-hour window for requesting a refund on donations.',
  ogTitle: 'Refund Policy - Innovate Ohafia',
  ogDescription: 'Every donation has a 24-hour refund window. Learn how to request a refund from Innovate Ohafia.',
  ogImage: 'https://innovateohafia.com/og-image.png',
  ogUrl: 'https://innovateohafia.com/refund-policy',
  twitterTitle: 'Refund Policy - Innovate Ohafia',
  twitterDescription: 'Every donation has a 24-hour refund window. Learn how to request a refund from Innovate Ohafia.',
  twitterImage: 'https://innovateohafia.com/og-image.png'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://innovateohafia.com/refund-policy' }
  ]
})

const content = `
## 1. Overview

This Refund Policy explains how refunds are handled for donations and any other payments made through https://innovateohafia.com. We value the trust placed in us by our supporters and aim to handle every request fairly and transparently.

> **Please note:** Every donation has a 24-hour window within which it can be demanded back. After that window closes, the money cannot be paid back to the donor, and the donation is considered final.

## 2. Donations and the 24-Hour Refund Window

Every donation has 24 hours from the time it is made within which it may be demanded back. To be eligible, your refund request must reach us within that 24-hour window. Once the window has elapsed, the money cannot be paid back to the donor under any circumstances.

This is because confirmed donations are quickly put to work supporting our technology education, events, and community programmes. We are therefore only able to return a donation when the request is made within the 24-hour window.

## 3. How to Request a Refund

To request a refund within the 24-hour window, contact us with:

- Your full name and the email address used for the donation.
- The donation transaction reference or payment receipt.
- The date and amount of the donation.
- The reason for your request.

Send your request to hi@innovateohafia.com or call +234 706 514 9973. Please make sure your request is received within 24 hours of the donation being made.

## 4. How Refunds Are Processed

Approved refunds are returned to the original payment method through Flutterwave, our payment partner. The time it takes for the refunded amount to appear in your account depends on your bank or card provider and may take several business days. We do not charge a fee for processing refunds.

## 5. Failed, Pending, or Duplicate Payments

If a payment fails, remains pending, or is charged more than once due to a technical error, please contact us as soon as possible with your transaction reference so that we can investigate and resolve the issue.

## 6. Event Tickets

Refunds for event tickets, where applicable, are handled according to the terms stated at the time of purchase. Please contact us before the event date if you need to request a refund or transfer for a ticket.

## 7. Contact Us

If you have any questions about this Refund Policy or need to request a refund, please contact us:

- Email: hi@innovateohafia.com
- Phone: +234 706 514 9973
- Address: Ohafia, Abia State, Nigeria
`

const description = 'Every donation has a 24-hour window within which it can be demanded back, after which the money cannot be paid back to the donor.'
</script>

<template>
  <PolicyPage
    title="Refund Policy"
    :description="description"
    last-updated="17 November 2026"
    :content="content"
  />
</template>
