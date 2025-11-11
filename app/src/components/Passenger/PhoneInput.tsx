import React from 'react';
import { CountryCode } from '../../constants/countryCodes';

type PhoneInputProps = {
  value: string;
  countryCode: string;
  countryCodes: CountryCode[];
  onChange: (phone: string) => void;
  onCountryCodeChange: (code: string) => void;
  error?: string | null;
  onBlur: () => void;
  id?: string;
  'data-testid'?: string;
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  countryCode,
  countryCodes,
  onChange,
  onCountryCodeChange,
  error,
  onBlur,
  id,
  'data-testid': testId,
}) => (
  <div>
    <div className="flex gap-2">
      <div className="flex-shrink-0">
        <select
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
          className="w-28 px-3 py-3.5 text-base rounded-lg border-2 outline-none touch-manipulation bg-white cursor-pointer border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          data-testid={`${testId}-country`}
        >
          {countryCodes.map((cc) => (
            <option key={cc.code} value={cc.code}>
              {cc.flag} {cc.code}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="Enter phone number"
          maxLength={15}
          className={`w-full px-4 py-3.5 text-base rounded-lg border-2 outline-none touch-manipulation ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          data-testid={testId}
        />
      </div>
    </div>
    {error && (
      <p id={`${id}-error`} className="text-xs text-red-600 mt-1.5 ml-1.5">
        {error}
      </p>
    )}
  </div>
);
