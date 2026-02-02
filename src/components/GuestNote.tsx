'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function GuestNote() {
  const { t } = useLanguage();

  return (
    <section id="guests" className="py-20 md:py-32 bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-heading">{t('guestNote.heading')}</h2>
        <p className="section-subheading">{t('guestNote.subtitle')}</p>

        <div className="space-y-6">
          <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
            {t('guestNote.line1')}
          </p>
          <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
            {t('guestNote.line2')}
          </p>
          <p className="text-stone-500 leading-relaxed max-w-xl mx-auto">
            {t('guestNote.line3')}
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href="#schedule" className="btn-secondary">{t('guestNote.viewSchedule')}</a>
          <a href="#rsvp" className="btn-primary">{t('guestNote.rsvpNow')}</a>
        </div>
      </div>
    </section>
  );
}
