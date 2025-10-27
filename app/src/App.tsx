import { useState } from 'react';
import Header from './components/nav/Header';
import Motto from './components/Motto';
import CheckinForm, { CheckinPayload } from './components/CheckinForm';
import InfoCards from './components/InfoCards';
import TravelTipsSidebar from './components/TravelTipsSidebar';
import Footer from './components/Footer';
import MobileBottomNav from './components/nav/MobileBottomNav';
import { useModal } from './components/ModalProvider';
import PassengerSelect from './pages/PassengerSelect';
import PassengerDetails from './pages/PassengerDetails';
import DangerousGoods from './pages/DangerousGoods';
import BoardingPass from './pages/BoardingPass';
import type { FindBookingResponse, Passenger } from './types/checkin';

class ApiError extends Error {
  code: string;
  status: number;
  userMessage: string;
  details?: unknown;

  constructor({ code, status, message, userMessage, details }: { code: string; status: number; message: string; userMessage: string; details?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.userMessage = userMessage;
    this.details = details;
  }
}

function findBooking(payload: CheckinPayload): Promise<FindBookingResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.bookingRef === 'ABC123' && payload.lastName === 'HUUM') {
        resolve({
          checkinKey: 'CHK-P3G5HN-001',
          isEligible: true,
          bookingRef: payload.bookingRef,
          journeys: [
            {
              flightNumber: 'QL123',
              departure: { airport: 'BKK', time: new Date(Date.now() + 24 * 3600 * 1000).toISOString() },
              arrival: { airport: 'SIN', time: new Date(Date.now() + 26 * 3600 * 1000).toISOString() },
              segmentStatus: 'CHECKIN_OPEN',
              marketingCarrier: 'QL',
              operatingCarrier: 'QL',
            },
          ],
          passengers: [
            {
              firstName: 'ALEX',
              lastName: 'HUUM',
              paxType: 'ADT',
              seat: null,
              checkedIn: false,
            },
          ],
        });
      } else {
        reject(
          new ApiError({
            code: 'BOOKING_NOT_FOUND',
            status: 404,
            message: 'Booking not found',
            userMessage: 'We couldn’t find your booking. Check your details and try again.',
            details: {
              bookingRef: payload.bookingRef,
              lastName: payload.lastName,
              timestamp: new Date().toISOString(),
              correlationId: `mock-${Math.random().toString(36).slice(2, 10)}`,
            },
          })
        );
      }
    }, 300);
  });
}

function App() {
  const { openModal } = useModal();
  const [step, setStep] = useState<'start' | 'select' | 'details' | 'dangerous' | 'boarding'>('start');
  const [booking, setBooking] = useState<FindBookingResponse | null>(null);
  const [selectedPassengers, setSelectedPassengers] = useState<Passenger[]>([]);

  async function handleCheckinSubmit(payload: CheckinPayload) {
    try {
      const res = await findBooking(payload);
      setBooking(res);
      setStep('select');
    } catch (err) {
      const isApiError = err instanceof ApiError;
      const userMessage = isApiError ? err.userMessage : 'Something went wrong. Please try again later.';
      openModal({
        title: 'Unable to retrieve booking',
        intent: 'error',
        message: userMessage,
      });
      return;
    }
  }

  return (
    <div id="home" className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 pb-20 md:pb-0">
      <Header />
      <Motto />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div id="manage" />
            <div id="checkin">
              {step === 'start' && <CheckinForm onSubmit={handleCheckinSubmit} />}
              {step === 'select' && booking && (
                <PassengerSelect
                  passengers={booking.passengers}
                  onNext={(sel) => {
                    setSelectedPassengers(sel);
                    setStep('details');
                  }}
                  onBack={() => setStep('start')}
                />
              )}
              {step === 'details' && booking && (
                <PassengerDetails
                  passengers={selectedPassengers}
                  onNext={(_details) => {
                    setStep('dangerous');
                  }}
                  onBack={() => setStep('select')}
                />
              )}
              {step === 'dangerous' && booking && (
                <DangerousGoods
                  onAccept={() => setStep('boarding')}
                  onBack={() => setStep('details')}
                />
              )}
              {step === 'boarding' && booking && (
                <BoardingPass booking={booking} passengers={selectedPassengers} />
              )}
            </div>
            <div id="flights">
              <InfoCards />
            </div>
          </div>

          <div className="lg:col-span-1">
            <TravelTipsSidebar />
          </div>
        </div>
      </div>

      <div id="contact">
        <Footer />
      </div>
      <MobileBottomNav />
    </div>
  );
}

export default App;
