import { navItems, type NavKey } from './nav';

type MobileMenuProps = {
  active: NavKey;
  onNav: (key: NavKey) => void;
};

export default function MobileMenu({ active, onNav }: MobileMenuProps) {
  const itemClass = (name: NavKey) =>
    name === active
      ? 'px-2 py-2 rounded font-semibold text-sky-700 bg-sky-50'
      : 'px-2 py-2 rounded hover:bg-slate-50';

  return (
    <div role="menu" className="md:hidden py-3 border-t border-slate-200">
      <div className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={() => onNav(item.key)}
            className={itemClass(item.key)}
            aria-current={active === item.key ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
