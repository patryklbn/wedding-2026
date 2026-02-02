'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function Travel() {
  const { t } = useLanguage();

  const accommodations = [
    { name: 'The Rocks', description: t('travel.hotels.rocks'), distance: '5 min drive' },
    { name: 'Hillside Hotel', description: t('travel.hotels.hillside'), distance: '10 min drive' },
    { name: 'Dunmuir Hotel', description: t('travel.hotels.dunmuir'), distance: '8 min drive' },
  ];

  return (
    <section id="travel" className="py-20 md:py-32 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading">{t('travel.heading')}</h2>
        <p className="section-subheading">{t('travel.subtitle')}</p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h3 className="font-serif text-2xl text-sage-700 mb-6 text-center lg:text-left">{t('travel.gettingThere')}</h3>
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-stone-700 mb-2">{t('travel.byCar')}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{t('travel.byCarDesc')}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-stone-700 mb-2">{t('travel.byTrain')}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{t('travel.byTrainDesc')}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-stone-700 mb-2">{t('travel.byAir')}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{t('travel.byAirDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-sage-700 mb-6 text-center lg:text-left">{t('travel.whereToStay')}</h3>
            <div className="space-y-4">
              {accommodations.map((hotel) => (
                <div key={hotel.name} className="card group hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-lg text-stone-700 mb-1">{hotel.name}</h4>
                      <p className="text-stone-500 text-sm">{hotel.description}</p>
                      <span className="inline-block mt-2 text-xs text-sage-600 bg-sage-100 px-2 py-1 rounded">
                        {hotel.distance} {t('travel.fromVenue')}
                      </span>
                    </div>
                    <svg className="w-5 h-5 text-sage-400 group-hover:text-sage-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-heather-100 rounded-lg border border-heather-200">
              <h4 className="font-serif text-lg text-heather-700 mb-2">{t('travel.taxiServices')}</h4>
              <p className="text-heather-600 text-sm">{t('travel.taxiDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
