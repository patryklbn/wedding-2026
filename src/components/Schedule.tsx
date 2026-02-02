'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { ReactNode } from 'react';

interface EventItem {
  time: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export default function Schedule() {
  const { t } = useLanguage();

  const weddingDayEvents: EventItem[] = [
    {
      time: '13:00',
      title: t('schedule.events.arrival'),
      description: t('schedule.events.arrivalDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />,
    },
    {
      time: '14:00',
      title: t('schedule.events.ceremony'),
      description: t('schedule.events.ceremonyDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    },
    {
      time: '15:00',
      title: t('schedule.events.drinks'),
      description: t('schedule.events.drinksDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />,
    },
    {
      time: '18:00',
      title: t('schedule.events.dinner'),
      description: t('schedule.events.dinnerDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
    },
    {
      time: '20:00',
      title: t('schedule.events.firstDance'),
      description: t('schedule.events.firstDanceDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />,
    },
    {
      time: '20:30',
      title: t('schedule.events.evening'),
      description: t('schedule.events.eveningDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
    },
  ];

  return (
    <>
      <section id="schedule" className="py-20 md:py-32 bg-cream-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">{t('schedule.heading')}</h2>
          <p className="section-subheading">{t('schedule.subtitle')}</p>

          <div className="text-center mb-16">
            <p className="font-serif text-xl md:text-2xl text-stone-700 mb-2">{t('schedule.date')}</p>
            <p className="text-stone-500 text-sm uppercase tracking-wide">{t('schedule.locationLine')}</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-sage-300 transform md:-translate-x-1/2" />
            <div className="space-y-10">
              {weddingDayEvents.map((event, index) => (
                <div key={event.time} className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-8 md:left-1/2 w-3 h-3 bg-sage-500 rounded-full transform -translate-x-1/2 border-4 border-cream-100 z-10 mt-6" />
                  <div className={`hidden md:flex w-1/2 items-center ${index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
                    <span className="font-serif text-2xl text-sage-600">{event.time}</span>
                  </div>
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">{event.icon}</svg>
                        </div>
                        <div className="flex-1">
                          <span className="md:hidden font-serif text-lg text-sage-600 block mb-1">{event.time}</span>
                          <h3 className="font-serif text-xl text-stone-700 mb-1">{event.title}</h3>
                          <p className="text-stone-500 text-sm leading-relaxed">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="day-after" className="py-20 md:py-28 bg-sage-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">{t('schedule.dayAfter.heading')}</h2>
          <p className="section-subheading">{t('schedule.dayAfter.subtitle')}</p>
          <div className="text-center mb-12">
            <p className="font-serif text-xl md:text-2xl text-stone-700">{t('schedule.dayAfter.date')}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10 text-center">
            <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="font-serif text-lg md:text-xl text-stone-600 leading-relaxed mb-8">{t('schedule.dayAfter.description')}</p>
            <div className="border-t border-stone-200 pt-8">
              <div className="grid md:grid-cols-2 gap-8 text-left max-w-lg mx-auto">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-sage-600 font-medium mb-2">{t('schedule.dayAfter.location')}</h4>
                  <p className="font-serif text-lg text-stone-700 mb-1">One Canon, Public Hoose</p>
                  <p className="text-stone-500 text-sm leading-relaxed">1 Canonmills, Edinburgh<br />EH3 5HA, United Kingdom</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-sage-600 font-medium mb-2">{t('schedule.dayAfter.time')}</h4>
                  <p className="font-serif text-lg text-stone-700">13:00</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <a href="https://maps.google.com/?q=One+Canon+1+Canonmills+Edinburgh+EH3+5HA" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                {t('schedule.dayAfter.viewMap')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
