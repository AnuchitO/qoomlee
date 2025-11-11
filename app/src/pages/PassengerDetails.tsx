import type { Passenger } from '../types/checkin';
import { usePassengerForm } from '../hooks/usePassengerForm';
import { PassengerDetail } from '../components/Passenger/PassengerDetail';

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
                <PassengerDetail
                  key={key}
                  passenger={passenger}
                  index={index}
                  detail={detail}
                  nationalityError={nationalityError}
                  phoneError={phoneError}
                  onNationalityChange={(value) => updateDetail(key, 'nationality', value)}
                  onPhoneChange={(value) => updateDetail(key, 'phone', value)}
                  onCountryCodeChange={(value) => updateDetail(key, 'countryCode', value)}
                  onNationalityBlur={() => setFieldTouched(key, 'nationality')}
                  onPhoneBlur={() => setFieldTouched(key, 'phone')}
                />
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
