import { useState } from 'react';
import { Plane, Menu, X, Clock, Luggage, MapPin, CheckCircle, Home, Send } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastName, setLastName] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Finding booking for:', { lastName, bookingRef });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-sky-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
              <div className="relative">
                <Plane className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 duration-300" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Qoomlee</h1>
                <p className="text-xs text-sky-600 -mt-1">Airline</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-700 hover:text-sky-600 transition-colors font-medium">Home</a>
              <a href="#" className="text-slate-700 hover:text-sky-600 transition-colors font-medium">Flights</a>
              <a href="#" className="text-slate-700 hover:text-sky-600 transition-colors font-medium">Manage Booking</a>
              <a href="#" className="text-sky-600 font-semibold border-b-2 border-sky-600 pb-1">Check-in</a>
              <a href="#" className="text-slate-700 hover:text-sky-600 transition-colors font-medium">Contact</a>
            </div>

            {/* Mobile - Empty space for symmetry */}
            <div className="md:hidden w-12"></div>
          </div>

        </nav>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 text-white py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 animate-fadeIn">Online Check-in</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-sky-100 mb-1 sm:mb-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>Fly Smart. Fly Qoomlee.</p>
          <p className="text-sm sm:text-base text-sky-100 animate-fadeIn" style={{ animationDelay: '0.2s' }}>Check in online and save time at the airport</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Check-in Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-sky-100 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5 sm:mb-6">Check-in</h3>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3.5 sm:py-3 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all touch-manipulation"
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="bookingRef" className="block text-sm font-semibold text-slate-700 mb-2">
                    Booking Reference or PNR
                  </label>
                  <input
                    type="text"
                    id="bookingRef"
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value)}
                    className="w-full px-4 py-3.5 sm:py-3 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all uppercase touch-manipulation"
                    placeholder="e.g., ABC123 or 1234567890123"
                    autoComplete="off"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold py-4 sm:py-4 text-base sm:text-lg rounded-lg hover:from-sky-700 hover:to-cyan-700 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
                >
                  Find My Booking
                </button>
              </form>

              <div className="mt-5 sm:mt-6 p-3.5 sm:p-4 bg-sky-50 rounded-lg border border-sky-100">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-sky-700">Tip:</span> Online check-in opens 24 hours before departure and closes 2 hours before your flight.
                </p>
              </div>
            </div>

            {/* Flight Status & Baggage Rules */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-slate-100 hover:shadow-lg transition-shadow touch-manipulation active:scale-[0.99]">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-800">Flight Status</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-3 sm:mb-4">
                  Track your flight in real-time. Get updates on departure, arrival, gate changes, and delays.
                </p>
                <button className="text-sky-600 font-semibold hover:text-sky-700 active:text-sky-800 transition-colors text-sm touch-manipulation">
                  Check Status →
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-slate-100 hover:shadow-lg transition-shadow touch-manipulation active:scale-[0.99]">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Luggage className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-800">Baggage Rules</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-3 sm:mb-4">
                  Economy: 1 carry-on (7kg) + checked (23kg). Business: 2 carry-ons + 2 checked bags (32kg each).
                </p>
                <button className="text-cyan-600 font-semibold hover:text-cyan-700 active:text-cyan-800 transition-colors text-sm touch-manipulation">
                  Learn More →
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Travel Tips */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-50 to-sky-50 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-sky-100 lg:sticky lg:top-24">
              <div className="flex items-center space-x-3 mb-5 sm:mb-6">
                <div className="p-2 bg-sky-600 rounded-lg">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Travel Tips</h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">Arrive Early</h5>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Arrive 2-3 hours before international flights, 1-2 hours for domestic.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">Valid Documents</h5>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Ensure your passport is valid for 6 months beyond your travel dates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">Mobile Boarding</h5>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Download your boarding pass to your phone for quick access.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">Pack Smart</h5>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Keep liquids in containers ≤100ml and place in a clear bag.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">Stay Informed</h5>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Check visa requirements and travel advisories for your destination.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 bg-white rounded-lg border border-sky-200">
                <p className="text-xs text-slate-500 text-center">
                  Need help? Contact our 24/7 support team
                </p>
                <p className="text-sky-600 font-bold text-center mt-1 text-sm sm:text-base">+1-800-QOOMLEE</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Plane className="w-6 h-6 text-sky-400" />
                <span className="text-xl font-bold">Qoomlee</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">Your trusted partner in the skies. Fly smart, fly safe, fly Qoomlee.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-base">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Book a Flight</a></li>
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Flight Status</a></li>
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Manage Booking</a></li>
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Check-in</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-base">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Help Center</a></li>
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Contact Us</a></li>
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">FAQs</a></li>
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Baggage Info</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-base">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Terms of Service</a></li>
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Accessibility</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-400">
            <p>© 2024 Qoomlee Airline. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 safe-area-inset-bottom">
        <div className="grid grid-cols-5 h-16">
          <a
            href="#"
            className="flex flex-col items-center justify-center space-y-1 text-slate-600 hover:text-sky-600 active:bg-sky-50 transition-colors touch-manipulation"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </a>

          <a
            href="#"
            className="flex flex-col items-center justify-center space-y-1 text-slate-600 hover:text-sky-600 active:bg-sky-50 transition-colors touch-manipulation"
          >
            <Plane className="w-5 h-5" />
            <span className="text-xs font-medium">Flights</span>
          </a>

          <a
            href="#"
            className="flex flex-col items-center justify-center space-y-1 text-sky-600 bg-sky-50 transition-colors touch-manipulation relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-sky-600 rounded-b-full"></div>
            <CheckCircle className="w-5 h-5" />
            <span className="text-xs font-semibold">Check-in</span>
          </a>

          <a
            href="#"
            className="flex flex-col items-center justify-center space-y-1 text-slate-600 hover:text-sky-600 active:bg-sky-50 transition-colors touch-manipulation"
          >
            <Luggage className="w-5 h-5" />
            <span className="text-xs font-medium">Booking</span>
          </a>

          <a
            href="#"
            className="flex flex-col items-center justify-center space-y-1 text-slate-600 hover:text-sky-600 active:bg-sky-50 transition-colors touch-manipulation"
          >
            <Send className="w-5 h-5" />
            <span className="text-xs font-medium">Contact</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default App;
