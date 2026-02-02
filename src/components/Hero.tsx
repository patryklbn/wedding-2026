'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const weddingDate = new Date('2026-11-28T14:00:00').getTime();
  const now = new Date().getTime();
  const difference = weddingDate - now;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Broxmouth-001-copy-1.jpg"
          alt="Broxmouth Courtyard"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 animate-fade-in opacity-0 [animation-delay:0.3s]">
          We&apos;re Getting Married
        </p>

        <h1 className="font-script text-6xl md:text-8xl lg:text-9xl mb-6 animate-fade-in opacity-0 [animation-delay:0.6s]">
          Patryk & Rebecca
        </h1>

        <div className="w-24 h-px bg-white/60 mx-auto mb-6 animate-fade-in opacity-0 [animation-delay:0.9s]" />

        <p className="font-serif text-xl md:text-2xl lg:text-3xl font-light mb-2 animate-fade-in opacity-0 [animation-delay:1.2s]">
          Saturday, 28th November 2026
        </p>

        <p className="font-sans text-sm md:text-base uppercase tracking-widest mb-12 animate-fade-in opacity-0 [animation-delay:1.5s]">
          Broxmouth Courtyard, Dunbar, Scotland
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-lg mx-auto animate-fade-in opacity-0 [animation-delay:1.8s]">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl md:text-5xl font-serif font-light mb-1">
                {mounted ? item.value.toString().padStart(2, '0') : '--'}
              </div>
              <div className="text-xs uppercase tracking-widest opacity-80">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
