'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t('nav.welcome'), href: '#guests' },
    { name: t('nav.venue'), href: '#venue' },
    { name: t('nav.schedule'), href: '#schedule' },
    { name: t('nav.rsvp'), href: '#rsvp' },
    { name: t('nav.honeymoon'), href: '#honeymoon' },
    { name: t('nav.travel'), href: '#travel' },
    { name: t('nav.gallery'), href: '#gallery' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="#"
            className={`font-script text-2xl md:text-3xl transition-colors duration-300 ${
              isScrolled ? 'text-sage-700' : 'text-white'
            }`}
          >
            P & R
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs lg:text-sm uppercase tracking-widest font-light transition-colors duration-300 hover:text-sage-500 ${
                  isScrolled ? 'text-stone-600' : 'text-white/90'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'pl' : 'en')}
              className={`text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-300 ${
                isScrolled
                  ? 'border-sage-400 text-sage-700 hover:bg-sage-100'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
              aria-label={`Switch to ${lang === 'en' ? 'Polish' : 'English'}`}
            >
              {lang === 'en' ? 'PL' : 'EN'}
            </button>
          </div>

          {/* Mobile: Language + Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'pl' : 'en')}
              className={`text-xs font-medium uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all duration-300 ${
                isScrolled
                  ? 'border-sage-400 text-sage-700'
                  : 'border-white/40 text-white'
              }`}
              aria-label={`Switch to ${lang === 'en' ? 'Polish' : 'English'}`}
            >
              {lang === 'en' ? 'PL' : 'EN'}
            </button>

            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-stone-600' : 'bg-white'
                  } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span
                  className={`w-full h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-stone-600' : 'bg-white'
                  } ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`w-full h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-stone-600' : 'bg-white'
                  } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="bg-cream-50/95 backdrop-blur-md rounded-lg p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-widest font-light text-stone-600 hover:text-sage-500 transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
