'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

export default function HoneymoonFund() {
  const { t } = useLanguage();

  return (
    <section id="honeymoon" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/honeymoon.jpg" alt="Honeymoon destination" fill className="object-cover" quality={85} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-heading !text-white">{t('honeymoon.heading')}</h2>
        <p className="section-subheading !text-white/80">{t('honeymoon.subtitle')}</p>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white/50">
          <p className="text-stone-600 leading-relaxed text-lg mb-10 max-w-md mx-auto">{t('honeymoon.text')}</p>

          <a href="https://monzo.me/YOUR_MONZO_HANDLE" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-3 text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {t('honeymoon.button')}
          </a>
        </div>
      </div>
    </section>
  );
}
