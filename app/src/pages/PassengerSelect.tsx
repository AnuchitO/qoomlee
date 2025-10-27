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
  const allSelected = passengers.length > 0 && passengers.every((_, i) => selected[i]);
  
  const toggleAll = () => {
    if (allSelected) {
      setSelected({});
    } else {
      setSelected(Object.fromEntries(passengers.map((_, i) => [i, true])));
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4">
        {/* Header */}
        <div className="px-5 pt-5 pb-4 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Select Passengers</h3>
          <p className="text-sm text-slate-600 mt-1.5">Choose passengers for check-in</p>
        </div>
        
        {/* Passenger list */}
        <div className="divide-y divide-slate-100">
          {passengers.map((p, idx) => (
            <label 
              key={`${p.firstName}-${p.lastName}-${idx}`} 
              className="flex items-center gap-4 px-5 py-4 cursor-pointer touch-manipulation active:bg-sky-50/50 hover:bg-slate-50/50 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 text-base leading-tight group-hover:text-sky-700 transition-colors">
                  {p.firstName} {p.lastName}
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                    {p.paxType}
                  </span>
                  <span className="text-xs text-slate-500">
                    {p.seat ? `Seat ${p.seat}` : 'No seat assigned'}
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0 flex items-center">
                <div className="relative inline-flex">
                  <input
                    type="checkbox"
                    className="peer h-7 w-7 cursor-pointer appearance-none rounded-lg border-2 border-slate-300 bg-white transition-all checked:border-sky-600 checked:bg-sky-600 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    checked={!!selected[idx]}
                    onChange={(e) => setSelected((s) => ({ ...s, [idx]: e.target.checked }))}
                  />
                  <svg
                    className="pointer-events-none absolute inset-0 m-auto w-4 h-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
      
      {/* Floating Select All button - subtle secondary action */}
      <div className="fixed bottom-20 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-3xl mx-auto px-4 flex justify-end">
          <button
            type="button"
            onClick={toggleAll}
            className="pointer-events-auto px-4 py-2.5 mb-2 bg-white/95 backdrop-blur-sm text-slate-600 rounded-xl shadow-md border border-slate-200 font-medium text-sm hover:bg-white hover:text-slate-700 hover:border-slate-300 active:scale-95 transition-all touch-manipulation flex items-center gap-2"
          >
            {allSelected ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Clear All</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Select All</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Sticky action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30 safe-area-inset-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-4 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] touch-manipulation"
            >
              Back
            </button>
          )}
          <button
            type="button"
            disabled={!anySelected}
            onClick={() => onNext(passengers.filter((_, i) => !!selected[i]))}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
