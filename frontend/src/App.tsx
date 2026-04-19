import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VideoSection } from './components/VideoSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;