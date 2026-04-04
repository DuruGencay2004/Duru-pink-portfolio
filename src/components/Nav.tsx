import { useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 h-16 border-b border-[rgba(255,179,212,0.25)] backdrop-blur-[18px] -webkit-backdrop-blur-[18px] bg-[rgba(255,245,249,0.72)] max-md:px-6">
      {/* Logo */}
      <div className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-[#1A0A10] tracking-[0.02em]">
        Duru{' '}
        <span className="text-[#FF1F7A] italic">G.</span>
      </div>

      {/* Hamburger (mobile) */}
      <button
        className={`hidden max-md:flex flex-col justify-center gap-[5px] w-9 h-9 bg-transparent border rounded-[4px] p-[7px] z-[101] transition-colors ${menuOpen ? 'border-[#FF1F7A]' : 'border-[rgba(255,179,212,0.4)] hover:border-[#FF1F7A]'}`}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span
          className="block w-full h-[1.5px] bg-[#FF1F7A] rounded-[2px] transition-transform duration-300 origin-center"
          style={menuOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}}
        />
        <span
          className="block w-full h-[1.5px] bg-[#FF1F7A] rounded-[2px] transition-opacity duration-300"
          style={menuOpen ? { opacity: 0 } : {}}
        />
        <span
          className="block w-full h-[1.5px] bg-[#FF1F7A] rounded-[2px] transition-transform duration-300 origin-center"
          style={menuOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}}
        />
      </button>

      {/* Links */}
      <ul
        className={`
          flex gap-10 list-none
          max-md:fixed max-md:top-16 max-md:left-0 max-md:right-0
          max-md:flex-col max-md:gap-0 max-md:bg-[#FFF5F9]
          max-md:border-b max-md:border-[#FFB3D4]
          max-md:overflow-hidden max-md:transition-[max-height] max-md:duration-400
          ${menuOpen ? 'max-md:max-h-80' : 'max-md:max-h-0'}
        `}
      >
        {NAV_LINKS.map(({ href, label }) => {
          const sectionId = href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <li key={href} className="max-md:border-b max-md:border-[rgba(255,179,212,0.2)] max-md:last:border-b-0">
              <a
                href={href}
                onClick={closeMenu}
                className={`
                  font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.12em] uppercase no-underline
                  transition-[opacity,color] duration-200
                  max-md:block max-md:px-8 max-md:py-[1.1rem] max-md:text-[0.72rem] max-md:tracking-[0.18em]
                  ${isActive
                    ? 'text-[#FF1F7A] opacity-100'
                    : 'text-[#1A0A10] opacity-65 hover:opacity-100 hover:text-[#FF1F7A] max-md:hover:bg-[rgba(255,31,122,0.04)]'
                  }
                `}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
