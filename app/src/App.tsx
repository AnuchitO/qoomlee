import Header from './components/nav/Header';
import Motto from './components/Motto';
import CheckinForm, { CheckinPayload } from './components/Checkin/CheckinForm';
import InfoCards from './components/InfoCards';
import TravelTipsSidebar from './components/TravelTipsSidebar';
import Footer from './components/Footer';
import MobileBottomNav from './components/nav/MobileBottomNav';
import { useModal } from './components/ModalProvider';
import { CheckinFlow } from './pages/CheckinFlow';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCheckin } from './context/CheckinContext';
import { findBooking, ApiError } from './services/checkin';

function App() {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { setBooking } = useCheckin();

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
    return <CheckinFlow />;
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
