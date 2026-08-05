export type DonationForm = {
  amount: number | null;
  name: string;
  email: string;
  phoneNumber: string;
};

export const donationPresets = [1000, 2500, 5000, 10000];

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 2 }).format(amount);

export function useDonation() {
  const isSubmitting = ref(false);
  const errorMessage = ref('');

  const beginDonation = async (form: DonationForm) => {
    isSubmitting.value = true;
    errorMessage.value = '';
    try {
      const result = await $fetch<{ paymentLink: string }>('/api/donations/initialize', {
        method: 'POST',
        body: form,
      });
      await navigateTo(result.paymentLink, { external: true });
    } catch (error: any) {
      errorMessage.value = error?.data?.statusMessage || error?.message || 'We could not start your donation. Please try again.';
    } finally {
      isSubmitting.value = false;
    }
  };

  return { beginDonation, errorMessage, isSubmitting };
}
