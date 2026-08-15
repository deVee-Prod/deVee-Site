import { useEffect, useState } from 'react';

const IMGS = [
  '/bg-crush.webp',
  '/bg-gondola.webp',
  '/bg-shadow.webp',
  '/bg-zohar.webp',
  '/bg-yali.webp',
  '/bg-fck-that.webp',
  '/bg-cat.webp',
  '/bg-new-photo.jpg',
];

// 3 sets of 16 — 8 images shuffled differently each set
const IMAGE_SETS: string[][] = [
  [
    IMGS[0], IMGS[7], IMGS[2], IMGS[3],
    IMGS[4], IMGS[5], IMGS[6], IMGS[0],
    IMGS[2], IMGS[6], IMGS[7], IMGS[4],
    IMGS[3], IMGS[1], IMGS[6], IMGS[2],
  ],
  [
    IMGS[3], IMGS[7], IMGS[1], IMGS[0],
    IMGS[2], IMGS[4], IMGS[3], IMGS[5],
    IMGS[6], IMGS[2], IMGS[4], IMGS[7],
    IMGS[5], IMGS[3], IMGS[0], IMGS[6],
  ],
  [
    IMGS[6], IMGS[4], IMGS[7], IMGS[5],
    IMGS[1], IMGS[3], IMGS[6], IMGS[2],
    IMGS[7], IMGS[0], IMGS[1], IMGS[3],
    IMGS[4], IMGS[6], IMGS[5], IMGS[2],
  ],
];

export function DriftingGridBackground() {
  const [setIndex, setSetIndex] = useState(0);
  const [opacity, setOpacity] = useState(0.38);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setOpacity(0.1);
      timeout = setTimeout(() => {
        setSetIndex(i => (i + 1) % IMAGE_SETS.length);
        setOpacity(0.38);
      }, 800);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const images = IMAGE_SETS[setIndex];

  return (
    <div className="bg-drift-container" aria-hidden="true">
      <div className="bg-drift-overlay-dark" />
      <div className="bg-drift-glow-orange" />
      <div className="bg-drift-overlay-grad" />
      <div
        className="bg-drift-grid bg-drift-grid-animated"
        style={{ opacity, transition: 'opacity 0.8s ease' }}
      >
        {images.map((src, i) => (
          <div key={i} className="bg-drift-cell">
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
