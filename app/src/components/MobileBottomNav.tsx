import { useState } from 'react';
import { Home, Plane, CheckCircle, Luggage, Send } from 'lucide-react';

type TabKey = 'home' | 'flights' | 'checkin' | 'booking' | 'contact';

export default function MobileBottomNav() {
  const [active, setActive] = useState<TabKey>('checkin');

  const tabs: { key: TabKey; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'home', label: 'Home', Icon: Home },
    { key: 'flights', label: 'Flights', Icon: Plane },
    { key: 'checkin', label: 'Check-in', Icon: CheckCircle },
    { key: 'booking', label: 'Booking', Icon: Luggage },
    { key: 'contact', label: 'Contact', Icon: Send },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16">
        {tabs.map(({ key, label, Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setActive(key)}
              className={
                `relative flex flex-col items-center justify-center space-y-1 transition-colors touch-manipulation ` +
                (isActive
                  ? 'text-sky-600 bg-sky-50'
                  : 'text-slate-600 hover:text-sky-600 active:bg-sky-50')
              }
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-sky-600 rounded-b-full" />
              )}
              <Icon className="w-5 h-5" />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
