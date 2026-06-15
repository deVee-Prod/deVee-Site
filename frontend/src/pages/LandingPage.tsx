import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { VideoSection } from '../components/VideoSection';
import { SectionSeparator } from '../components/SectionSeparator';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { DriftingGridBackground } from '../components/DriftingGridBackground';

export function LandingPage() {
  return (
    <div className="min-h-screen text-white">
      <DriftingGridBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <VideoSection />
          <SectionSeparator />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
