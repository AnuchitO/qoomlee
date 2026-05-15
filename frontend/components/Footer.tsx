'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">✈️</span>
              Qoomlee Airline
            </h3>
            <p className="text-gray-300">
              Shine and fly, reach the sky. Connecting people across the world with comfort and reliability.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/search" className="text-gray-300 hover:text-white transition-colors">Search Flights</a></li>
              <li><a href="/booking" className="text-gray-300 hover:text-white transition-colors">My Bookings</a></li>
              <li><a href="/checkin" className="text-gray-300 hover:text-white transition-colors">Online Check-in</a></li>
              <li><a href="/manage" className="text-gray-300 hover:text-white transition-colors">Manage Booking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/support" className="text-gray-300 hover:text-white transition-colors">Customer Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <address className="not-italic text-gray-300">
              <p>Qoomlee Airlines</p>
              <p>123 Aviation Way</p>
              <p>Bangkok, Thailand</p>
              <p className="mt-2">Phone: +66 2 123 4567</p>
              <p>Email: info@qoomlee-airline.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Qoomlee Airline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}