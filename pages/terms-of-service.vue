<script setup lang="ts">
useSeoMeta({
  title: 'Terms of Service - Innovate Ohafia',
  description: 'Read the terms and conditions that govern your use of the Innovate Ohafia website, community registrations, event tickets, and donations.',
  ogTitle: 'Terms of Service - Innovate Ohafia',
  ogDescription: 'The terms and conditions that govern your use of the Innovate Ohafia website and services.',
  ogImage: 'https://innovateohafia.com/og-image.png',
  ogUrl: 'https://innovateohafia.com/terms-of-service',
  twitterTitle: 'Terms of Service - Innovate Ohafia',
  twitterDescription: 'The terms and conditions that govern your use of the Innovate Ohafia website and services.',
  twitterImage: 'https://innovateohafia.com/og-image.png'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://innovateohafia.com/terms-of-service' }
  ]
})

const content = `
## 1. Acceptance of Terms

By accessing or using https://innovateohafia.com (the "Site") and the services offered through it, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Site.

## 2. About Us

The Site is operated by Innovate Ohafia, a youth-focused technology initiative based in Ohafia, Abia State, Nigeria, designed by Lenastride ("we", "us", "our"). We use the Site to share information about our programmes and events, accept community registrations, and receive donations.

## 3. Use of the Site

You agree to use the Site only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use of the Site. You must not:

- Use the Site to distribute unlawful, harmful, or offensive content.
- Attempt to gain unauthorised access to the Site, its servers, or user data.
- Interfere with the proper functioning of the Site.
- Use automated means to scrape, mine, or extract data from the Site without our permission.
- Impersonate any person or organisation, or misrepresent your affiliation with us.

We may suspend or block access to the Site for anyone who violates these Terms.

## 4. Intellectual Property

All content on the Site, including text, graphics, logos, images, and software, is owned by us or our licensors and is protected by applicable intellectual property laws. You may view and share content for personal, non-commercial use, but you may not reproduce, modify, distribute, or commercially exploit it without our written permission.

## 5. Donations

Donations made through the Site are processed by Flutterwave. All donations are voluntary and are used to support our technology education, events, and community programmes. By making a donation, you confirm that you are authorised to use the payment method provided. Donations are subject to our Refund Policy, including the 24-hour refund window. We do not provide goods, services, or tax receipts in exchange for donations unless otherwise stated.

## 6. Event Registration and Tickets

Registration for events and purchase of tickets may be subject to additional terms, including age restrictions and capacity limits. Please provide accurate registration information and keep your ticket or reference number safe. Entry to events may require valid identification. We may reschedule, modify, or cancel an event where necessary and will make reasonable efforts to notify registered participants.

## 7. Community Registration

When you join our community, you agree to receive communications such as welcome messages and updates about our programmes and events. You can unsubscribe from non-essential messages at any time using the contact details below.

## 8. Third-Party Services and Links

The Site uses third-party services for payments (Flutterwave), data storage (Supabase), and email delivery (Resend). The Site may also link to third-party websites. We are not responsible for the content, availability, or practices of those services and websites, and your use of them may be subject to their own terms.

## 9. Disclaimers

The Site and its content are provided "as is" and "as available". We do not warrant that the Site will always be available, error-free, or secure, or that the information on it is always accurate or complete. We are not liable for any loss arising from your reliance on information on the Site or from circumstances beyond our reasonable control.

## 10. Limitation of Liability

To the maximum extent permitted by law, we and our officers, employees, and partners will not be liable for any indirect, incidental, or consequential damages, or for any loss of profits, data, or goodwill, arising out of your use of the Site or our services.

## 11. Indemnification

You agree to indemnify and hold harmless Innovate Ohafia and its partners from any claims, losses, or damages arising from your breach of these Terms or your misuse of the Site.

## 12. Governing Law

These Terms are governed by the laws of the Federal Republic of Nigeria. Any dispute arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of Nigeria.

## 13. Changes to These Terms

We may update these Terms from time to time. The updated version will be posted on this page with a revised "Last updated" date. Your continued use of the Site after changes are posted means you accept the updated Terms.

## 14. Contact Us

If you have any questions about these Terms, please contact us:

- Email: hi@innovateohafia.com
- Phone: +234 706 514 9973
- Address: Ohafia, Abia State, Nigeria
`

const description = 'The terms and conditions that govern your use of the Innovate Ohafia website, community, events, and donation services.'
</script>

<template>
  <PolicyPage
    title="Terms of Service"
    :description="description"
    last-updated="17 November 2026"
    :content="content"
  />
</template>
