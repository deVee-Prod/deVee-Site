import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { VideoSection } from '../components/VideoSection';
import { SectionSeparator } from '../components/SectionSeparator';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <SectionSeparator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
