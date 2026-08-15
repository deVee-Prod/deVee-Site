(function() {
  // Styles for the accessibility widget
  const styleContent = `
    #a11y-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: system-ui, -apple-system, sans-serif;
    }
    
    #a11y-trigger {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #1a1a2e;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      color: #ffffff;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    
    #a11y-trigger:hover, #a11y-trigger:focus {
      background-color: #232342;
      transform: scale(1.05);
      outline: 2px solid #ffffff;
      outline-offset: 2px;
    }

    @keyframes a11y-pulse {
      0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
      70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
    }
    
    .a11y-pulse-anim {
      animation: a11y-pulse 1.5s 2;
    }

    #a11y-panel {
      position: absolute;
      bottom: 60px;
      right: 0;
      width: 320px;
      max-width: calc(100vw - 40px);
      background: rgba(26, 26, 46, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      padding: 20px;
      box-sizing: border-box;
      opacity: 0;
      transform: translateY(20px);
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
      color: #ffffff;
    }

    #a11y-panel.a11y-open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .a11y-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 10px;
    }
    
    .a11y-title {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }

    .a11y-close {
      background: none;
      border: none;
      color: #ffffff;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      opacity: 0.7;
    }
    
    .a11y-close:hover, .a11y-close:focus {
      opacity: 1;
    }

    .a11y-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 20px;
    }

    .a11y-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 12px 8px;
      color: #ffffff;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: all 0.2s ease;
    }
    
    .a11y-btn:hover, .a11y-btn:focus {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .a11y-btn.a11y-active {
      background: rgba(249, 115, 22, 0.2);
      border-color: #f97316;
      color: #ffffff;
    }

    .a11y-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }

    .a11y-reset {
      width: 100%;
      background: #d9534f;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 12px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s ease;
      margin-bottom: 15px;
    }
    
    .a11y-reset:hover, .a11y-reset:focus {
      background: #c9302c;
    }

    .a11y-footer {
      text-align: center;
      font-size: 12px;
    }
    
    .a11y-link {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: underline;
    }
    
    .a11y-link:hover, .a11y-link:focus {
      color: #ffffff;
    }
  `;

  // Inject styles
  const styleTag = document.createElement('style');
  styleTag.id = 'a11y-widget-styles';
  styleTag.innerHTML = styleContent;
  document.head.appendChild(styleTag);

  // Dynamic CSS injector for features
  const injectFeatureCSS = (id, css) => {
    let tag = document.getElementById(id);
    if (!tag) {
      tag = document.createElement('style');
      tag.id = id;
      document.head.appendChild(tag);
    }
    tag.innerHTML = css;
  };
  
  const removeFeatureCSS = (id) => {
    const tag = document.getElementById(id);
    if (tag) tag.remove();
  };

  // Create UI
  const container = document.createElement('div');
  container.id = 'a11y-widget-container';
  
  const trigger = document.createElement('button');
  trigger.id = 'a11y-trigger';
  trigger.setAttribute('aria-label', 'Open accessibility menu');
  trigger.innerHTML = '♿';
  trigger.className = 'a11y-pulse-anim';
  
  // Remove pulse animation after 3 seconds
  setTimeout(() => {
    trigger.classList.remove('a11y-pulse-anim');
  }, 3000);

  const panel = document.createElement('div');
  panel.id = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Accessibility Settings');
  
  // Panel content
  panel.innerHTML = `
    <div class="a11y-header">
      <h2 class="a11y-title">♿ Accessibility</h2>
      <button class="a11y-close" aria-label="Close accessibility menu">×</button>
    </div>
    <div class="a11y-grid">
      <button class="a11y-btn" data-feature="increaseFont">
        <span class="a11y-icon">🔤</span>
        <span>Increase Font</span>
      </button>
      <button class="a11y-btn" data-feature="decreaseFont">
        <span class="a11y-icon">🔡</span>
        <span>Decrease Font</span>
      </button>
      <button class="a11y-btn" data-feature="highContrast">
        <span class="a11y-icon">◐</span>
        <span>High Contrast</span>
      </button>
      <button class="a11y-btn" data-feature="grayscale">
        <span class="a11y-icon">🌑</span>
        <span>Grayscale</span>
      </button>
      <button class="a11y-btn" data-feature="highlightLinks">
        <span class="a11y-icon">🔗</span>
        <span>Highlight Links</span>
      </button>
      <button class="a11y-btn" data-feature="readableFont">
        <span class="a11y-icon">🅰️</span>
        <span>Readable Font</span>
      </button>
      <button class="a11y-btn" data-feature="largeCursor">
        <span class="a11y-icon">🖱️</span>
        <span>Large Cursor</span>
      </button>
      <button class="a11y-btn" data-feature="stopAnimations">
        <span class="a11y-icon">⏸️</span>
        <span>Stop Animations</span>
      </button>
    </div>
    <button class="a11y-reset">Reset All</button>
    <div class="a11y-footer">
      <a href="/nagishut.html" class="a11y-link">Accessibility Statement</a>
    </div>
  `;

  container.appendChild(trigger);
  container.appendChild(panel);
  document.body.appendChild(container);

  // State
  let isOpen = false;
  let fontLevel = 0; // 0, 1, 2, 3
  const fontSizes = ['100%', '120%', '144%', '172%'];
  
  const prefs = JSON.parse(localStorage.getItem('a11y-prefs') || '{}');
  
  // Logic
  const togglePanel = () => {
    isOpen = !isOpen;
    if (isOpen) {
      panel.classList.add('a11y-open');
      panel.querySelector('.a11y-close').focus();
    } else {
      panel.classList.remove('a11y-open');
      trigger.focus();
    }
  };

  trigger.addEventListener('click', togglePanel);
  panel.querySelector('.a11y-close').addEventListener('click', togglePanel);

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !container.contains(e.target)) {
      togglePanel();
    }
  });

  // Keyboard navigation & ESC to close
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      togglePanel();
    }
  });

  // Apply features
  const applyFeature = (feature, state) => {
    prefs[feature] = state;
    localStorage.setItem('a11y-prefs', JSON.stringify(prefs));
    
    const btn = panel.querySelector(`[data-feature="${feature}"]`);
    if (btn) {
      if (state) btn.classList.add('a11y-active');
      else btn.classList.remove('a11y-active');
    }

    switch (feature) {
      case 'highContrast':
        if (state) {
          injectFeatureCSS('a11y-css-highcontrast', `
            html { filter: contrast(1.5) !important; }
            body, div, section, header, footer, nav, aside, article, main { background-color: #000000 !important; color: #ffffff !important; }
            h1, h2, h3, h4, h5, h6, p, span, a, li, td, th { color: #ffffff !important; text-shadow: none !important; }
          `);
        } else {
          removeFeatureCSS('a11y-css-highcontrast');
        }
        break;
      case 'grayscale':
        if (state) {
          injectFeatureCSS('a11y-css-grayscale', 'html { filter: grayscale(100%) !important; }');
        } else {
          removeFeatureCSS('a11y-css-grayscale');
        }
        break;
      case 'highlightLinks':
        if (state) {
          injectFeatureCSS('a11y-css-links', 'a { text-decoration: underline !important; color: #ffff00 !important; outline: 1px dashed #ffff00 !important; outline-offset: 2px !important; }');
        } else {
          removeFeatureCSS('a11y-css-links');
        }
        break;
      case 'readableFont':
        if (state) {
          injectFeatureCSS('a11y-css-font', '* { font-family: Arial, Helvetica, sans-serif !important; }');
        } else {
          removeFeatureCSS('a11y-css-font');
        }
        break;
      case 'largeCursor':
        if (state) {
          const cursorSvg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><polygon points="12,12 12,52 24,40 32,56 40,52 32,36 48,36" fill="black" stroke="white" stroke-width="2"/></svg>';
          injectFeatureCSS('a11y-css-cursor', `* { cursor: url('${cursorSvg}') 12 12, auto !important; }`);
        } else {
          removeFeatureCSS('a11y-css-cursor');
        }
        break;
      case 'stopAnimations':
        if (state) {
          injectFeatureCSS('a11y-css-animations', '*, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }');
        } else {
          removeFeatureCSS('a11y-css-animations');
        }
        break;
    }
  };

  const updateFontSize = () => {
    if (fontLevel === 0 && !prefs.decreaseFont) {
      removeFeatureCSS('a11y-css-fontsize');
      panel.querySelector('[data-feature="increaseFont"]').classList.remove('a11y-active');
      panel.querySelector('[data-feature="decreaseFont"]').classList.remove('a11y-active');
    } else if (prefs.decreaseFont) {
      injectFeatureCSS('a11y-css-fontsize', 'html { font-size: 85% !important; }');
      panel.querySelector('[data-feature="increaseFont"]').classList.remove('a11y-active');
      panel.querySelector('[data-feature="decreaseFont"]').classList.add('a11y-active');
      fontLevel = 0;
    } else {
      injectFeatureCSS('a11y-css-fontsize', `html { font-size: ${fontSizes[fontLevel]} !important; }`);
      panel.querySelector('[data-feature="increaseFont"]').classList.add('a11y-active');
      panel.querySelector('[data-feature="decreaseFont"]').classList.remove('a11y-active');
    }
    
    prefs.fontLevel = fontLevel;
    localStorage.setItem('a11y-prefs', JSON.stringify(prefs));
  };

  // Button listeners
  panel.querySelectorAll('.a11y-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const feature = btn.getAttribute('data-feature');
      
      if (feature === 'increaseFont') {
        fontLevel = (fontLevel + 1) % fontSizes.length;
        prefs.decreaseFont = false;
        updateFontSize();
      } else if (feature === 'decreaseFont') {
        prefs.decreaseFont = !prefs.decreaseFont;
        if (prefs.decreaseFont) fontLevel = 0;
        updateFontSize();
      } else {
        applyFeature(feature, !prefs[feature]);
      }
    });
  });

  // Reset
  panel.querySelector('.a11y-reset').addEventListener('click', () => {
    Object.keys(prefs).forEach(key => applyFeature(key, false));
    fontLevel = 0;
    prefs.decreaseFont = false;
    updateFontSize();
    localStorage.removeItem('a11y-prefs');
  });

  // Init from prefs
  if (prefs.fontLevel) fontLevel = prefs.fontLevel;
  updateFontSize();
  
  ['highContrast', 'grayscale', 'highlightLinks', 'readableFont', 'largeCursor', 'stopAnimations'].forEach(feature => {
    if (prefs[feature]) applyFeature(feature, true);
  });

})();
