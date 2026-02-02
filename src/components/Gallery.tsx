'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

const images = [
  { src: '/images/Broxmouth-001-copy-1.jpg', alt: 'Broxmouth Courtyard entrance', span: 'col-span-2 row-span-2' },
  { src: '/images/Graeme-Wilson-Photography-Broxmouth-010.jpg', alt: 'Broxmouth estate grounds', span: 'col-span-1 row-span-1' },
  { src: '/images/Dining-Hall-external-Credit-Graeme-Wilson-Photography.jpg.avif', alt: 'Broxmouth dining hall', span: 'col-span-1 row-span-1' },
  { src: '/images/Image-510-2048x1362.jpg.webp', alt: 'Venue interior', span: 'col-span-1 row-span-2' },
  { src: '/images/Graeme-Wilson-Photography-Broxmouth-004.jpg.avif', alt: 'Broxmouth courtyard details', span: 'col-span-1 row-span-1' },
  { src: '/images/Image-39-scaled-512x768.jpg', alt: 'Romantic setting', span: 'col-span-1 row-span-1' },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading">{t('gallery.heading')}</h2>
        <p className="section-subheading">{t('gallery.subtitle')}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((image, index) => (
            <div key={index} className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group ${image.span}`} onClick={() => setSelectedImage(image.src)}>
              <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors" onClick={() => setSelectedImage(null)} aria-label="Close lightbox">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full max-w-5xl h-[80vh]">
              <Image src={selectedImage} alt="Enlarged view" fill className="object-contain" onClick={(e) => e.stopPropagation()} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
