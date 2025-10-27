import { useState } from 'react';

type DangerousGoodsProps = {
  onAccept: () => void;
  onBack: () => void;
};

export default function DangerousGoods({ onAccept, onBack }: DangerousGoodsProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4">
        <div className="px-5 pt-5 pb-4 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Dangerous Goods Declaration</h3>
          <p className="text-sm text-slate-600 mt-1.5">Please review and accept the policy</p>
        </div>
        <div className="p-5 sm:p-6">
        <div className="text-base text-slate-700 space-y-4">
          <p className="leading-relaxed">
            For safety reasons, certain items are prohibited on board. By proceeding, you confirm that you and those in your
            booking are not carrying dangerous goods such as explosives, flammable liquids, compressed gases, oxidizers, toxic or
            infectious substances, corrosives, or other hazardous materials.
          </p>
          <label className="flex items-start gap-4 mt-4 cursor-pointer touch-manipulation py-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="h-6 w-6 mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 flex-shrink-0"
            />
            <span className="text-base leading-relaxed">I understand and accept the dangerous goods policy.</span>
          </label>
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
            disabled={!accepted}
            onClick={onAccept}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </>
  );
}
