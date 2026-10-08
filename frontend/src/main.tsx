import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css'; //

const queryClient = new QueryClient();

const mount = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

/*
 * Let the static hero shell (see index.html) paint before React's heavy first render
 * blocks the main thread — otherwise the browser can postpone painting the LCP image.
 */
const shellImg = document.querySelector<HTMLImageElement>('#shell img');
if (shellImg) {
  let started = false;
  const start = () => { if (!started) { started = true; mount(); } };
  const afterPaint = () => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(start, 0)));
  (shellImg.decode ? shellImg.decode() : Promise.resolve()).then(afterPaint, afterPaint);
  setTimeout(start, 2500); // safety net
} else {
  mount();
}

/* Remove the static first-paint shell (see index.html) once React has painted the hero. */
const shell = document.getElementById('shell');
if (shell) {
  const removeShell = () => requestAnimationFrame(() => requestAnimationFrame(() => { shell.style.visibility = 'hidden'; }));
  const check = () => {
    const img = document.querySelector<HTMLImageElement>('#root section img[fetchpriority="high"]');
    if (img && img.complete) removeShell();
    else setTimeout(check, 50);
  };
  setTimeout(check, 0);
  setTimeout(() => { shell.style.visibility = 'hidden'; }, 4000); // safety net
}
