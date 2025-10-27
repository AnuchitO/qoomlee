import { useState } from 'react';

type DangerousGoodsProps = {
  onAccept: () => void;
  onBack: () => void;
};

export default function DangerousGoods({ onAccept, onBack }: DangerousGoodsProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-sky-100">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5">Dangerous Goods Declaration</h3>
      <div className="text-sm text-slate-700 space-y-3">
        <p>
          For safety reasons, certain items are prohibited on board. By proceeding, you confirm that you and those in your
          booking are not carrying dangerous goods such as explosives, flammable liquids, compressed gases, oxidizers, toxic or
          infectious substances, corrosives, or other hazardous materials.
        </p>
        <label className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <span>I understand and accept the dangerous goods policy.</span>
        </label>
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
          disabled={!accepted}
          onClick={onAccept}
          className="inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sky-700 disabled:opacity-60"
        >
          Accept & Continue
        </button>
      </div>
    </div>
  );
}
