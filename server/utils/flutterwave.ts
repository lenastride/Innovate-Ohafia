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
