<script setup lang="ts">
useSeoMeta({
  title: 'Privacy Policy - Innovate Ohafia',
  description: 'Learn how Innovate Ohafia collects, uses, shares, and protects your personal information when you use our website, join our community, or make a donation.',
  ogTitle: 'Privacy Policy - Innovate Ohafia',
  ogDescription: 'How Innovate Ohafia collects, uses, and protects your personal information.',
  ogImage: 'https://innovateohafia.com/og-image.png',
  ogUrl: 'https://innovateohafia.com/privacy-policy',
  twitterTitle: 'Privacy Policy - Innovate Ohafia',
  twitterDescription: 'How Innovate Ohafia collects, uses, and protects your personal information.',
  twitterImage: 'https://innovateohafia.com/og-image.png'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://innovateohafia.com/privacy-policy' }
  ]
})

const content = `
## 1. Introduction

Innovate Ohafia ("we", "us", "our") is a youth-focused technology initiative based in Ohafia, Abia State, Nigeria, designed by Lenastride. We are committed to protecting your privacy. This Privacy Policy explains what personal information we collect, how we use it, who we share it with, and the choices you have when you visit https://innovateohafia.com (the "Site"), join our community, register for an event, or make a donation.

By using the Site, you agree to the practices described in this policy. If you do not agree, please do not use the Site.

## 2. Information We Collect

**Information you give us directly:**

- **Contact and community registration:** When you join our community or contact us, we collect your first name, last name, email address, and phone number.
- **Donation information:** When you make a donation, our payment partner Flutterwave collects your card or bank details on its secure checkout page. We receive your name, email address, donation amount, transaction reference, and payment status. We do not store your full card or bank details.
- **Event and ticket information:** If you register for an event or purchase a ticket, we collect the details you provide on the registration form and your payment reference.
- **Messages:** When you contact us, we keep a record of your message and our replies.

**Information we collect automatically:**

- **Usage data:** The pages you visit, links you click, the time and date of your visit, your IP address, browser type, and device information.
- **Cookies and similar technologies:** We may use cookies and similar technologies to operate the Site and understand how it is used. You can disable cookies in your browser settings, although some features of the Site may not work as intended.

## 3. How We Use Your Information

We use your information to:

- Provide and manage the services you request, including community membership, event registration, and donations.
- Send transactional messages such as donation receipts, welcome emails, and event updates.
- Respond to your questions and support requests.
- Improve the Site, our events, and our programmes.
- Protect the Site from fraud, abuse, and technical problems.
- Comply with legal and regulatory obligations.

We do not sell your personal information.

## 4. How We Share Your Information

We share your information only with service providers who help us operate, and only to the extent needed:

- **Flutterwave** processes donations and payments. Card and bank details are entered directly on Flutterwave's secure checkout and are handled by them.
- **Supabase** stores community member and registration records.
- **Resend** sends emails such as donation receipts and welcome messages.

We may also disclose your information if required by law, to protect our rights, or to investigate fraud or security issues. We do not share your personal information with advertisers, and we do not sell it.

## 5. Data Retention

We keep your personal information for as long as we need it to provide our services and for as long as required by law or for legitimate record-keeping purposes. Donation and transaction records may be retained for financial and regulatory compliance even after you stop using the Site.

## 6. Your Rights

Depending on applicable law, you may have the right to access, correct, or delete the personal information we hold about you, to object to or restrict certain uses, and to withdraw consent where consent was the basis of processing. To exercise these rights, contact us using the details in Section 11. We may need to verify your identity before acting on your request.

## 7. Security

We use reasonable technical and organisational measures to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security. Please protect your account credentials and notify us of any suspected unauthorised use.

## 8. Third-Party Links

The Site may contain links to third-party websites, including our payment and social media partners. We are not responsible for the privacy practices of those sites. Please review their privacy policies before providing them with information.

## 9. Children's Privacy

Our services are not directed at children under 18, and we do not knowingly collect personal information from them. If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.

## 10. Changes to This Policy

We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised "Last updated" date. We encourage you to review this page regularly.

## 11. Contact Us

If you have any questions or concerns about this Privacy Policy or how we handle your information, please contact us:

- Email: hi@innovateohafia.com
- Phone: +234 706 514 9973
- Address: Ohafia, Abia State, Nigeria
`

const description = 'How we collect, use, share, and protect your personal information when you use the Innovate Ohafia website, join our community, or support our work.'
</script>

<template>
  <PolicyPage
    title="Privacy Policy"
    :description="description"
    last-updated="17 November 2026"
    :content="content"
  />
</template>
