'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Welcome', href: '#guests' },
  { name: 'Venue', href: '#venue' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'RSVP', href: '#rsvp' },
  { name: 'Honeymoon', href: '#honeymoon' },
  { name: 'Travel', href: '#travel' },
  { name: 'Gallery', href: '#gallery' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs lg:text-sm uppercase tracking-widest font-light transition-colors duration-300 hover:text-sage-500 ${
                  isScrolled ? 'text-stone-600' : 'text-white/90'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="bg-cream-50/95 backdrop-blur-md rounded-lg p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
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
