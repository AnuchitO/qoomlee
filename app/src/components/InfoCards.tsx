import { Clock, Luggage } from 'lucide-react';

export default function InfoCards() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-slate-100 hover:shadow-lg transition-shadow touch-manipulation active:scale-[0.99]">
        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
          <div className="p-2 bg-sky-100 rounded-lg">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-800">Flight Status</h4>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-3 sm:mb-4">
          Track your flight in real-time. Get updates on departure, arrival, gate changes, and delays.
        </p>
        <button className="text-sky-600 font-semibold hover:text-sky-700 active:text-sky-800 transition-colors text-sm touch-manipulation">
          Check Status →
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-slate-100 hover:shadow-lg transition-shadow touch-manipulation active:scale-[0.99]">
        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <Luggage className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-800">Baggage Rules</h4>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-3 sm:mb-4">
          Economy: 1 carry-on (7kg) + checked (23kg). Business: 2 carry-ons + 2 checked bags (32kg each).
        </p>
        <button className="text-cyan-600 font-semibold hover:text-cyan-700 active:text-cyan-800 transition-colors text-sm touch-manipulation">
          Learn More →
        </button>
      </div>
    </div>
  );
}
