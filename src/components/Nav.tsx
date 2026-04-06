import React, { useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useDarkMode } from "../hooks/useDarkMode";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const [isDark, toggleDark] = useDarkMode();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] h-16 border-b backdrop-blur-[18px]"
      style={{
        background: "var(--c-nav-bg)",
        borderColor: "var(--c-border-subtle)",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-8 h-full flex items-center justify-between max-md:px-6">
        {/* Logo */}
        <a
          href="#hero"
          className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold tracking-[0.02em] no-underline"
          style={{ color: "var(--c-text)" }}
        >
          Duru <span className="text-[#FF1F7A] italic">G.</span>
        </a>

        {/* Right side: hamburger (mobile) / links (desktop) + dark toggle */}
        <div className="flex items-center gap-4">
          {/* Hamburger (mobile) */}
          <button
            className={`hidden max-md:flex flex-col justify-center gap-[5px] w-9 h-9 bg-transparent border rounded-[4px] p-[7px] z-[101] transition-colors ${menuOpen ? "border-[#FF1F7A]" : "hover:border-[#FF1F7A]"}`}
            style={{ borderColor: menuOpen ? "#FF1F7A" : "var(--c-border)" }}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span
              className="block w-full h-[1.5px] bg-[#FF1F7A] rounded-[2px] transition-transform duration-300 origin-center"
              style={
                menuOpen ? { transform: "translateY(6.5px) rotate(45deg)" } : {}
              }
            />
            <span
              className="block w-full h-[1.5px] bg-[#FF1F7A] rounded-[2px] transition-opacity duration-300"
              style={menuOpen ? { opacity: 0 } : {}}
            />
            <span
              className="block w-full h-[1.5px] bg-[#FF1F7A] rounded-[2px] transition-transform duration-300 origin-center"
              style={
                menuOpen
                  ? { transform: "translateY(-6.5px) rotate(-45deg)" }
                  : {}
              }
            />
          </button>

          {/* Links */}
          <ul
            className={`
              flex gap-10 list-none
              max-md:fixed max-md:top-16 max-md:left-0 max-md:right-0
              max-md:flex-col max-md:gap-0
              max-md:border-b max-md:border-[rgba(255,179,212,0.3)]
              max-md:overflow-hidden max-md:transition-[max-height] max-md:duration-400
              ${menuOpen ? "max-md:max-h-80" : "max-md:max-h-0"}
            `}
            style={{
              ["--mobile-menu-bg" as string]: "var(--c-mobile-menu-bg)",
            }}
          >
            {NAV_LINKS.map(({ href, label }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <li
                  key={href}
                  className="max-md:border-b max-md:border-[rgba(255,179,212,0.2)] max-md:last:border-b-0"
                  style={
                    {
                      background: "var(--c-mobile-menu-bg)",
                    } as React.CSSProperties
                  }
                >
                  <a
                    href={href}
                    onClick={closeMenu}
                    className={`
                      font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.12em] uppercase no-underline
                      transition-[opacity,color] duration-200
                      max-md:block max-md:px-8 max-md:py-[1.1rem] max-md:text-[0.72rem] max-md:tracking-[0.18em]
                      ${isActive ? "text-[#FF1F7A] opacity-100" : "opacity-65 hover:opacity-100 hover:text-[#FF1F7A]"}
                    `}
                    style={isActive ? {} : { color: "var(--c-text)" }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center justify-center w-8 h-8 rounded-full border transition-[border-color,color,background] duration-200 hover:border-[#FF1F7A] hover:text-[#FF1F7A]"
            style={{
              borderColor: "var(--c-border)",
              color: "var(--c-text)",
              background: "transparent",
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
