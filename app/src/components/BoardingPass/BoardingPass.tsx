import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckin } from '../../context/CheckinContext';
import { Plane } from 'lucide-react';
import { formatTime, formatDate, formatDay, getBoardingTime } from './dateUtils';
import { getAirportName } from './airportData';
import type { BoardingPassProps } from './types';

const AppleWalletIcon = '/src/assets/Apple_Wallet_Icon.svg';

const BoardingPass: React.FC<BoardingPassProps> = ({ booking, passengers }) => {
  const navigate = useNavigate();
  const { reset } = useCheckin();
  const flight = booking.journeys[0];
  const boardingTime = getBoardingTime(flight.departure.time);
  const formattedBoardingTime = formatTime(boardingTime);

  const handleFinish = () => {
    reset();
    navigate('/');
  };

  const handleAddToWallet = (passenger: { firstName: string; lastName: string }) => {
    alert(`Adding boarding pass for ${passenger.firstName} ${passenger.lastName} to Apple Wallet`);
  };

  return (
    <div className="space-y-4 mb-4">
      {passengers.map((passenger, idx) => (
        <div key={`${passenger.firstName}-${passenger.lastName}-${idx}`} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
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
            {/* Passenger and gate info */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Passenger</div>
                <div className="text-xl font-bold text-slate-900">{passenger.firstName} {passenger.lastName}</div>
                <div className="text-sm text-slate-600 mt-1" data-testid={`paxType-${idx}`}>
                  {passenger.paxType} • PNR: {booking.bookingRef}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-0.5">Boarding</div>
                  <div className="text-xl font-bold text-sky-600" data-testid={`boardingTime-${idx}`}>
                    {formattedBoardingTime.hours}:{formattedBoardingTime.minutes}
                  </div>
                </div>
              </div>
            </div>

            {/* Flight details */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-xs text-slate-500 mb-1">Departure</div>
                <div className="text-xl font-bold text-slate-900">
                  {formatTime(flight.departure.time).hours}:{formatTime(flight.departure.time).minutes}
                  <span className="text-sm font-normal text-slate-500 ml-1.5">
                    {formatTime(flight.departure.time).timezone}
                  </span>
                </div>
                <div className="flex items-center text-xs text-slate-500 mt-1" data-testid={`departureDay-${idx}`}>
                  <span>{formatDay(flight.departure.time)}</span>
                  <span className="mx-1">•</span>
                  <span>{formatDate(flight.departure.time, true)}</span>
                </div>
                <div className="text-sm mt-1">{getAirportName(flight.departure.airport)}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-xs text-slate-500 mb-1">Arrival</div>
                <div className="text-xl font-bold text-slate-900">
                  {formatTime(flight.arrival.time).hours}:{formatTime(flight.arrival.time).minutes}
                  <span className="text-sm font-normal text-slate-500 ml-1.5">
                    {formatTime(flight.arrival.time).timezone}
                  </span>
                </div>
                <div className="flex items-center text-xs text-slate-500 mt-1" data-testid={`arrivalDay-${idx}`}>
                  <span>{formatDay(flight.arrival.time)}</span>
                  <span className="mx-1">•</span>
                  <span>{formatDate(flight.arrival.time, true)}</span>
                </div>
                <div className="text-sm mt-1">{getAirportName(flight.arrival.airport)}</div>
              </div>
            </div>

            {/* Seat and Boarding Info */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-500 mb-1">Seat</div>
                <div className="text-2xl font-bold text-slate-900">
                  {passenger.seat || '--'}
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-500 mb-1">Zone</div>
                <div className="text-2xl font-bold text-slate-900">
                  {passenger.boardingZone || '--'}
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-500 mb-1">Seq</div>
                <div className="text-2xl font-bold text-slate-900">
                  {passenger.boardingSequence || '--'}
                </div>
              </div>
            </div>

            {/* Barcode and Add to Wallet */}
            <div className="border-t border-dashed border-slate-300 pt-4 mt-4">
              {/* Barcode */}
              <div className="mb-4">
                <div className="bg-white border-2 border-slate-200 rounded-lg p-4 flex items-center justify-center">
                  <svg viewBox="0 0 200 60" className="w-full h-16">
                    <g fill="black">
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
                    </g>
                  </svg>
                </div>
              </div>

              {/* Add to Wallet Button */}
              <button
                onClick={() => handleAddToWallet(passenger)}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                data-testid={`add-to-wallet-${idx}`}
              >
                <img src={AppleWalletIcon} alt="" className="w-5 h-5" />
                Add to Apple Wallet
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Done Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleFinish}
          className="bg-sky-600 text-white py-3 px-8 rounded-full font-medium hover:bg-sky-700 transition-colors"
          data-testid="done-button"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default BoardingPass;
