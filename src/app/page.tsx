import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import GuestNote from '@/components/GuestNote';
import Venue from '@/components/Venue';
import Schedule from '@/components/Schedule';
import RSVPForm from '@/components/RSVPForm';
import HoneymoonFund from '@/components/HoneymoonFund';
import Travel from '@/components/Travel';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <GuestNote />
      <Venue />
      <Schedule />
      <RSVPForm />
      <HoneymoonFund />
      <Travel />
      <Gallery />
      <Footer />
    </main>
  );
}
