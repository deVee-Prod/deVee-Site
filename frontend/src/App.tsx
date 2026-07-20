import React, { useState, useEffect } from 'react';
import { router } from './router';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VideoSection } from './components/VideoSection';
import { UtilitiesSection } from './components/UtilitiesSection';
import { PluginsSection } from './components/PluginsSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { InfoPage } from './pages/InfoPage';
import { Error404Article } from './pages/Error404Article';
import { DriftingGridBackground } from './components/DriftingGridBackground';

function App() {
  const [path, setPath] = useState(router.getCurrentPath());

  useEffect(() => {
    return router.subscribe(setPath);
  }, []);

  if (path === '/info') {
    return <InfoPage />;
  }

  if (path === '/releases/error-404') {
    return <Error404Article />;
  }

  return (
    <div className="min-h-screen text-white selection:bg-orange-500 selection:text-white">
      <DriftingGridBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <VideoSection />
          <UtilitiesSection />
          <PluginsSection />
          <SocialSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
