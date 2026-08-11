export type DonationCurrency = 'NGN' | 'USD' | 'EUR' | 'GHS' | 'CAD' | 'ZAR' | 'GBP';

export const supportedDonationCurrencies: DonationCurrency[] = ['NGN', 'USD', 'EUR', 'GHS', 'CAD', 'ZAR', 'GBP'];

export const currencyMinimums: Record<DonationCurrency, number> = {
  NGN: 1000,
  USD: 10,
  EUR: 10,
  GHS: 50,
  CAD: 10,
  ZAR: 100,
  GBP: 10,
};

export function getMinimumDonation(currency: DonationCurrency) {
  return currencyMinimums[currency] ?? 10;
}

export function isSupportedDonationCurrency(value: string): value is DonationCurrency {
  return supportedDonationCurrencies.includes(value as DonationCurrency);
}

type FlutterwaveVerification = {
  status: 'success' | string;
  message?: string;
  data?: {
    id: number;
    tx_ref: string;
    status: string;
    amount: number;
    currency: string;
    customer?: { email?: string; name?: string };
  };
};

export type VerifiedDonation = NonNullable<FlutterwaveVerification['data']>;

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}[character] as string));

function formatDonationAmount(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

function getFlutterwaveConfig() {
  const config = useRuntimeConfig();

  if (!config.flutterwaveSecretKey) {
    throw createError({ statusCode: 500, statusMessage: 'Payment service is not configured.' });
  }

  return config;
}

export function createDonationReference() {
  return `io-donation-${Date.now()}-${crypto.randomUUID()}`;
}

export function isPendingFlutterwaveStatus(status?: string) {
  return ['pending', 'pending-validation', 'success-pending-validation'].includes(status?.toLowerCase() || '');
}

export async function createFlutterwavePayment(payload: {
  txRef: string;
  amount: number;
  currency: DonationCurrency;
  redirectUrl: string;
  customer: { email: string; name: string; phoneNumber?: string };
}) {
  const config = getFlutterwaveConfig();
  const response = await $fetch<{ status: string; message?: string; data?: { link?: string } }>(
    'https://api.flutterwave.com/v3/payments',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.flutterwaveSecretKey}` },
      body: {
        tx_ref: payload.txRef,
        amount: payload.amount.toFixed(2),
        currency: payload.currency,
        redirect_url: payload.redirectUrl,
        customer: {
          email: payload.customer.email,
          name: payload.customer.name,
          phonenumber: payload.customer.phoneNumber || undefined,
        },
        customizations: {
          title: 'Innovate Ohafia Donation',
          description: 'Support youth technology education and innovation in Ohafia.',
          logo: `${config.public.siteUrl}/innovate_ohafia_logo_colored.svg`,
        },
        meta: { donation_type: 'one_time' },
      },
    },
  );

  if (response.status !== 'success' || !response.data?.link) {
    throw createError({ statusCode: 502, statusMessage: response.message || 'Unable to start the payment.' });
  }

  return response.data.link;
}

export async function verifyFlutterwaveDonation(transactionId: string, expectedReference: string) {
  const config = getFlutterwaveConfig();
  const response = await $fetch<FlutterwaveVerification>(
    `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`,
    { headers: { Authorization: `Bearer ${config.flutterwaveSecretKey}` } },
  );
  const donation = response.data;

  if (
    response.status !== 'success' ||
    !donation ||
    donation.status !== 'successful' ||
    donation.tx_ref !== expectedReference ||
    !isSupportedDonationCurrency(donation.currency) ||
    donation.amount < getMinimumDonation(donation.currency as DonationCurrency)
  ) {
    throw createError({ statusCode: 400, statusMessage: 'This payment could not be verified.' });
  }

  return donation;
}

/**
 * Resend honours the idempotency key, so this is safe to call from both the
 * browser callback and the Flutterwave webhook. Email problems must never
 * make a confirmed payment appear unsuccessful to the donor.
 */
export async function sendDonationThankYouEmail(donation: VerifiedDonation) {
  const email = donation.customer?.email?.trim().toLowerCase();
  if (!email) return;

  const config = useRuntimeConfig();
  const from = config.donationThankYouFrom || config.communityWelcomeFrom || config.contactFromEmail;
  if (!config.resendApiKey || !from) {
    console.warn('[donations] thank-you email is not configured');
    return;
  }

  const donorName = donation.customer?.name?.trim() || 'Supporter';
  const amount = formatDonationAmount(donation.amount, donation.currency);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `innovate-ohafia-donation-${donation.id}`,
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Thank you for your donation to Innovate Ohafia',
      text: `Hello ${donorName},\n\nThank you for your donation of ${amount} to Innovate Ohafia. Your support helps young people in Ohafia access practical technology education, creative spaces, and opportunity.\n\nPayment reference: ${donation.tx_ref}\n\nWe appreciate your support.\n\nWith gratitude,\nInnovate Ohafia`,
      html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f7fb;color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 24px 60px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:#004873;padding:32px;text-align:center;color:#ffffff;">
                <p style="margin:0;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;color:#ff8383;">Donation confirmed</p>
                <h1 style="margin:16px 0 0;font-size:32px;line-height:1.1;font-weight:700;">Thank you for your support</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 16px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">Hello ${escapeHtml(donorName)},</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">We received your donation of <strong>${escapeHtml(amount)}</strong>. Your gift is helping young people in Ohafia access practical technology education, creative spaces, and a brighter future.</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;background:#f8fafc;border-radius:16px;padding:20px;">
                  <tr>
                    <td style="font-size:14px;color:#475569;line-height:1.8;"><strong>Payment reference</strong></td>
                    <td style="font-size:14px;color:#0f172a;line-height:1.8;text-align:right;">${escapeHtml(donation.tx_ref)}</td>
                  </tr>
                  <tr>
                    <td style="font-size:14px;color:#475569;line-height:1.8;"><strong>Amount</strong></td>
                    <td style="font-size:14px;color:#0f172a;line-height:1.8;text-align:right;">${escapeHtml(amount)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#f8fafc;padding:24px 32px 32px;color:#475569;font-size:14px;line-height:1.75;">
                <p style="margin:0 0 12px;">If you have any questions about your donation, reply to this email and we’ll be happy to help.</p>
                <p style="margin:0;">With gratitude,<br><strong>Innovate Ohafia</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    }),
  });

  if (!response.ok) {
    console.error('[donations] failed to send thank-you email', response.status, await response.text());
  }
}
