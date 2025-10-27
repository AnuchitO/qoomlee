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
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-sky-100">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5">Passenger Details</h3>
      <div className="space-y-5">
        {passengers.map((p, idx) => {
          const k = keyFor(p);
          const d = details[k];
          return (
            <div key={k} className="border border-slate-200 rounded-lg p-4">
              <div className="font-semibold text-slate-800 mb-3">
                {idx + 1}. {p.firstName} {p.lastName}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nationality</label>
                  <input
                    type="text"
                    value={d.nationality}
                    onChange={(e) => setDetails((s) => ({ ...s, [k]: { ...s[k], nationality: e.target.value.toUpperCase() } }))}
                    placeholder="TH / US / SG"
                    className="w-full px-4 py-3 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={d.phone}
                    onChange={(e) => setDetails((s) => ({ ...s, [k]: { ...s[k], phone: e.target.value } }))}
                    placeholder="+66 8x xxx xxxx"
                    className="w-full px-4 py-3 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
        <button
          type="button"
          disabled={!allValid}
          onClick={() => onNext(details)}
          className="inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sky-700 disabled:opacity-60"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function keyFor(p: Passenger) {
  return `${p.firstName}-${p.lastName}`;
}
