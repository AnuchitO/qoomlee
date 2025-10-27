import { useState } from 'react';
import type { Passenger } from '../types/checkin';

type PassengerSelectProps = {
  passengers: Passenger[];
  onNext: (selected: Passenger[]) => void;
  onBack?: () => void;
};

export default function PassengerSelect({ passengers, onNext, onBack }: PassengerSelectProps) {
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  const anySelected = Object.values(selected).some(Boolean);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-sky-100">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5">Select Passengers</h3>
      <div className="divide-y divide-slate-200">
        {passengers.map((p, idx) => (
          <label key={`${p.firstName}-${p.lastName}-${idx}`} className="flex items-center gap-3 py-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              checked={!!selected[idx]}
              onChange={(e) => setSelected((s) => ({ ...s, [idx]: e.target.checked }))}
            />
            <div className="flex-1">
              <div className="font-medium text-slate-800">
                {p.firstName} {p.lastName} <span className="ml-2 text-xs text-slate-500">({p.paxType})</span>
              </div>
              <div className="text-xs text-slate-500">Seat: {p.seat ?? 'Not assigned'}</div>
            </div>
          </label>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back
          </button>
        )}
        <button
          type="button"
          disabled={!anySelected}
          onClick={() => onNext(passengers.filter((_, i) => !!selected[i]))}
          className="inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sky-700 disabled:opacity-60"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
