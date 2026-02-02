export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Monogram */}
        <div className="font-script text-5xl mb-6 text-sage-300">P & R</div>

        {/* Date */}
        <p className="font-serif text-xl text-stone-300 mb-2">
          28th November 2026
        </p>
        <p className="text-stone-400 text-sm uppercase tracking-widest mb-8">
          Broxmouth Courtyard, Dunbar
        </p>

        {/* Divider */}
        <div className="w-24 h-px bg-stone-600 mx-auto mb-8" />

        {/* Contact */}
        <p className="text-stone-400 text-sm mb-4">
          Questions? Get in touch at{' '}
          <a
            href="mailto:wedding@example.com"
            className="text-sage-400 hover:text-sage-300 transition-colors"
          >
            wedding@example.com
          </a>
        </p>

        {/* Hashtag */}
        <p className="font-script text-2xl text-sage-400 mb-8">#PatrykAndRebecca2026</p>

        {/* Copyright */}
        <p className="text-stone-500 text-xs">
          Made with love for our special day
        </p>
      </div>
    </footer>
  );
}
