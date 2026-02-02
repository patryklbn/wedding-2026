'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { useWeddingAccess } from '@/components/PasswordGate';

export default function Footer() {
  const { t } = useLanguage();
  const { logout } = useWeddingAccess();

  return (
    <footer className="bg-stone-800 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="font-script text-5xl mb-6 text-sage-300">P & R</div>
        <p className="font-serif text-xl text-stone-300 mb-2">28th November 2026</p>
        <p className="text-stone-400 text-sm uppercase tracking-widest mb-8">Broxmouth Courtyard, Dunbar</p>
        <div className="w-24 h-px bg-stone-600 mx-auto mb-8" />
        <p className="text-stone-400 text-sm mb-4">
          {t('footer.questions')}{' '}
          <a href="mailto:beccalamont95@gmail.com" className="text-sage-400 hover:text-sage-300 transition-colors">beccalamont95@gmail.com</a>
        </p>
        <p className="font-script text-2xl text-sage-400 mb-8">#PatrykAndRebecca2026</p>
        <p className="text-stone-500 text-xs mb-6">{t('footer.madeWith')}</p>
        <button
          onClick={logout}
          className="text-stone-500 hover:text-stone-300 text-xs uppercase tracking-widest transition-colors"
        >
          {t('footer.logout')}
        </button>
      </div>
    </footer>
  );
}
