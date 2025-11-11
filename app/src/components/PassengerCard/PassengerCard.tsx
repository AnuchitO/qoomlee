import React from 'react';
import { PhoneInput } from '../PhoneInput/PhoneInput';
import type { Passenger, PassengerExtraDetails } from '../../types/checkin';
import type { CountryCode } from '../../constants/countryCodes';

type PassengerCardProps = {
  passenger: Passenger;
  index: number;
  details: PassengerExtraDetails;
  countryCodes: CountryCode[];
  onUpdate: (field: keyof PassengerExtraDetails, value: string) => void;
  onBlur: (field: 'nationality' | 'phone') => void;
  getFieldError: (field: 'nationality' | 'phone') => string | null;
};

export const PassengerCard: React.FC<PassengerCardProps> = ({
  passenger,
  index,
  details,
  countryCodes,
  onUpdate,
  onBlur,
  getFieldError,
}) => {
  const { firstName, lastName } = passenger;
  const { nationality, phone, countryCode } = details;

  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <div className="font-semibold text-slate-800 mb-3 text-base">
        {index + 1}. {firstName} {lastName}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nationality
          </label>
          <input
            type="text"
            value={nationality}
            onChange={(e) => onUpdate('nationality', e.target.value.toUpperCase())}
            onBlur={() => onBlur('nationality')}
            placeholder="TH / US / SG"
            maxLength={3}
            className={`w-full px-4 py-3.5 text-base rounded-lg border-2 outline-none touch-manipulation ${
              getFieldError('nationality')
                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200'
            }`}
            autoFocus={index === 0}
            aria-invalid={!!getFieldError('nationality')}
            aria-describedby={getFieldError('nationality') ? `nationality-${index}-error` : undefined}
            data-testid={`nationality-${index}`}
          />
          {getFieldError('nationality') && (
            <p id={`nationality-${index}-error`} className="text-xs text-red-600 mt-1.5 ml-1.5">
              {getFieldError('nationality')}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number
          </label>
          <PhoneInput
            value={phone}
            countryCode={countryCode}
            countryCodes={countryCodes}
            onChange={(value) => onUpdate('phone', value)}
            onCountryCodeChange={(code) => onUpdate('countryCode', code)}
            error={getFieldError('phone')}
            onBlur={() => onBlur('phone')}
            id={`phone-${index}`}
            data-testid={`phone-${index}`}
          />
        </div>
      </div>
    </div>
  );
};
