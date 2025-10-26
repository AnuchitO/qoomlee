import { useState } from 'react';
import { Plane, Menu, X, Clock, Luggage, MapPin, CheckCircle } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastName, setLastName] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Finding booking for:', { lastName, bookingRef });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-sky-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Plane className="w-8 h-8 text-sky-600 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 duration-300" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Qoolee</h1>
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-sky-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-sky-100 animate-fadeIn">
              <a href="#" className="block text-slate-700 hover:text-sky-600 transition-colors font-medium py-2">Home</a>
              <a href="#" className="block text-slate-700 hover:text-sky-600 transition-colors font-medium py-2">Flights</a>
              <a href="#" className="block text-slate-700 hover:text-sky-600 transition-colors font-medium py-2">Manage Booking</a>
              <a href="#" className="block text-sky-600 font-semibold py-2">Check-in</a>
              <a href="#" className="block text-slate-700 hover:text-sky-600 transition-colors font-medium py-2">Contact</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">Online Check-in</h2>
          <p className="text-xl md:text-2xl text-sky-100 mb-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>Fly Smart. Fly Qoolee.</p>
          <p className="text-sky-100 animate-fadeIn" style={{ animationDelay: '0.2s' }}>Check in online and save time at the airport</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Check-in Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-sky-100 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Find Your Booking</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="bookingRef" className="block text-sm font-semibold text-slate-700 mb-2">
                    Booking Reference or Ticket Number
                  </label>
                  <input
                    type="text"
                    id="bookingRef"
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all uppercase"
                    placeholder="e.g., ABC123 or 1234567890123"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold py-4 rounded-lg hover:from-sky-700 hover:to-cyan-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Find My Booking
                </button>
              </form>

              <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-100">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-sky-700">Tip:</span> Online check-in opens 24 hours before departure and closes 2 hours before your flight.
                </p>
              </div>
            </div>

            {/* Flight Status & Baggage Rules */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <Clock className="w-6 h-6 text-sky-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800">Flight Status</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Track your flight in real-time. Get updates on departure, arrival, gate changes, and delays.
                </p>
                <button className="mt-4 text-sky-600 font-semibold hover:text-sky-700 transition-colors text-sm">
                  Check Status →
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Luggage className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800">Baggage Rules</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Economy: 1 carry-on (7kg) + checked (23kg). Business: 2 carry-ons + 2 checked bags (32kg each).
                </p>
                <button className="mt-4 text-cyan-600 font-semibold hover:text-cyan-700 transition-colors text-sm">
                  Learn More →
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Travel Tips */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-50 to-sky-50 rounded-2xl shadow-lg p-8 border border-sky-100 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-sky-600 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Travel Tips</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1">Arrive Early</h5>
                    <p className="text-sm text-slate-600">Arrive 2-3 hours before international flights, 1-2 hours for domestic.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1">Valid Documents</h5>
                    <p className="text-sm text-slate-600">Ensure your passport is valid for 6 months beyond your travel dates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1">Mobile Boarding</h5>
                    <p className="text-sm text-slate-600">Download your boarding pass to your phone for quick access.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1">Pack Smart</h5>
                    <p className="text-sm text-slate-600">Keep liquids in containers ≤100ml and place in a clear bag.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-1">Stay Informed</h5>
                    <p className="text-sm text-slate-600">Check visa requirements and travel advisories for your destination.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white rounded-lg border border-sky-200">
                <p className="text-xs text-slate-500 text-center">
                  Need help? Contact our 24/7 support team
                </p>
                <p className="text-sky-600 font-bold text-center mt-1">+1-800-QOOLEE</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="w-6 h-6 text-sky-400" />
                <span className="text-xl font-bold">Qoolee</span>
              </div>
              <p className="text-slate-400 text-sm">Your trusted partner in the skies. Fly smart, fly safe, fly Qoolee.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Book a Flight</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Flight Status</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Manage Booking</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Check-in</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Baggage Info</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>© 2024 Qoolee Airline. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

