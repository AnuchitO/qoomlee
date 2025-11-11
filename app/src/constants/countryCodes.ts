export interface CountryCode {
  code: string;
  country: string;
  name: string;
  flag: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: '+66', country: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: '+1', country: 'US', name: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+65', country: 'SG', name: 'Singapore', flag: '🇸🇬' },
  // ... (rest of the country codes)
];

export const DEFAULT_COUNTRY_CODE = '+66'; // Thailand as default
