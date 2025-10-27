import { navItems } from './nav';
import { useLocation } from 'react-router-dom';

export default function MobileBottomNav() {
  const location = useLocation();

  const isCheckin = location.pathname.startsWith('/checkin');

  if (isCheckin) {
    return null;
  }

  {
    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 safe-area-inset-bottom">
        <div className="grid grid-cols-5 h-16">
          {navItems.map(({ key, label, href, mobile: { Icon } }) => (
            <a
              key={key}
              href={href}
              className="relative flex flex-col items-center justify-center space-y-1 transition-colors touch-manipulation text-slate-600 hover:text-sky-600 active:bg-sky-50"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs text-center font-medium">{label}</span>
            </a>
          ))}
        </div>
      </nav>
    );
  }
}
