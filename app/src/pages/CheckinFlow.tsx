import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useCheckin } from '../context/CheckinContext';3
import CheckinForm from '../components/Checkin/CheckinForm';
import PassengerSelect from './PassengerSelect';
import PassengerDetails from './PassengerDetails';
import DangerousGoods from './DangerousGoods';
import BoardingPass from './BoardingPass';
import MobileBottomNav from '../components/nav/MobileBottomNav';
import { useModal } from '../components/ModalProvider';
import { findBooking, ApiError } from '../services/checkin';
import type { CheckinPayload } from '../components/Checkin/CheckinForm';
import { X } from 'lucide-react';
import { useMemo } from 'react';

const STEPS = [
  { path: '/checkin/start', title: 'Find Booking', step: 1 },
  { path: '/checkin/select', title: 'Select Passengers', step: 2 },
  { path: '/checkin/details', title: 'Passenger Details', step: 3 },
  { path: '/checkin/dg', title: 'Dangerous Goods', step: 4 },
  { path: '/checkin/boarding', title: 'Boarding Pass', step: 5 },
];

const TOTAL_STEPS = STEPS.length;

export const CheckinFlow = () => {
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, setBooking, selectedPassengers, setSelectedPassengers, reset } = useCheckin();

  const currentStepInfo = useMemo(() => {
    const stepInfo = STEPS.find(s => s.path === location.pathname);
    return stepInfo || STEPS[0];
  }, [location.pathname]);

  const progress = useMemo(() => {
    return (currentStepInfo.step / TOTAL_STEPS) * 100;
  }, [currentStepInfo.step]);

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

  const handleCancel = () => {

    openModal({
      title: 'Cancel Check-in?',
      message: 'Your progress will be lost. Are you sure you want to cancel?',
      intent: 'warning',
      closeLabel: 'Continue to Check-in',
      footer: (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              closeModal();
              reset();
              navigate('/');
            }}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Yes, Cancel
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header content */}
          <div className="h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="p-2 -ml-2 text-slate-600 hover:text-slate-800 active:bg-slate-100 rounded-lg touch-manipulation transition-colors"
                aria-label="Cancel check-in"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-base font-semibold text-slate-800">Check-in</h1>
                <p className="text-xs text-slate-500">{currentStepInfo.title}</p>
              </div>
            </div>

            <span className="text-xs font-medium text-slate-500">
              Step {currentStepInfo.step} of {TOTAL_STEPS}
            </span>
          </div>

          {/* Modern progress bar */}
          {/* Modern progress bar with slot dividers */}
          <div className="relative h-1.5 bg-gradient-to-r from-slate-100 to-slate-50 overflow-hidden">
            {/* Progress fill */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 to-sky-600 shadow-sm transition-all duration-500 ease-out animate-pulse-glow"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>

            {/* Slot dividers */}
            {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-gray-300/70"
                style={{ left: `${((i + 1) / TOTAL_STEPS) * 100}%` }}
              />
            ))}

            {/* Waiting indicator - glowing gradient edge */}
            {progress < 100 && (
              <div
                className="absolute inset-y-0 w-12 transition-all duration-500 ease-out pointer-events-none"
                style={{ left: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/60 via-sky-500/40 to-transparent animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/30 to-transparent blur-sm" />
              </div>
            )}
          </div>

        </div>
      </div >

      {/* Scrollable content with bottom padding for sticky actions */}
      < div className="flex-1 overflow-y-auto pb-24 sm:pb-28" >
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
      </div >

      <MobileBottomNav />
    </div >
  );
}
