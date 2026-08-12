import { fetchFlutterwaveTransaction, sendDonationThankYouEmail, verifyFlutterwaveDonation, isPendingFlutterwaveStatus, isSupportedDonationCurrency, getMinimumDonation } from '../../utils/flutterwave';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const transactionId = typeof query.transaction_id === 'string' ? query.transaction_id : '';
  const txRef = typeof query.tx_ref === 'string' ? query.tx_ref : '';

  if (!transactionId || !txRef) {
    throw createError({ statusCode: 400, statusMessage: 'Missing payment reference.' });
  }

  const verification = await fetchFlutterwaveTransaction(transactionId);
  const donation = verification.data;
  const donationStatus = String(donation?.status || '').toLowerCase();
  const txRefMatches = String(donation?.tx_ref || '').trim() === String(txRef || '').trim();

  if (!verification || !donation || !txRefMatches) {
    throw createError({ statusCode: 400, statusMessage: 'This payment could not be verified.' });
  }

  if (!isSupportedDonationCurrency(donation.currency || '')) {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported donation currency.' });
  }

  if (donation.amount < getMinimumDonation(donation.currency as any)) {
    throw createError({ statusCode: 400, statusMessage: 'Payment amount is below the accepted minimum.' });
  }

  if (isPendingFlutterwaveStatus(donationStatus)) {
    return {
      status: 'pending',
      amount: donation.amount,
      currency: donation.currency,
      reference: donation.tx_ref,
      donor: donation.customer?.name || donation.customer?.email || 'Supporter',
    };
  }

  if (donationStatus !== 'successful') {
    throw createError({ statusCode: 400, statusMessage: 'This payment could not be verified.' });
  }

  const verifiedDonation = await verifyFlutterwaveDonation(transactionId, txRef);
  await sendDonationThankYouEmail(verifiedDonation);
  return {
    status: 'successful',
    id: verifiedDonation.id,
    amount: verifiedDonation.amount,
    currency: verifiedDonation.currency,
    reference: verifiedDonation.tx_ref,
    donor: verifiedDonation.customer?.name || verifiedDonation.customer?.email || 'Supporter',
  };
});
