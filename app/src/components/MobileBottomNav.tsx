import { Home, Plane, CheckCircle, Luggage, Send } from 'lucide-react';

export default function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16">
        <a href="#" className="flex flex-col items-center justify-center space-y-1 text-slate-600 hover:text-sky-600 active:bg-sky-50 transition-colors touch-manipulation">
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center space-y-1 text-slate-600 hover:text-sky-600 active:bg-sky-50 transition-colors touch-manipulation">
          <Plane className="w-5 h-5" />
          <span className="text-xs font-medium">Flights</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center space-y-1 text-sky-600 bg-sky-50 transition-colors touch-manipulation relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-sky-600 rounded-b-full" />
          <CheckCircle className="w-5 h-5" />
          <span className="text-xs font-semibold">Check-in</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center space-y-1 text-slate-600 hover:text-sky-600 active:bg-sky-50 transition-colors touch-manipulation">
          <Luggage className="w-5 h-5" />
          <span className="text-xs font-medium">Booking</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center space-y-1 text-slate-600 hover:text-sky-600 active:bg-sky-50 transition-colors touch-manipulation">
          <Send className="w-5 h-5" />
          <span className="text-xs font-medium">Contact</span>
        </a>
      </div>
    </nav>
  );
}
