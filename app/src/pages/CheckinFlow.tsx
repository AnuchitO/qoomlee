import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useCheckin } from '../context/CheckinContext';
import CheckinForm from '../components/CheckinForm';
import PassengerSelect from './PassengerSelect';
import PassengerDetails from './PassengerDetails';
import DangerousGoods from './DangerousGoods';
import BoardingPass from './BoardingPass';
import MobileBottomNav from '../components/nav/MobileBottomNav';
import { useModal } from '../components/ModalProvider';
import { findBooking, ApiError } from '../services/checkin';
import type { CheckinPayload } from '../components/CheckinForm';

export const CheckinFlow = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { booking, setBooking, selectedPassengers, setSelectedPassengers, reset } = useCheckin();

  const handleCheckinSubmit = async (payload: CheckinPayload) => {
    try {
      const result = await findBooking(payload);
      setBooking(result);
      navigate('/checkin/select');
    } catch (err) {
      let userMessage = 'An unexpected error occurred. Please try again.';
      if (err instanceof ApiError) {
        userMessage = err.message;
      } else if (err instanceof Error) {
        userMessage = err.message;
      }
      openModal({
        title: 'Check-in Error',
        message: userMessage,
      });
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 flex flex-col">
      {/* Sticky header with cancel */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-semibold text-slate-800">Check-in</h1>
          <button
            type="button"
            onClick={() => {
              reset();
              navigate('/');
            }}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 active:bg-slate-100 rounded-lg touch-manipulation"
          >
            Cancel
          </button>
        </div>
      </div>
      
      {/* Scrollable content with bottom padding for sticky actions */}
      <div className="flex-1 overflow-y-auto pb-24 sm:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Routes>
            <Route path="/checkin/start" element={<CheckinForm onSubmit={handleCheckinSubmit} />} />
            <Route
              path="/checkin/select"
              element={
                booking ? (
                  <PassengerSelect
                    passengers={booking.passengers}
                    onNext={(sel) => {
                      setSelectedPassengers(sel);
                      navigate('/checkin/details');
                    }}
                    onBack={() => navigate('/checkin/start')}
                  />
                ) : (
                  <Navigate to="/checkin/start" replace />
                )
              }
            />
            <Route
              path="/checkin/details"
              element={
                booking && selectedPassengers.length > 0 ? (
                  <PassengerDetails
                    passengers={selectedPassengers}
                    onNext={(_details) => {
                      // could persist details in context
                      navigate('/checkin/dg');
                    }}
                    onBack={() => navigate('/checkin/select')}
                  />
                ) : (
                  <Navigate to="/checkin/select" replace />
                )
              }
            />
            <Route
              path="/checkin/dg"
              element={
                booking && selectedPassengers.length > 0 ? (
                  <DangerousGoods onAccept={() => navigate('/checkin/boarding')} onBack={() => navigate('/checkin/details')} />
                ) : (
                  <Navigate to="/checkin/select" replace />
                )
              }
            />
            <Route
              path="/checkin/boarding"
              element={
                booking && selectedPassengers.length > 0 ? (
                  <BoardingPass booking={booking} passengers={selectedPassengers} />
                ) : (
                  <Navigate to="/checkin/select" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/checkin/start" replace />} />
          </Routes>
        </div>
      </div>
      
      <MobileBottomNav />
    </div>
  );
}
