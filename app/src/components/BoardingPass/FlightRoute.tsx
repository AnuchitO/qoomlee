import React from 'react';
import { Plane } from 'lucide-react';
import { formatDate } from './dateUtils';
import { getAirportName } from './airportData';

type Flight = {
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  flightNumber: string;
}

interface FlightRouteProps {
  flight: Flight;
  idx: number;
}

export const FlightRoute: React.FC<FlightRouteProps> = ({flight, idx}) => {
  return (
   <div className="mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                   <div className="grid grid-cols-3 items-center">
                     {/* Departure */}
                     <div className="text-center">
                       <div className="h-8 flex items-center justify-center">
                         <span className="text-xs text-slate-600 line-clamp-2 px-2" data-testid={`departureAirportName-${idx}`}>
                           {getAirportName(flight.departure.airport)}
                         </span>
                       </div>
                       <div className="h-16 flex items-center justify-center">
                         <span className="text-4xl font-black text-sky-600 tracking-tight" data-testid={`departureAirportCode-${idx}`}>
                           {flight.departure.airport}
                         </span>
                       </div>
                       <div className="text-xs text-slate-500" data-testid={`departureDate-${idx}`}>
                         {formatDate(flight.departure.time, true)}
                       </div>
                     </div>

                     {/* Flight Info */}
                     <div className="px-2">
                       <div className="relative">
                         <div className="border-t-2 border-dashed border-slate-300"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-2">
                           <Plane className="w-5 h-5 text-sky-600 rotate-90" />
                         </div>
                       </div>
                       <div className="text-center mt-2">
                         <span className="inline-block bg-slate-200 text-slate-700 text-xs font-medium px-2 py-0.5 rounded-full" data-testid={`flightNumber-${idx}`}>
                           {flight.flightNumber}
                         </span>
                       </div>
                     </div>

                     {/* Arrival */}
                     <div className="text-center">
                       <div className="h-8 flex items-center justify-center">
                         <span className="text-xs text-slate-600 line-clamp-2 px-2" data-testid={`arrivalAirportName-${idx}`}>
                           {getAirportName(flight.arrival.airport)}
                         </span>
                       </div>
                       <div className="h-16 flex items-center justify-center">
                         <span className="text-4xl font-black text-sky-600 tracking-tight" data-testid={`arrivalAirportCode-${idx}`}>
                           {flight.arrival.airport}
                         </span>
                       </div>
                       <div className="text-xs text-slate-500" data-testid={`arrivalDate-${idx}`}>
                         {formatDate(flight.arrival.time, true)}
                       </div>
                     </div>
                   </div>
                 </div>
  );
};

export default FlightRoute;
