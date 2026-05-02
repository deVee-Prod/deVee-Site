import React, { useState, useEffect } from 'react';
import { router } from './router';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NewsBanner } from './components/NewsBanner';
import { VideoSection } from './components/VideoSection';
import { UtilitiesSection } from './components/UtilitiesSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { InfoPage } from './pages/InfoPage';

function App() {
  const [path, setPath] = useState(router.getCurrentPath());

  useEffect(() => {
    return router.subscribe(setPath);
  }, []);

  if (path === '/info') {
    return <InfoPage />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      <Header />
      <main>
        <HeroSection />
        <NewsBanner />
        <VideoSection />
        <UtilitiesSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
