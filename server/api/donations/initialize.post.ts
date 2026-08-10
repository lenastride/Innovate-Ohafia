import { createDonationReference, createFlutterwavePayment, getMinimumDonation, isSupportedDonationCurrency } from '../../utils/flutterwave';

type DonationRequest = {
  amount?: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  currency?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default defineEventHandler(async (event) => {
  const body = await readBody<DonationRequest>(event);
  const amount = Number(body.amount);
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const phoneNumber = body.phoneNumber?.trim();
  const currency = (body.currency || 'NGN').toUpperCase();

  if (!isSupportedDonationCurrency(currency)) {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported donation currency.' });
  }

  const minimumDonation = getMinimumDonation(currency as any);

  if (!Number.isFinite(amount) || amount < minimumDonation || amount > 10_000_000) {
    throw createError({ statusCode: 400, statusMessage: `Donation amount must be between ${currency} ${minimumDonation} and ${currency} 10,000,000.` });
  }
  if (!name || name.length > 100 || !email || !emailPattern.test(email) || (phoneNumber && phoneNumber.length > 25)) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid name, email address, and phone number.' });
  }

  const config = useRuntimeConfig();
  const callbackUrl = new URL('/donate/complete', config.public.siteUrl).toString();
  const txRef = createDonationReference();
  const paymentLink = await createFlutterwavePayment({
    txRef,
    amount: Math.round(amount * 100) / 100,
    currency: currency as any,
    redirectUrl: callbackUrl,
    customer: { name, email, phoneNumber },
  });

  return { paymentLink, txRef, currency };
});
