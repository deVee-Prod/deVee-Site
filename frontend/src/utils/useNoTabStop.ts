import { useEffect, useRef } from 'react';

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * For purely decorative, aria-hidden visuals (3D carousels / orbits) that duplicate
 * a screen-reader/keyboard-accessible list elsewhere on the page.
 * Removes their descendants from the tab order so no focusable element lives inside
 * an aria-hidden region. Mouse/touch interaction is NOT affected.
 */
export function useNoTabStop<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const apply = () => {
      root.querySelectorAll<HTMLElement>(FOCUSABLE).forEach((el) => {
        el.setAttribute('tabindex', '-1');
      });
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return ref;
}
