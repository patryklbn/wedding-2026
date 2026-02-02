export default function Travel() {
  const accommodations = [
    {
      name: 'The Rocks',
      description: 'Charming boutique hotel in the heart of Dunbar',
      distance: '5 min drive',
      link: '#',
    },
    {
      name: 'Hillside Hotel',
      description: 'Comfortable accommodation with sea views',
      distance: '10 min drive',
      link: '#',
    },
    {
      name: 'Dunmuir Hotel',
      description: 'Modern hotel with excellent amenities',
      distance: '8 min drive',
      link: '#',
    },
  ];

  return (
    <section id="travel" className="py-20 md:py-32 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading">Travel & Stay</h2>
        <p className="section-subheading">Getting there & where to stay</p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Getting There */}
          <div>
            <h3 className="font-serif text-2xl text-sage-700 mb-6 text-center lg:text-left">
              Getting to Broxmouth
            </h3>

            <div className="space-y-6">
              {/* By Car */}
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-stone-700 mb-2">By Car</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Broxmouth Park is located just off the A1, approximately 30 miles east of Edinburgh.
                      The postcode EH42 1QX will take you directly to the estate entrance.
                      Free parking is available on site.
                    </p>
                  </div>
                </div>
              </div>

              {/* By Train */}
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-stone-700 mb-2">By Train</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Dunbar station is on the East Coast Main Line, with regular services from Edinburgh
                      (25 minutes) and London King&apos;s Cross. Taxis are available from the station.
                    </p>
                  </div>
                </div>
              </div>

              {/* By Air */}
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-stone-700 mb-2">By Air</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Edinburgh Airport is approximately 40 miles from the venue.
                      Car hire is available at the airport, or you can take the tram to Edinburgh city
                      centre and connect by train.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accommodation */}
          <div>
            <h3 className="font-serif text-2xl text-sage-700 mb-6 text-center lg:text-left">
              Where to Stay
            </h3>

            <div className="space-y-4">
              {accommodations.map((hotel) => (
                <div key={hotel.name} className="card group hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-lg text-stone-700 mb-1">{hotel.name}</h4>
                      <p className="text-stone-500 text-sm">{hotel.description}</p>
                      <span className="inline-block mt-2 text-xs text-sage-600 bg-sage-100 px-2 py-1 rounded">
                        {hotel.distance} from venue
                      </span>
                    </div>
                    <svg
                      className="w-5 h-5 text-sage-400 group-hover:text-sage-600 group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-heather-100 rounded-lg border border-heather-200">
              <h4 className="font-serif text-lg text-heather-700 mb-2">Taxi Services</h4>
              <p className="text-heather-600 text-sm">
                We recommend booking taxis in advance, especially for the evening.
                Local taxi companies include Dunbar Taxis and East Lothian Cabs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
