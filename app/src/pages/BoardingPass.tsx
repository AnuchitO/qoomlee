//
import type { FindBookingResponse, Passenger } from '../types/checkin';

type BoardingPassProps = {
  booking: FindBookingResponse;
  passengers: Passenger[];
};

export default function BoardingPass({ booking, passengers }: BoardingPassProps) {
  const flight = booking.journeys[0];
  const boardingTime = new Date(new Date(flight.departure.time).getTime() - 40 * 60000).toLocaleString();

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-sky-100">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5">Boarding Pass</h3>
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
  );
}

function assignSeat(i: number) {
  const row = 12 + i;
  const letters = ['A', 'C', 'D', 'F'];
  return `${row}${letters[i % letters.length]}`;
}
