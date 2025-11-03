import { useNavigate } from 'react-router-dom';
import { useCheckin } from '../context/CheckinContext';
import type { FindBookingResponse, Passenger } from '../types/checkin';
import { Plane } from 'lucide-react';
import AppleWalletIcon from '../assets/Apple_Wallet_Icon.svg';

type BoardingPassProps = {
  booking: FindBookingResponse;
  passengers: Passenger[];
};

export default function BoardingPass({ booking, passengers }: BoardingPassProps) {
  const navigate = useNavigate();
  const { reset } = useCheckin();
  const flight = booking.journeys[0];
  
  // Format time as HH:MM
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // Format date as DD MMM
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
  };
  
  const departureTime = formatTime(flight.departure.time);
  const departureDate = formatDate(flight.departure.time);
  const boardingTime = formatTime(new Date(new Date(flight.departure.time).getTime() - 40 * 60000).toISOString());
  
  // Mock gate and terminal data
  const getGate = (idx: number) => `${String.fromCharCode(65 + (idx % 4))}${12 + idx}`;
  const terminal = '2';

  const handleFinish = () => {
    reset();
    navigate('/');
  };
  
  const handleAddToWallet = (passenger: Passenger) => {
    // In a real app, this would generate a .pkpass file
    alert(`Adding boarding pass for ${passenger.firstName} ${passenger.lastName} to Apple Wallet`);
  };

  return (
    <>
      <div className="space-y-4 mb-4">
        {passengers.map((p, idx) => (
          <div key={`${p.firstName}-${p.lastName}-${idx}`} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header with Qoomlee branding */}
            <div className="bg-gradient-to-r from-sky-600 to-cyan-600 px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plane className="w-6 h-6 text-white" />
                  <span className="text-2xl font-bold text-white tracking-tight">Qoomlee</span>
                </div>
                <div className="text-white text-sm font-medium">Boarding Pass</div>
              </div>
            </div>

            {/* Main boarding pass content */}
            <div className="p-5">
              {/* Passenger name */}
              <div className="mb-4">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Passenger</div>
                <div className="text-xl font-bold text-slate-900">{p.firstName} {p.lastName}</div>
                <div className="text-sm text-slate-600 mt-1">{p.paxType} • PNR: {booking.bookingRef}</div>
              </div>

              {/* Flight route - Large airport codes */}
              <div className="flex items-center justify-between mb-6 bg-slate-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-4xl font-black text-slate-900 tracking-tight">{flight.departure.airport}</div>
                  <div className="text-xs text-slate-500 mt-1">{departureDate}</div>
                </div>
                <div className="flex-1 px-4">
                  <div className="relative">
                    <div className="border-t-2 border-dashed border-slate-300"></div>
                    <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-sky-600 bg-slate-50 px-1 rotate-90" />
                  </div>
                  <div className="text-center text-xs text-slate-500 mt-1">{flight.flightNumber}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-slate-900 tracking-tight">{flight.arrival.airport}</div>
                  <div className="text-xs text-slate-500 mt-1">{departureDate}</div>
                </div>
              </div>

              {/* Flight details grid */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-500 mb-1">Terminal</div>
                  <div className="text-2xl font-bold text-slate-900">{terminal}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-500 mb-1">Gate</div>
                  <div className="text-2xl font-bold text-slate-900">{getGate(idx)}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-500 mb-1">Seat</div>
                  <div className="text-2xl font-bold text-slate-900">{p.seat ?? assignSeat(idx)}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-500 mb-1">Boarding</div>
                  <div className="text-lg font-bold text-sky-600">{boardingTime}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">Departure</div>
                  <div className="text-xl font-bold text-slate-900">{departureTime}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">Arrival</div>
                  <div className="text-xl font-bold text-slate-900">{formatTime(flight.arrival.time)}</div>
                </div>
              </div>

              {/* Barcode and Add to Wallet */}
              <div className="border-t border-dashed border-slate-300 pt-4 mt-4">
                {/* Barcode */}
                <div className="mb-4">
                  <div className="bg-white border-2 border-slate-200 rounded-lg p-4 flex items-center justify-center">
                    <svg viewBox="0 0 200 60" className="w-full h-16">
                      <g fill="black">
                        {/* Generate barcode pattern */}
                        <rect x="5" y="5" width="2" height="50" />
                        <rect x="10" y="5" width="4" height="50" />
                        <rect x="17" y="5" width="2" height="50" />
                        <rect x="22" y="5" width="3" height="50" />
                        <rect x="28" y="5" width="2" height="50" />
                        <rect x="33" y="5" width="5" height="50" />
                        <rect x="41" y="5" width="2" height="50" />
                        <rect x="46" y="5" width="3" height="50" />
                        <rect x="52" y="5" width="2" height="50" />
                        <rect x="57" y="5" width="4" height="50" />
                        <rect x="64" y="5" width="2" height="50" />
                        <rect x="69" y="5" width="3" height="50" />
                        <rect x="75" y="5" width="5" height="50" />
                        <rect x="83" y="5" width="2" height="50" />
                        <rect x="88" y="5" width="4" height="50" />
                        <rect x="95" y="5" width="2" height="50" />
                        <rect x="100" y="5" width="3" height="50" />
                        <rect x="106" y="5" width="2" height="50" />
                        <rect x="111" y="5" width="5" height="50" />
                        <rect x="119" y="5" width="2" height="50" />
                        <rect x="124" y="5" width="3" height="50" />
                        <rect x="130" y="5" width="2" height="50" />
                        <rect x="135" y="5" width="4" height="50" />
                        <rect x="142" y="5" width="2" height="50" />
                        <rect x="147" y="5" width="3" height="50" />
                        <rect x="153" y="5" width="5" height="50" />
                        <rect x="161" y="5" width="2" height="50" />
                        <rect x="166" y="5" width="4" height="50" />
                        <rect x="173" y="5" width="2" height="50" />
                        <rect x="178" y="5" width="3" height="50" />
                        <rect x="184" y="5" width="2" height="50" />
                        <rect x="189" y="5" width="6" height="50" />
                      </g>
                    </svg>
                  </div>
                  <div className="text-center text-xs text-slate-500 mt-2">
                    Scan at security and boarding gate
                  </div>
                </div>

                {/* Add to Apple Wallet button */}
                <button
                  onClick={() => handleAddToWallet(p)}
                  className="w-full bg-black text-white rounded-xl px-4 py-3.5 flex items-center justify-center gap-3 hover:bg-slate-800 active:scale-[0.98] transition-all"
                >
                  <img src={AppleWalletIcon} alt="Apple Wallet" className="w-8 h-8" />
                  <span className="font-semibold text-base">Add to Apple Wallet</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Finish button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30 safe-area-inset-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <button
            type="button"
            onClick={handleFinish}
            className="w-full inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] touch-manipulation"
          >
            Done
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
