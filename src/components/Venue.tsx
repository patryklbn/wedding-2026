'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

export default function Venue() {
  const { t } = useLanguage();

  return (
    <section id="venue" className="py-20 md:py-32 bg-sage-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading">{t('venue.heading')}</h2>
        <p className="section-subheading">{t('venue.subtitle')}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/Graeme-Wilson-Photography-Broxmouth-010.jpg"
              alt="Broxmouth Courtyard exterior"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/Dining-Hall-external-Credit-Graeme-Wilson-Photography.jpg.avif"
              alt="Broxmouth Courtyard dining hall"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="card">
            <div className="w-16 h-16 mx-auto mb-4 bg-sage-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-stone-700 mb-2">{t('venue.location')}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Broxmouth Courtyard<br />Broxmouth Park<br />Dunbar, East Lothian<br />EH42 1QX, Scotland
            </p>
          </div>

          <div className="card">
            <div className="w-16 h-16 mx-auto mb-4 bg-sage-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-stone-700 mb-2">{t('venue.estate')}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{t('venue.estateDesc')}</p>
          </div>

          <div className="card">
            <div className="w-16 h-16 mx-auto mb-4 bg-sage-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-stone-700 mb-2">{t('venue.atmosphere')}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{t('venue.atmosphereDesc')}</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="https://maps.google.com/?q=Broxmouth+Park+Dunbar+Scotland" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            {t('venue.viewMap')}
          </a>
        </div>
      </div>
    </section>
  );
}
