export type Language = 'en' | 'pl';

export const translations = {
  // Navigation
  nav: {
    welcome: { en: 'Welcome', pl: 'Powitanie' },
    venue: { en: 'Venue', pl: 'Miejsce' },
    schedule: { en: 'Schedule', pl: 'Harmonogram' },
    rsvp: { en: 'RSVP', pl: 'RSVP' },
    honeymoon: { en: 'Honeymoon', pl: 'Podróż poślubna' },
    travel: { en: 'Travel', pl: 'Dojazd' },
    gallery: { en: 'Gallery', pl: 'Galeria' },
  },

  // Hero
  hero: {
    gettingMarried: { en: "We're Getting Married", pl: 'Bierzemy Ślub' },
    eveningSubtitle: { en: 'Join us for our Evening Reception', pl: 'Dołączcie do nas na wieczorną recepcję' },
    date: { en: 'Saturday, 28th November 2026', pl: 'Sobota, 28 listopada 2026' },
    location: { en: 'Broxmouth Courtyard, Dunbar, Scotland', pl: 'Broxmouth Courtyard, Dunbar, Szkocja' },
    days: { en: 'Days', pl: 'Dni' },
    hours: { en: 'Hours', pl: 'Godziny' },
    minutes: { en: 'Minutes', pl: 'Minuty' },
    seconds: { en: 'Seconds', pl: 'Sekundy' },
  },

  // Guest Note
  guestNote: {
    heading: { en: 'A Note to Our Guests', pl: 'Słowo do Naszych Gości' },
    subtitle: { en: 'Welcome', pl: 'Witajcie' },
    line1: {
      en: 'Thank you for being part of our lives and for sharing this special day with us.',
      pl: 'Dziękujemy, że jesteście częścią naszego życia i że dzielicie z nami ten wyjątkowy dzień.',
    },
    line2: {
      en: "We can't wait to celebrate together at Broxmouth Courtyard.",
      pl: 'Nie możemy się doczekać wspólnego świętowania w Broxmouth Courtyard.',
    },
    line3: {
      en: 'Please use this website for the schedule, travel information, and to RSVP.',
      pl: 'Skorzystajcie z tej strony, aby sprawdzić harmonogram, informacje o dojeździe i potwierdzić obecność.',
    },
    viewSchedule: { en: 'View Schedule', pl: 'Harmonogram' },
    rsvpNow: { en: 'RSVP Now', pl: 'Potwierdź obecność' },
  },

  // Venue
  venue: {
    heading: { en: 'The Venue', pl: 'Miejsce' },
    subtitle: { en: 'Broxmouth Courtyard', pl: 'Broxmouth Courtyard' },
    location: { en: 'Location', pl: 'Lokalizacja' },
    estate: { en: 'The Estate', pl: 'Posiadłość' },
    estateDesc: {
      en: 'A restored 19th-century courtyard venue in Broxmouth Park, surrounded by countryside just outside Dunbar.',
      pl: 'Odrestaurowane miejsce z XIX-wiecznym dziedzińcem w Broxmouth Park, otoczone wiejskim krajobrazem tuż za Dunbar.',
    },
    atmosphere: { en: 'The Feel', pl: 'Atmosfera' },
    atmosphereDesc: {
      en: 'Relaxed, intimate and easy-going — with space to celebrate at your own pace.',
      pl: 'Luźna, kameralna i swobodna atmosfera — z przestrzenią do świętowania we własnym tempie.',
    },
    viewMap: { en: 'View on Google Maps', pl: 'Zobacz na Google Maps' },
  },

  // Schedule
  schedule: {
    heading: { en: 'The Day', pl: 'Plan Dnia' },
    subtitle: { en: 'Wedding Day Schedule', pl: 'Harmonogram dnia ślubu' },
    subtitleEvening: { en: 'Evening Reception', pl: 'Wieczorna recepcja' },
    disclaimer: {
      en: 'This is the planned timeline for the day — small changes may happen closer to the wedding.',
      pl: 'To planowany harmonogram dnia — drobne zmiany mogą pojawić się bliżej ślubu.',
    },
    date: { en: 'Saturday, 28th November 2026', pl: 'Sobota, 28 listopada 2026' },
    locationLine: {
      en: 'Broxmouth Courtyard, Dunbar, Scotland EH42 1QW',
      pl: 'Broxmouth Courtyard, Dunbar, Szkocja EH42 1QW',
    },
    events: {
      arrival: { en: 'Guest Arrival', pl: 'Przyjazd gości' },
      arrivalDesc: {
        en: 'Guests arrive at Broxmouth Courtyard.',
        pl: 'Goście przybywają do Broxmouth Courtyard.',
      },
      ceremony: { en: 'Ceremony', pl: 'Ceremonia' },
      ceremonyDesc: {
        en: 'Exchange of vows in the Broxmouth Courtyard.',
        pl: 'Wymiana przysięg na dziedzińcu Broxmouth.',
      },
      drinks: { en: 'Drinks Reception & Photos', pl: 'Koktajl i zdjęcia' },
      drinksDesc: {
        en: 'Cocktails, photos and music as we celebrate after the ceremony.',
        pl: 'Koktajle, zdjęcia i muzyka po ceremonii.',
      },
      dinner: { en: 'Dinner & Speeches', pl: 'Obiad i przemówienia' },
      dinnerDesc: {
        en: 'Dinner, speeches and toasts in the main hall.',
        pl: 'Obiad, przemówienia i toasty w głównej sali.',
      },
      firstDance: { en: 'First Dance', pl: 'Pierwszy taniec' },
      firstDanceDesc: {
        en: 'The newlyweds take to the floor.',
        pl: 'Nowożeńcy otwierają parkiet.',
      },
      evening: { en: 'Evening Reception', pl: 'Wieczorna recepcja' },
      eveningDesc: {
        en: 'Ceilidh, DJ, dancing and celebration into the night.',
        pl: 'Ceilidh, DJ, tańce i zabawa do późna.',
      },
    },
    addToCalendar: { en: 'Add to Calendar', pl: 'Dodaj do kalendarza' },
    downloadIcs: { en: 'Apple / ICS', pl: 'Apple / ICS' },
    googleCalendar: { en: 'Google Calendar', pl: 'Google Calendar' },
    dayAfter: {
      heading: { en: 'The Day After', pl: 'Dzień po' },
      subtitle: { en: 'Sunday Gathering', pl: 'Niedzielne spotkanie' },
      date: { en: 'Sunday, 29th November 2026', pl: 'Niedziela, 29 listopada 2026' },
      description: {
        en: 'Scottish/Polish-style poprawiny: a relaxed day-after pub gathering for close friends.',
        pl: 'Poprawiny w szkocko-polskim stylu: luźne spotkanie w pubie dla bliskich przyjaciół.',
      },
      location: { en: 'Location', pl: 'Lokalizacja' },
      time: { en: 'Time', pl: 'Godzina' },
      viewMap: { en: 'View on Google Maps', pl: 'Zobacz na Google Maps' },
    },
  },

  // RSVP
  rsvp: {
    heading: { en: 'RSVP', pl: 'RSVP' },
    subtitle: { en: 'Kindly respond by 1st October 2026', pl: 'Prosimy o odpowiedź do 1 października 2026' },
    fullName: { en: 'Full Name(s)', pl: 'Imię i Nazwisko' },
    fullNamePlaceholder: { en: 'Your full name', pl: 'Twoje imię i nazwisko' },
    email: { en: 'Email', pl: 'Email' },
    emailPlaceholder: { en: 'your.email@example.com', pl: 'twoj.email@example.com' },
    numberOfGuests: { en: 'Number of Guests', pl: 'Liczba gości' },
    guestsSelect: { en: 'Please select', pl: 'Proszę wybrać' },
    guest: { en: 'guest', pl: 'gość' },
    guests: { en: 'guests', pl: 'gości' },
    additionalNames: { en: 'Additional Guest Names', pl: 'Imiona dodatkowych gości' },
    additionalNamesPlaceholder: { en: 'Names of additional guests', pl: 'Imiona dodatkowych gości' },
    invitationType: { en: 'Invitation Type', pl: 'Typ zaproszenia' },
    dayGuest: {
      en: 'Day Guest (Ceremony, Dinner & Evening)',
      pl: 'Goście dzienni (Ceremonia, Obiad i Wieczór)',
    },
    eveningGuest: {
      en: 'Evening Guest (Evening Reception only)',
      pl: 'Goście wieczorni (tylko wieczorna recepcja)',
    },
    attending: { en: 'Attending?', pl: 'Potwierdzenie obecności' },
    attendingYes: { en: "Yes, we'll be there!", pl: 'Tak, będziemy!' },
    attendingNo: { en: "Sorry, can't make it", pl: 'Niestety nie możemy' },
    dietary: { en: 'Dietary Requirements', pl: 'Wymagania dietetyczne' },
    dietaryPlaceholder: {
      en: 'Please let us know of any dietary requirements or allergies',
      pl: 'Prosimy o informację o wymaganiach dietetycznych lub alergiach',
    },
    toastDrink: { en: 'Toast Drink Preference', pl: 'Preferencje napoju na toast' },
    alcoholic: { en: 'Alcoholic drink', pl: 'Napój alkoholowy' },
    nonAlcoholic: { en: 'Non-alcoholic drink', pl: 'Napój bezalkoholowy' },
    message: { en: 'Message for the Couple', pl: 'Wiadomość dla Pary Młodej' },
    messagePlaceholder: { en: 'Share your well wishes (optional)', pl: 'Podziel się życzeniami (opcjonalnie)' },
    optional: { en: 'Optional', pl: 'Opcjonalnie' },
    submit: { en: 'Send RSVP', pl: 'Wyślij RSVP' },
    sending: { en: 'Sending...', pl: 'Wysyłanie...' },
    thankYou: { en: 'Thank You!', pl: 'Dziękujemy!' },
    received: { en: 'Your RSVP has been received.', pl: 'Twoje potwierdzenie zostało odebrane.' },
    errorSubmit: {
      en: 'Something went wrong. Please try again or contact us directly.',
      pl: 'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.',
    },
    // Validation
    nameRequired: { en: 'Full name is required', pl: 'Imię i nazwisko jest wymagane' },
    emailRequired: { en: 'Email is required', pl: 'Email jest wymagany' },
    emailInvalid: { en: 'Please enter a valid email address', pl: 'Proszę podać prawidłowy adres email' },
    guestsRequired: { en: 'Please select number of guests', pl: 'Proszę wybrać liczbę gości' },
    additionalNamesRequired: { en: 'Please enter the names of additional guests', pl: 'Proszę podać imiona dodatkowych gości' },
    invitationRequired: { en: 'Please select your invitation type', pl: 'Proszę wybrać typ zaproszenia' },
    attendingRequired: { en: 'Please let us know if you can attend', pl: 'Prosimy o potwierdzenie obecności' },
    dietaryRequired: { en: 'Please let us know about dietary requirements', pl: 'Prosimy o informację o wymaganiach dietetycznych' },
    toastRequired: { en: 'Please select your toast drink preference', pl: 'Proszę wybrać preferencję napoju na toast' },
  },

  // Honeymoon Fund
  honeymoon: {
    heading: { en: 'Honeymoon Fund', pl: 'Fundusz na podróż poślubną' },
    subtitle: { en: "If you'd like to contribute", pl: 'Jeśli chcielibyście się dołożyć' },
    text: {
      en: "Having you celebrate with us is the best gift! If you'd like to help us create unforgettable honeymoon memories, we've set up a Monzo fund below. No account required.",
      pl: 'Wasza obecność to najlepszy prezent! Jeśli chcielibyście pomóc nam stworzyć niezapomniane wspomnienia z miesiąca miodowego, założyliśmy fundusz Monzo poniżej. Konto nie jest wymagane.',
    },
    button: { en: 'Contribute via Monzo', pl: 'Wpłać przez Monzo' },
  },

  // Travel
  travel: {
    heading: { en: 'Travel & Stay', pl: 'Dojazd i nocleg' },
    subtitle: { en: 'Getting there & where to stay', pl: 'Jak dojechać i gdzie się zatrzymać' },
    gettingThere: { en: 'Getting to Broxmouth', pl: 'Dojazd do Broxmouth' },
    byCar: { en: 'By Car', pl: 'Samochodem' },
    byCarDesc: {
      en: 'Broxmouth Park is located just off the A1, approximately 30 miles east of Edinburgh. The postcode EH42 1QW will take you directly to the estate entrance. Free parking is available on site.',
      pl: 'Broxmouth Park znajduje się tuż przy A1, około 50 km na wschód od Edynburga. Kod pocztowy EH42 1QW doprowadzi bezpośrednio do wjazdu na teren posiadłości. Bezpłatny parking na miejscu.',
    },
    byTrain: { en: 'By Train', pl: 'Pociągiem' },
    byTrainDesc: {
      en: "Dunbar station is on the East Coast Main Line, with regular services from Edinburgh (25 minutes) and London King's Cross. Taxis are available from the station.",
      pl: "Stacja Dunbar znajduje się na linii East Coast Main Line, z regularnymi połączeniami z Edynburga (25 minut) i Londynu King's Cross. Taksówki dostępne na stacji.",
    },
    byAir: { en: 'By Air', pl: 'Samolotem' },
    byAirDesc: {
      en: 'Edinburgh Airport is approximately 40 miles from the venue. Car hire is available at the airport, or you can take the tram to Edinburgh city centre and connect by train.',
      pl: 'Lotnisko w Edynburgu znajduje się około 65 km od miejsca. Na lotnisku dostępna jest wypożyczalnia samochodów, lub można dojechać tramwajem do centrum Edynburga i przesiąść się na pociąg.',
    },
    byCoach: { en: 'Coach Transport', pl: 'Autokar' },
    byCoachDesc: {
      en: 'We are considering arranging a coach from Edinburgh to Broxmouth Courtyard and back on the wedding day. If confirmed, full details will be shared closer to the wedding.',
      pl: 'Rozważamy zorganizowanie autokaru z Edynburga do Broxmouth Courtyard i z powrotem w dniu ślubu. Jeśli się to potwierdzi, szczegóły zostaną udostępnione bliżej terminu.',
    },
    whereToStay: { en: 'Where to Stay', pl: 'Gdzie się zatrzymać' },
    fromVenue: { en: 'from venue', pl: 'od miejsca' },
    taxiServices: { en: 'Taxi Services', pl: 'Taksówki' },
    taxiDesc: {
      en: 'We recommend booking taxis in advance, especially for the evening. Local taxi services operate in Dunbar and the wider East Lothian area, including East Lothian Cabs and other local operators.',
      pl: 'Zalecamy rezerwację taksówek z wyprzedzeniem, szczególnie na wieczór. Lokalne usługi taksówkowe działają w Dunbar i na terenie East Lothian, w tym East Lothian Cabs i inni lokalni przewoźnicy.',
    },
    hotels: {
      bayswell: { en: 'Classic seaside hotel with comfortable rooms and parking', pl: 'Klasyczny nadmorski hotel z wygodnymi pokojami i parkingiem' },
      hillside: { en: 'Comfortable accommodation with sea views', pl: 'Komfortowy nocleg z widokiem na morze' },
      dunmuir: { en: 'Modern hotel with excellent amenities', pl: 'Nowoczesny hotel ze świetnymi udogodnieniami' },
    },
  },

  // Gallery
  gallery: {
    heading: { en: 'Gallery', pl: 'Galeria' },
    subtitle: { en: "A glimpse of where we'll celebrate", pl: 'Miejsce naszego święta' },
  },

  // Footer
  footer: {
    questions: { en: 'Questions? Get in touch at', pl: 'Pytania? Napisz do nas na' },
    madeWith: { en: 'Made with love for our special day', pl: 'Stworzone z miłością na nasz wyjątkowy dzień' },
    logout: { en: 'Log out', pl: 'Wyloguj' },
  },
} as const;

export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let value: unknown = translations;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  if (value && typeof value === 'object' && lang in value) {
    return (value as Record<string, string>)[lang];
  }
  return key;
}
