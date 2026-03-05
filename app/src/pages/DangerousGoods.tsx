import { useState } from "react";

type DangerousGoodsProps = {
  onAccept: () => void;
  onBack: () => void;
};

export default function DangerousGoods({ onAccept, onBack }: DangerousGoodsProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

const RULES = [
  {
    id: "dangerous-goods",
    icon: (
      <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
    title: "Dangerous Goods",
    description:
      "I confirm that my baggage does not contain any prohibited dangerous goods including explosives, flammable liquids/solids, toxic or infectious substances, radioactive materials, or oxidizers.",
  },
  {
    id: "liquids",
    icon: (
      <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Liquids & Gels",
    description:
      "I understand that liquids, aerosols, and gels in carry-on baggage must be in containers of 100ml or less, placed in a single transparent resealable bag not exceeding 1 litre.",
  },
  {
    id: "baggage",
    icon: (
      <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Baggage Allowance",
    description:
      "I acknowledge the baggage allowance for my ticket: 1 carry-on bag (max 7 kg) and 1 checked bag (max 23 kg for Economy, 32 kg for Business). Excess baggage fees apply.",
  },
  {
    id: "conditions",
    icon: (
      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Conditions of Carriage",
    description:
      "I have read and accept Qoomlee Airlines' Conditions of Carriage, including policies on flight changes, cancellations, delays, and passenger responsibilities.",
  },
];

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allChecked = checked.size === RULES.length;

  return (
    <>
      {/* Main content */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Travel Rules</h2>
          <p className="text-sm text-gray-400 mb-5">
            Please read and acknowledge all rules before continuing
          </p>

          <div className="flex flex-col gap-3">
            {RULES.map((rule) => {
              const isChecked = checked.has(rule.id);
              return (
                <button
                  key={rule.id}
                  onClick={() => toggle(rule.id)}
                  className={`w-full text-left rounded-xl border-2 p-4 transition-colors ${
                    isChecked ? "border-blue-500 bg-blue-50" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <span
                      className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                        isChecked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
                      }`}
                    >
                      {isChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        {rule.icon}
                        <p className={`text-sm font-semibold leading-tight ${isChecked ? "text-blue-700" : "text-gray-800"}`}>
                          {rule.title}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{rule.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Accept all shortcut */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() =>
                setChecked(
                  allChecked ? new Set() : new Set(RULES.map((r) => r.id))
                )
              }
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm hover:bg-gray-50"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {allChecked ? "Clear All" : "Accept All"}
            </button>
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
            disabled={!allChecked}
            onClick={() => onAccept()}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
