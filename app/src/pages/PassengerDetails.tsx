import { useState } from 'react';
import type { Passenger, PassengerExtraDetails } from '../types/checkin';

type PassengerDetailsProps = {
  passengers: Passenger[];
  onNext: (details: Record<string, PassengerExtraDetails>) => void;
  onBack: () => void;
};

export default function PassengerDetails({ passengers, onNext, onBack }: PassengerDetailsProps) {
  const [details, setDetails] = useState<Record<string, PassengerExtraDetails>>(
    Object.fromEntries(
      passengers.map((p) => [keyFor(p), { nationality: '', phone: '' }])
    )
  );

  const allValid = passengers.every((p) => {
    const k = keyFor(p);
    const d = details[k];
    return d && d.nationality.trim().length > 1 && d.phone.trim().length >= 6;
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
                      value={d.nationality}
                      onChange={(e) => setDetails((s) => ({ ...s, [k]: { ...s[k], nationality: e.target.value.toUpperCase() } }))}
                      placeholder="TH / US / SG"
                      className="w-full px-4 py-3.5 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none touch-manipulation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={d.phone}
                      onChange={(e) => setDetails((s) => ({ ...s, [k]: { ...s[k], phone: e.target.value } }))}
                      placeholder="+66 8x xxx xxxx"
                      className="w-full px-4 py-3.5 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none touch-manipulation"
                    />
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
