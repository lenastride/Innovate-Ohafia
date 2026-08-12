import { isPendingFlutterwaveStatus, sendDonationThankYouEmail, verifyFlutterwaveDonation } from '../../utils/flutterwave';

type FlutterwaveWebhook = {
  data?: { id?: number | string; tx_ref?: string; status?: string };
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const signature = getRequestHeader(event, 'verif-hash');

  if (!config.flutterwaveWebhookHash || signature !== config.flutterwaveWebhookHash) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid webhook signature.' });
  }

  const body = await readBody<FlutterwaveWebhook>(event);
  const transactionId = body.data?.id?.toString();
  const txRef = body.data?.tx_ref;
  if (!transactionId || !txRef) return { received: true };

  // Pending payments are completed asynchronously. Acknowledging this event avoids
  // unnecessary webhook retries; Flutterwave sends another event when it is final.
  if (isPendingFlutterwaveStatus(body.data?.status)) {
    return { received: true, status: 'pending', message: 'Payment is still processing. Await final webhook event.' };
  }

  // Only a successful, independently verified transaction is a confirmed donation.
  if (body.data?.status?.toLowerCase() !== 'successful') {
    return { received: true, status: body.data?.status || 'ignored' };
  }

  const donation = await verifyFlutterwaveDonation(transactionId, txRef);
  await sendDonationThankYouEmail(donation);
  return { received: true, status: 'successful' };
});
