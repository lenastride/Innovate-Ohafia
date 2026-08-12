export type DonationCurrency = 'NGN' | 'USD' | 'EUR' | 'GHS' | 'CAD' | 'ZAR' | 'GBP';

export const supportedDonationCurrencies: DonationCurrency[] = ['NGN', 'USD', 'EUR', 'GHS', 'CAD', 'ZAR', 'GBP'];

export const donationPresets: Record<DonationCurrency, number[]> = {
  NGN: [1000, 10000, 25000, 50000, 100000, 500000],
  USD: [10, 25, 50, 100, 250, 500],
  EUR: [10, 25, 50, 100, 250, 500],
  GHS: [50, 200, 500, 1000, 2000, 5000],
  CAD: [10, 25, 50, 100, 250, 500],
  ZAR: [100, 250, 500, 1000, 2500, 5000],
  GBP: [10, 25, 50, 100, 250, 500],
};

export const currencyLocales: Record<DonationCurrency, string> = {
  NGN: 'en-NG',
  USD: 'en-US',
  EUR: 'en-IE',
  GHS: 'en-GH',
  CAD: 'en-CA',
  ZAR: 'en-ZA',
  GBP: 'en-GB',
};

export const currencySymbols: Record<DonationCurrency, string> = {
  NGN: '₦',
  USD: '$',
  EUR: '€',
  GHS: '₵',
  CAD: 'CAD',
  ZAR: 'R',
  GBP: '£',
};

export const donationMinimums: Record<DonationCurrency, number> = {
  NGN: 100,
  USD: 10,
  EUR: 10,
  GHS: 50,
  CAD: 10,
  ZAR: 100,
  GBP: 10,
};

export const formatCurrency = (amount: number, currency: DonationCurrency | string = 'NGN') => {
  const normalizedCurrency = (currency || 'NGN').toString().toUpperCase() as DonationCurrency;
  const locale = currencyLocales[normalizedCurrency] || currencyLocales.NGN;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: normalizedCurrency,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNaira = (amount: number) => formatCurrency(amount, 'NGN');

export function getDonationCurrencyFromLocale(locale: string): DonationCurrency {
  const normalized = locale?.toUpperCase() || 'EN-NG';

  if (normalized.startsWith('EN-US') || normalized.startsWith('US')) return 'USD';
  if (normalized.startsWith('EN-GB') || normalized.startsWith('GB') || normalized.startsWith('GB-')) return 'GBP';
  if (normalized.startsWith('EN-CA') || normalized.startsWith('CA') || normalized.startsWith('CA-')) return 'CAD';
  if (normalized.startsWith('EN-ZA') || normalized.startsWith('ZA') || normalized.startsWith('ZA-')) return 'ZAR';
  if (normalized.startsWith('EN-GH') || normalized.startsWith('GH') || normalized.startsWith('GH-')) return 'GHS';
  if (normalized.startsWith('EN-NG') || normalized.startsWith('NG') || normalized.startsWith('NG-')) return 'NGN';
  if (
    normalized.startsWith('FR') ||
    normalized.startsWith('DE') ||
    normalized.startsWith('ES') ||
    normalized.startsWith('IT') ||
    normalized.startsWith('NL') ||
    normalized.startsWith('PT') ||
    normalized.startsWith('SV') ||
    normalized.startsWith('DA') ||
    normalized.startsWith('NO')
  ) {
    return 'EUR';
  }

  return 'NGN';
}

export function getDefaultDonationCurrency(): DonationCurrency {
  if (process.client) {
    const locale = navigator.languages?.[0] || navigator.language || 'en-NG';
    return getDonationCurrencyFromLocale(locale);
  }

  return 'NGN';
}

export type DonationForm = {
  amount: number | null;
  name: string;
  email: string;
  phoneNumber: string;
};

export function useDonation() {
  const isSubmitting = ref(false);
  const errorMessage = ref('');

  const beginDonation = async (form: DonationForm, currency: DonationCurrency) => {
    isSubmitting.value = true;
    errorMessage.value = '';
    try {
      const result = await $fetch<{ paymentLink: string }>('/api/donations/initialize', {
        method: 'POST',
        body: { ...form, currency },
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
