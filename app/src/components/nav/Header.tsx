import { useState } from 'react';
import { Plane, Menu, X } from 'lucide-react';
import { type NavKey } from './nav';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

type HeaderProps = {
  onLogoClick?: () => void;
};

export default function Header({ onLogoClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState<NavKey>('checkin');
  const handleNav = (name: NavKey) => {
    setActive(name);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-sky-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <button
            aria-label="Qoomlee Home"
            onClick={onLogoClick}
            className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer"
          >
            <div className="relative">
              <Plane className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 duration-300" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Qoomlee</h1>
              <p className="text-xs text-sky-600 -mt-1">Airline</p>
            </div>
          </button>

          <DesktopNav active={active} onNav={handleNav} />

          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 active:bg-slate-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <MobileMenu active={active} onNav={handleNav} />
        )}
      </nav>
    </header>
  );
}
