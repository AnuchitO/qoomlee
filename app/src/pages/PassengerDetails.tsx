import { useState } from 'react';
import type { Passenger, PassengerExtraDetails } from '../types/checkin';

const COUNTRY_CODES = [
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

type PassengerDetailsProps = {
  passengers: Passenger[];
  onNext: (details: Record<string, PassengerExtraDetails>) => void;
  onBack: () => void;
};

export default function PassengerDetails({ passengers, onNext, onBack }: PassengerDetailsProps) {
  const [details, setDetails] = useState<Record<string, PassengerExtraDetails>>(
    Object.fromEntries(
      passengers.map((p) => [keyFor(p), { nationality: '', phone: '', countryCode: '+66' }])
    )
  );
  const [touched, setTouched] = useState<Record<string, { nationality: boolean; phone: boolean }>>({});

  const validateNationality = (value: string): string | null => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Nationality is required';
    if (trimmed.length < 2) return 'Enter valid country code (e.g., TH, US)';
    if (!/^[A-Z]{2,3}$/.test(trimmed)) return 'Use 2-3 letter country code';
    return null;
  };

  const validatePhone = (value: string): string | null => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Phone number is required';
    if (trimmed.length < 6) return 'Phone number too short';
    if (trimmed.length > 15) return 'Phone number too long';
    if (!/^[0-9\s\-()]+$/.test(trimmed)) return 'Only numbers, spaces, and dashes allowed';
    return null;
  };

  const getFieldError = (passengerKey: string, field: 'nationality' | 'phone'): string | null => {
    if (!touched[passengerKey]?.[field]) return null;
    const d = details[passengerKey];
    if (!d) return null;
    return field === 'nationality' ? validateNationality(d.nationality) : validatePhone(d.phone);
  };

  const allValid = passengers.every((p) => {
    const k = keyFor(p);
    const d = details[k];
    return d && validateNationality(d.nationality) === null && validatePhone(d.phone) === null;
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4">
        <div className="px-5 pt-5 pb-4 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Passenger Details</h3>
          <p className="text-sm text-slate-600 mt-1.5">Enter required information for each passenger</p>
        </div>
        <div className="p-5 sm:p-6">
        <div className="space-y-5">
          {passengers.map((p, idx) => {
            const k = keyFor(p);
            const d = details[k];
            return (
              <div key={k} className="border border-slate-200 rounded-lg p-4">
                <div className="font-semibold text-slate-800 mb-3 text-base">
                  {idx + 1}. {p.firstName} {p.lastName}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nationality</label>
                    <input
                      type="text"
                      data-testid={'nationality-' + idx}
                      value={d.nationality}
                      onChange={(e) => setDetails((s) => ({ ...s, [k]: { ...s[k], nationality: e.target.value.toUpperCase() } }))}
                      onBlur={() => setTouched((s) => ({ ...s, [k]: { ...s[k], nationality: true } }))}
                      placeholder="TH / US / SG"
                      maxLength={3}
                      className={`w-full px-4 py-3.5 text-base rounded-lg border-2 outline-none touch-manipulation ${
                        getFieldError(k, 'nationality')
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200'
                      }`}
                      autoFocus={idx === 0}
                      aria-invalid={!!getFieldError(k, 'nationality')}
                      aria-describedby={getFieldError(k, 'nationality') ? `${k}-nationality-error` : undefined}
                    />
                    {getFieldError(k, 'nationality') && (
                      <p id={`${k}-nationality-error`} className="text-xs text-red-600 mt-1.5 ml-1.5">
                        {getFieldError(k, 'nationality')}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <div className="flex gap-2">
                      <div className="flex-shrink-0">
                        <select
                          value={d.countryCode}
                          data-testid={'countryCode-' + idx}
                          onChange={(e) => setDetails((s) => ({ ...s, [k]: { ...s[k], countryCode: e.target.value } }))}
                          className={`w-28 px-3 py-3.5 text-base rounded-lg border-2 outline-none touch-manipulation bg-white cursor-pointer border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200`}
                        >
                          {COUNTRY_CODES.map((cc) => (
                            <option key={cc.code} value={cc.code}>
                              {cc.flag} {cc.code}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-1.5 ml-1.5">
                          {COUNTRY_CODES.find((cc) => cc.code === d.countryCode)?.name || ''}
                        </p>
                      </div>
                      <div className="flex-1">
                        <input
                          type="tel"
                          data-testid={'phone-' + idx}
                          value={d.phone}
                          onChange={(e) => setDetails((s) => ({ ...s, [k]: { ...s[k], phone: e.target.value } }))}
                          onBlur={() => setTouched((s) => ({ ...s, [k]: { ...s[k], phone: true } }))}
                          placeholder="8x xxx xxxx"
                          maxLength={15}
                          className={`w-full px-4 py-3.5 text-base rounded-lg border-2 outline-none touch-manipulation ${
                            getFieldError(k, 'phone')
                              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                              : 'border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200'
                          }`}
                          autoComplete="tel-national"
                          aria-invalid={!!getFieldError(k, 'phone')}
                          aria-describedby={getFieldError(k, 'phone') ? `${k}-phone-error` : undefined}
                        />
                        {getFieldError(k, 'phone') && (
                          <p id={`${k}-phone-error`} className="text-xs text-red-600 mt-1.5 ml-1.5">
                            {getFieldError(k, 'phone')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Sticky action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30 safe-area-inset-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-4 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] touch-manipulation"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!allValid}
            onClick={() => onNext(details)}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

function keyFor(p: Passenger) {
  return `${p.firstName}-${p.lastName}`;
}
