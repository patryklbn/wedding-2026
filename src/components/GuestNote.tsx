export default function GuestNote() {
  return (
    <section id="guests" className="py-20 md:py-32 bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-heading">A Note to Our Guests</h2>
        <p className="section-subheading">Welcome</p>

        <div className="space-y-6">
          <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
            Thank you for being part of our lives and for sharing this special day with us.
          </p>

          <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
            We can&apos;t wait to celebrate together at Broxmouth Courtyard.
          </p>

          <p className="text-stone-500 leading-relaxed max-w-xl mx-auto">
            Please use this website for the schedule, travel information, and to RSVP.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href="#schedule" className="btn-secondary">
            View Schedule
          </a>
          <a href="#rsvp" className="btn-primary">
            RSVP Now
          </a>
        </div>
      </div>
    </section>
  );
}
