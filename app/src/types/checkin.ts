export type JourneySegment = {
  flightNumber: string;
  departure: { airport: string; time: string };
  arrival: { airport: string; time: string };
  segmentStatus: 'SCHEDULED' | 'CHECKIN_OPEN' | 'CLOSED';
  marketingCarrier: string;
  operatingCarrier: string;
};

export enum PaxType {
  ADT = 'ADT',
  CHD = 'CHD',
  INF = 'INF',
}

export type Passenger = {
  firstName: string;
  lastName: string;
  paxType: PaxType;
  seat?: string | null;
  checkedIn: boolean;
};

export type FindBookingResponse = {
  checkinKey: string;
  isEligible: boolean;
  bookingRef: string;
  journeys: JourneySegment[];
  passengers: Passenger[];
};

export type PassengerExtraDetails = {
  nationality: string;
  phone: string;
  countryCode: string;
};
