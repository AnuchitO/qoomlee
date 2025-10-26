import Header from './components/nav/Header';
import Motto from './components/Motto';
import CheckinForm, { CheckinPayload } from './components/CheckinForm';
import InfoCards from './components/InfoCards';
import TravelTipsSidebar from './components/TravelTipsSidebar';
import Footer from './components/Footer';
import MobileBottomNav from './components/nav/MobileBottomNav';

function App() {
  function handleCheckinSubmit(payload: CheckinPayload) {
    // Replace with actual API call
    console.log('Finding booking for:', payload);
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
