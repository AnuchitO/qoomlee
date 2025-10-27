import { createContext, useContext, useMemo, useState } from 'react';
import type { FindBookingResponse, Passenger, PassengerExtraDetails } from '../types/checkin';

export type CheckinState = {
  booking: FindBookingResponse | null;
  selectedPassengers: Passenger[];
  details: Record<string, PassengerExtraDetails>;
};

type Ctx = CheckinState & {
  setBooking: (b: FindBookingResponse | null) => void;
  setSelectedPassengers: (p: Passenger[]) => void;
  setDetails: (d: Record<string, PassengerExtraDetails>) => void;
  reset: () => void;
};

const CheckinContext = createContext<Ctx | undefined>(undefined);

export function CheckinProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<FindBookingResponse | null>(null);
  const [selectedPassengers, setSelectedPassengers] = useState<Passenger[]>([]);
  const [details, setDetails] = useState<Record<string, PassengerExtraDetails>>({});

  const value = useMemo(
    () => ({
      booking,
      selectedPassengers,
      details,
      setBooking,
      setSelectedPassengers,
      setDetails,
      reset: () => {
        setBooking(null);
        setSelectedPassengers([]);
        setDetails({});
      },
    }),
    [booking, selectedPassengers, details]
  );

  return <CheckinContext.Provider value={value}>{children}</CheckinContext.Provider>;
}

export function useCheckin() {
  const ctx = useContext(CheckinContext);
  if (!ctx) throw new Error('useCheckin must be used within CheckinProvider');
  return ctx;
}
