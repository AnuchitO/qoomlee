//
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
//
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useCheckin } from './context/CheckinContext';
import { findBooking, ApiError } from './services/checkin';

function App() {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, setBooking, selectedPassengers, setSelectedPassengers, reset } = useCheckin();

  async function handleCheckinSubmit(payload: CheckinPayload) {
    try {
      const res = await findBooking(payload);
      setBooking(res);
      navigate('/checkin/select');
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

  const isCheckin = location.pathname.startsWith('/checkin');

  if (isCheckin) {
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

  return (
    <div id="home" className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 pb-20 md:pb-0">
      <Header />
      <Motto />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div id="manage" />
            <div id="checkin">
              <CheckinForm onSubmit={handleCheckinSubmit} />
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
