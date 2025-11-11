import { COUNTRY_CODES } from '../constants/countryCodes';
import type { Passenger } from '../types/checkin';
import { usePassengerForm } from '../hooks/usePassengerForm';

type PassengerDetailsProps = {
  passengers: Passenger[];
  onNext: (details: Record<string, { nationality: string; phone: string; countryCode: string }>) => void;
  onBack: () => void;
};

export default function PassengerDetails({ passengers, onNext, onBack }: PassengerDetailsProps) {
  const {
    details,
    getFieldError,
    isFormValid,
    updateDetail,
    setFieldTouched,
    getPassengerKey,
  } = usePassengerForm(passengers);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4">
        <div className="px-5 pt-5 pb-4 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Passenger Details</h3>
          <p className="text-sm text-slate-600 mt-1.5">Enter required information for each passenger</p>
        </div>
        <div className="p-5 sm:p-6">
          <div className="space-y-5">
            {passengers.map((passenger, index) => {
              const key = getPassengerKey(passenger);
              const detail = details[key] || { nationality: '', phone: '', countryCode: '+66' };
              const nationalityError = getFieldError(key, 'nationality');
              const phoneError = getFieldError(key, 'phone');

              return (
                <div key={key} className="border border-slate-200 rounded-lg p-4">
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
                        onChange={(e) => updateDetail(key, 'nationality', e.target.value)}
                        onBlur={() => setFieldTouched(key, 'nationality')}
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
                            onChange={(e) => updateDetail(key, 'countryCode', e.target.value)}
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
                            onChange={(e) => updateDetail(key, 'phone', e.target.value)}
                            onBlur={() => setFieldTouched(key, 'phone')}
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
            disabled={!isFormValid}
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
