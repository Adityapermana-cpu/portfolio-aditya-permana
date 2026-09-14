import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, X, FileSpreadsheet, Sparkles } from 'lucide-react';

import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useClipboard } from '../../hooks/useClipboard';
import { profileData } from '../../data/portfolioData';
import { BrandLogo } from '../common/BrandLogo';

export const NavigationBar: React.FC = () => {
  const { isScrolled, scrollToSection } = useScrollPosition();
  const { copied, copy } = useClipboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const navItems = [
  { label: 'Profil', id: 'about' },
  { label: 'Project', id: 'projects' },
  { label: 'Skills', id: 'stack' },
  { label: 'Aktivitas', id: 'activity' },
  { label: 'Experience', id: 'journey' },
  { label: 'Sertifikat', id: 'certificates' },
  { label: 'Kontak', id: 'contact' },
];

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const isManualClickRef = useRef<boolean>(false);
  const manualClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePill = (sectionId: string) => {
    const el = tabRefs.current[sectionId];
    if (el) {
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth
      });
    }
  };

  useEffect(() => {
    updatePill(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => updatePill(activeSection);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  useEffect(() => {
    let ticking = false;
    let currentActive = 'hero';

    const handleScroll = () => {
      if (isManualClickRef.current) return;

      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
          if (isManualClickRef.current) return;

          const scrollPosition = window.scrollY + 240;
          const isAtBottom =
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

          if (isAtBottom) {
            if (currentActive !== 'contact') {
              currentActive = 'contact';
              setActiveSection('contact');
            }
            return;
          }

          for (let i = navItems.length - 1; i >= 0; i--) {
            const item = navItems[i];
            const el = document.getElementById(item.id);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                if (currentActive !== item.id) {
                  currentActive = item.id;
                  setActiveSection(item.id);
                }
                break;
              }
            }
          }
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    isManualClickRef.current = true;
    setActiveSection(id);
    updatePill(id);
    scrollToSection(id);
    setMobileMenuOpen(false);

    if (manualClickTimerRef.current) clearTimeout(manualClickTimerRef.current);
    manualClickTimerRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 850);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 sm:py-2.5 bg-gradient-to-r from-[#0d2a18]/95 via-[#143e23]/95 to-[#0b2615]/95 backdrop-blur-xl border-b border-[#34d399]/30 shadow-[0_6px_24px_rgba(5,25,12,0.35)]'
          : 'py-2.5 sm:py-3.5 bg-gradient-to-b from-[#0a2314]/90 via-[#0a2314]/50 to-transparent backdrop-blur-xs'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <div className="p-1 sm:p-1.5 rounded-xl bg-gradient-to-r from-[#12361f]/85 to-[#0d2917]/85 border border-[#86efac]/30 shadow-xs group-hover:border-[#fde047] transition-all">
            <BrandLogo size="md" withText />
          </div>
        </button>

        {/* Desktop Navigation Floating Pill */}
        <nav className="hidden md:flex items-center relative bg-gradient-to-r from-[#10321c]/92 to-[#0e2c18]/92 border border-[#4ade80]/35 p-1 rounded-full backdrop-blur-2xl shadow-[0_4px_20px_rgba(10,40,18,0.3)] transition-all">
          {pillStyle.width > 0 && (
            <div
              className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#15803d] via-[#16a34a] to-[#15803d] border border-[#86efac]/60 shadow-[0_2px_8px_rgba(34,197,94,0.35)] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`
              }}
            >
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#fde047] shadow-[0_0_6px_#fde047]" />
            </div>
          )}

          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el;
                }}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative z-10 px-3 py-1 rounded-full text-xs font-bold tracking-tight transition-all cursor-pointer group select-none ${
                  isActive
                    ? 'text-[#fef08a] drop-shadow-xs font-black'
                    : 'text-[#fefae0]/85 hover:text-[#fde047] opacity-90 hover:opacity-100'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Quick Action: Copy Email / Consultation */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#166534] via-[#15803d] to-[#14532d] hover:from-[#15803d] hover:to-[#16a34a] border border-[#86efac]/40 hover:border-[#fde047] text-xs font-mono font-bold text-[#fefae0] shadow-sm transition-all backdrop-blur-xl cursor-pointer group active:scale-95"
            title="Salin email untuk konsultasi perpajakan"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#fde047]" />
                <span className="text-[#fde047] font-black text-[11px]">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-[#fde047] group-hover:rotate-6 transition-transform" />
                <span className="text-[#fefae0] font-medium text-[11px]">{profileData.contact.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Action & Hamburger Button */}
        <div className="md:hidden flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-[#143d22] to-[#0f2c18] border border-[#86efac]/40 text-[#fefae0] active:scale-95 transition-transform backdrop-blur-md shadow-xs"
            aria-label="Salin email"
            title="Salin email"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#4ade80]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#fde047]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-[#143d22] to-[#0f2c18] border border-[#86efac]/40 text-[#fefae0] hover:text-[#fde047] active:scale-95 transition-transform backdrop-blur-md shadow-xs"
            aria-label="Buka navigasi"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden border-b border-[#34d399]/35 bg-gradient-to-b from-[#0c2616]/98 via-[#123820]/98 to-[#091e11]/98 backdrop-blur-2xl px-5 py-4 shadow-xl overflow-hidden mt-1.5"
          >
            <div className="flex flex-col gap-1.5">
              <div className="pb-1.5 mb-1 border-b border-[#22c55e]/25 flex items-center justify-between text-xs font-mono font-bold text-[#86efac]">
                <div className="flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#fde047]" />
                  <span>NAVIGASI PORTOFOLIO</span>
                </div>
                <Sparkles className="w-3 h-3 text-[#fde047]" />
              </div>

              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-bold tracking-wide transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#15803d]/80 to-[#166534]/80 text-[#fde047] border border-[#86efac]/50 font-black shadow-xs'
                        : 'text-[#fefae0] hover:bg-[#14321d]/80 hover:text-[#fde047]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#fde047] shadow-[0_0_6px_#fde047]" />
                    )}
                  </button>
                );
              })}

              <div className="pt-2 mt-1 border-t border-[#22c55e]/25">
                <button
                  type="button"
                  onClick={() => {
                    copy(profileData.contact.email);
                    setTimeout(() => setMobileMenuOpen(false), 800);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-[#fde047] to-[#facc15] text-[#1c1917] font-mono font-black text-xs border border-[#1c1917]/20 shadow-xs cursor-pointer active:scale-95 transition-transform"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Email Tersalin!' : 'Salin Email Konsultasi'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

