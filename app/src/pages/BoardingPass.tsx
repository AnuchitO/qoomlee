import { useNavigate } from 'react-router-dom';
import { useCheckin } from '../context/CheckinContext';
import type { FindBookingResponse, Passenger } from '../types/checkin';
import { Plane } from 'lucide-react';
import AppleWalletIcon from '../assets/Apple_Wallet_Icon.svg';

// Function to get full airport name by IATA code
const getAirportName = (iataCode: string): string => {
  const airportNames: Record<string, string> = {
    // Thailand
    'BKK': 'Suvarnabhumi Airport, Bangkok',
    'DMK': 'Don Mueang International Airport, Bangkok',
    'CNX': 'Chiang Mai International Airport',
    'HKT': 'Phuket International Airport',
    'HDY': 'Hat Yai International Airport',
    'KBV': 'Krabi International Airport',
    'USM': 'Koh Samui Airport',
    'URT': 'Surat Thani International Airport',
    'CEI': 'Chiang Rai International Airport',
    
    // Singapore
    'SIN': 'Changi Airport, Singapore',
    
    // Malaysia
    'KUL': 'Kuala Lumpur International Airport',
    'PEN': 'Penang International Airport',
    'LGK': 'Langkawi International Airport',
    'BKI': 'Kota Kinabalu International Airport',
    
    // Vietnam
    'SGN': 'Tan Son Nhat International Airport, Ho Chi Minh City',
    'HAN': 'Noi Bai International Airport, Hanoi',
    'DAD': 'Da Nang International Airport',
    
    // Japan
    'NRT': 'Narita International Airport, Tokyo',
    'HND': 'Haneda Airport, Tokyo',
    'KIX': 'Kansai International Airport, Osaka',
    'FUK': 'Fukuoka Airport',
    'CTS': 'New Chitose Airport, Sapporo',
    
    // South Korea
    'ICN': 'Incheon International Airport, Seoul',
    'GMP': 'Gimpo International Airport, Seoul',
    'PUS': 'Gimhae International Airport, Busan',
    
    // China
    'PEK': 'Beijing Capital International Airport',
    'PVG': 'Shanghai Pudong International Airport',
    'CAN': 'Guangzhou Baiyun International Airport',
    'HKG': 'Hong Kong International Airport',
    'TPE': 'Taiwan Taoyuan International Airport',
    'MFM': 'Macau International Airport',
    
    // Middle East
    'DXB': 'Dubai International Airport',
    'AUH': 'Abu Dhabi International Airport',
    'DOH': 'Hamad International Airport, Doha',
    'BAH': 'Bahrain International Airport',
    
    // Europe
    'LHR': 'Heathrow Airport, London',
    'CDG': 'Charles de Gaulle Airport, Paris',
    'FRA': 'Frankfurt Airport',
    'AMS': 'Amsterdam Airport Schiphol',
    'FCO': 'Leonardo da Vinci–Fiumicino Airport, Rome',
    'MAD': 'Adolfo Suárez Madrid–Barajas Airport',
    'IST': 'Istanbul Airport',
    
    // North America
    'JFK': 'John F. Kennedy International Airport, New York',
    'LAX': 'Los Angeles International Airport',
    'SFO': 'San Francisco International Airport',
    'YVR': 'Vancouver International Airport',
    'YYZ': 'Toronto Pearson International Airport',
    
    // Oceania
    'SYD': 'Sydney Airport',
    'MEL': 'Melbourne Airport',
    'BNE': 'Brisbane Airport',
    'AKL': 'Auckland Airport',
    
    // Other Major Asian
    'DEL': 'Indira Gandhi International Airport, Delhi',
    'BOM': 'Chhatrapati Shivaji Maharaj International Airport, Mumbai',
    'MNL': 'Ninoy Aquino International Airport, Manila',
    'CGK': 'Soekarno–Hatta International Airport, Jakarta',
    'BWN': 'Brunei International Airport',
    'RGN': 'Yangon International Airport',
    'REP': 'Siem Reap International Airport',
    'PNH': 'Phnom Penh International Airport',
    'VTE': 'Wattay International Airport, Vientiane',
    'DPS': 'Ngurah Rai International Airport, Bali',
    
    // Additional Thai airports
    'LPT': 'Lampang Airport',
    'NST': 'Nakhon Si Thammarat Airport',
    'NAW': 'Narathiwat Airport',
    'PHS': 'Phitsanulok Airport',
    'HGN': 'Mae Hong Son Airport',
    'THS': 'Sukhothai Airport',
    'TST': 'Trang Airport',
    'TDX': 'Trat Airport',
    'UTP': 'U-Tapao International Airport, Rayong',
    'UBP': 'Ubon Ratchathani Airport',
    'UTH': 'Udon Thani International Airport'
  };
  
  return airportNames[iataCode] || iataCode;
};

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

              {/* Flight route with airport details */}
              <div className="mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <div className="text-xs text-slate-600 mb-1 max-w-[120px] mx-auto">
                      {getAirportName(flight.departure.airport)}
                    </div>
                    <div className="text-4xl font-black text-sky-600 tracking-tight">{flight.departure.airport}</div>
                    <div className="text-xs text-slate-500 mt-1">{departureDate}</div>
                  </div>
                  
                  <div className="flex-1 px-2">
                    <div className="relative">
                      <div className="border-t-2 border-dashed border-slate-300"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-2">
                        <Plane className="w-5 h-5 text-sky-600 rotate-90" />
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <span className="inline-block bg-slate-200 text-slate-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        {flight.flightNumber}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center flex-1">
                    <div className="text-xs text-slate-600 mb-1 max-w-[120px] mx-auto">
                      {getAirportName(flight.arrival.airport)}
                    </div>
                    <div className="text-4xl font-black text-sky-600 tracking-tight">{flight.arrival.airport}</div>
                    <div className="text-xs text-slate-500 mt-1">{departureDate}</div>
                  </div>
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
