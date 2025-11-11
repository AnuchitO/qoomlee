import { COUNTRY_CODES } from '../../constants/countryCodes';
import type { Passenger } from '../../types/checkin';

type PassengerDetailProps = {
  passenger: Passenger;
  index: number;
  detail: {
    nationality: string;
    phone: string;
    countryCode: string;
  };
  nationalityError: string | null;
  phoneError: string | null;
  onNationalityChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCountryCodeChange: (value: string) => void;
  onNationalityBlur: () => void;
  onPhoneBlur: () => void;
};

export const PassengerDetail = ({
  passenger,
  index,
  detail,
  nationalityError,
  phoneError,
  onNationalityChange,
  onPhoneChange,
  onCountryCodeChange,
  onNationalityBlur,
  onPhoneBlur,
}: PassengerDetailProps) => (
  <div className="border border-slate-200 rounded-lg p-4">
    <h4 className="font-semibold text-slate-800 mb-3 text-base">
      {index + 1}. {passenger.firstName} {passenger.lastName}
    </h4>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Nationality
        </label>
        <input
          type="text"
          value={detail.nationality}
          data-testid={`nationality-${index}`}
          onChange={(e) => onNationalityChange(e.target.value)}
          onBlur={onNationalityBlur}
          placeholder="TH / US / SG"
          maxLength={3}
          className={`w-full px-4 py-3.5 text-base rounded-lg border-2 outline-none touch-manipulation ${
            nationalityError
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200'
          }`}
          autoFocus={index === 0}
          aria-invalid={!!nationalityError}
          aria-describedby={nationalityError ? `nationality-${index}-error` : undefined}
        />
        {nationalityError && (
          <p id={`nationality-${index}-error`} className="text-xs text-red-600 mt-1.5 ml-1.5">
            {nationalityError}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Phone Number
        </label>
        <div className="flex gap-2">
          <div className="flex-shrink-0">
            <select
              data-testid={`countryCode-${index}`}
              value={detail.countryCode}
              onChange={(e) => onCountryCodeChange(e.target.value)}
              className="w-28 px-3 py-3.5 text-base rounded-lg border-2 outline-none touch-manipulation bg-white cursor-pointer border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            >
              {COUNTRY_CODES.map((cc) => (
                <option key={cc.code} value={cc.code}>
                  {cc.flag} {cc.code}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <input
              type="tel"
              value={detail.phone}
              data-testid={`phone-${index}`}
              onChange={(e) => onPhoneChange(e.target.value)}
              onBlur={onPhoneBlur}
              placeholder="Enter phone number"
              className={`w-full px-4 py-3.5 text-base rounded-lg border-2 outline-none touch-manipulation ${
                phoneError
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200'
              }`}
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? `phone-${index}-error` : undefined}
            />
          </div>
        </div>
        {phoneError && (
          <p id={`phone-${index}-error`} className="text-xs text-red-600 mt-1.5 ml-1.5">
            {phoneError}
          </p>
        )}
      </div>
    </div>
  </div>
);
