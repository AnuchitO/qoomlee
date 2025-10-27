import { useNavigate } from 'react-router-dom';
import { useCheckin } from '../context/CheckinContext';
import type { FindBookingResponse, Passenger } from '../types/checkin';

type BoardingPassProps = {
  booking: FindBookingResponse;
  passengers: Passenger[];
};

export default function BoardingPass({ booking, passengers }: BoardingPassProps) {
  const navigate = useNavigate();
  const { reset } = useCheckin();
  const flight = booking.journeys[0];
  const boardingTime = new Date(new Date(flight.departure.time).getTime() - 40 * 60000).toLocaleString();

  const handleFinish = () => {
    reset();
    navigate('/');
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4">
        <div className="px-5 pt-5 pb-4 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Boarding Pass</h3>
          <p className="text-sm text-slate-600 mt-1.5">Your check-in is complete</p>
        </div>
        <div className="p-5 sm:p-6">
      <div className="space-y-4">
        {passengers.map((p, idx) => (
          <div key={`${p.firstName}-${p.lastName}-${idx}`} className="border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-500">Passenger</div>
                <div className="font-semibold text-slate-800">{p.firstName} {p.lastName}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">Seat</div>
                <div className="font-semibold text-slate-800">{p.seat ?? assignSeat(idx)}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-slate-500">From</div>
                <div className="text-base font-semibold text-slate-800">{flight.departure.airport}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">To</div>
                <div className="text-base font-semibold text-slate-800">{flight.arrival.airport}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Flight</div>
                <div className="text-base font-semibold text-slate-800">{flight.flightNumber}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xs text-slate-500">Departure</div>
                <div className="text-base font-semibold text-slate-800">{new Date(flight.departure.time).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Boarding</div>
                <div className="text-base font-semibold text-slate-800">{boardingTime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>

      {/* Sticky Finish button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30 safe-area-inset-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <button
            type="button"
            onClick={handleFinish}
            className="w-full inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] touch-manipulation"
          >
            Finish
          </button>
        </div>
      </div>
    </>
  );
}

function assignSeat(i: number) {
  const row = 12 + i;
  const letters = ['A', 'C', 'D', 'F'];
  return `${row}${letters[i % letters.length]}`;
}
