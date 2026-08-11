import { sendDonationThankYouEmail, verifyFlutterwaveDonation } from '../../utils/flutterwave';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const transactionId = typeof query.transaction_id === 'string' ? query.transaction_id : '';
  const txRef = typeof query.tx_ref === 'string' ? query.tx_ref : '';

  if (!transactionId || !txRef) {
    throw createError({ statusCode: 400, statusMessage: 'Missing payment reference.' });
  }

  const donation = await verifyFlutterwaveDonation(transactionId, txRef);
  await sendDonationThankYouEmail(donation);
  return {
    id: donation.id,
    amount: donation.amount,
    currency: donation.currency,
    reference: donation.tx_ref,
    donor: donation.customer?.name || donation.customer?.email || 'Supporter',
  };
});
