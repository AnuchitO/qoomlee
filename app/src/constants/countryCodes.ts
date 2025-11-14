export interface CountryCode {
  code: string;
  country: string;
  name: string;
  flag: string;
}

export const COUNTRY_CODES: CountryCode[] =  [
  { code: '+66', country: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: '+1', country: 'US', name: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+65', country: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: '+86', country: 'CN', name: 'China', flag: '🇨🇳' },
  { code: '+91', country: 'IN', name: 'India', flag: '🇮🇳' },
  { code: '+81', country: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: '+61', country: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'FR', name: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: '+7', country: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: '+55', country: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: '+27', country: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: '+20', country: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: '+971', country: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+966', country: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+90', country: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: '+31', country: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', country: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: '+41', country: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+47', country: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: '+45', country: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: '+48', country: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: '+351', country: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: '+32', country: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: '+43', country: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: '+353', country: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: '+64', country: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+60', country: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: '+84', country: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: '+852', country: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: '+886', country: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: '+94', country: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+880', country: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+92', country: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+977', country: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: '+95', country: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: '+855', country: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: '+856', country: 'LA', name: 'Laos', flag: '🇱🇦' },
];

export const DEFAULT_COUNTRY_CODE = '+66'; // Thailand as default
