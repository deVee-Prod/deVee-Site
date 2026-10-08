import React, { useState, useEffect, Suspense, lazy } from 'react';
import { router } from './router';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VideoSection } from './components/VideoSection';
import { DriftingGridBackground } from './components/DriftingGridBackground';

// Lazy load heavy below-the-fold components to reduce initial JS bundle size and improve mobile LCP
const UtilitiesSection = lazy(() => import('./components/UtilitiesSection').then(m => ({ default: m.UtilitiesSection })));
const PluginsSection = lazy(() => import('./components/PluginsSection').then(m => ({ default: m.PluginsSection })));
const SocialSection = lazy(() => import('./components/SocialSection').then(m => ({ default: m.SocialSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const InfoPage = lazy(() => import('./pages/InfoPage').then(m => ({ default: m.InfoPage })));
const Error404Article = lazy(() => import('./pages/Error404Article').then(m => ({ default: m.Error404Article })));

function App() {
  const [path, setPath] = useState(router.getCurrentPath());
  // Mount below-the-fold sections only after the page has loaded and the browser is idle,
  // so their JS (framer-motion etc.) doesn't compete with the hero's first paint.
  const [belowFold, setBelowFold] = useState(false);

  useEffect(() => {
    const go = () => {
      const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void, o?: { timeout: number }) => void);
      if (ric) ric(() => setBelowFold(true), { timeout: 1500 });
      else setTimeout(() => setBelowFold(true), 200);
    };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => window.removeEventListener('load', go);
  }, []);

  useEffect(() => {
    return router.subscribe(setPath);
  }, []);

  if (path === '/info') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        <InfoPage />
      </Suspense>
    );
  }

  if (path === '/releases/error-404') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Error404Article />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen text-white selection:bg-orange-500 selection:text-white">
      <DriftingGridBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <VideoSection />
          {belowFold && (
            <Suspense fallback={null}>
              <UtilitiesSection />
              <PluginsSection />
              <SocialSection />
            </Suspense>
          )}
        </main>
        {belowFold && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;
