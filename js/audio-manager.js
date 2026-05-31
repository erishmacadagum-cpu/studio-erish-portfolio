// js/audio-manager.js
document.addEventListener('DOMContentLoaded', () => {
  const snapSound = new Audio('velvet-snap.mp3');
  snapSound.volume = 0.5;

  const selectors = [
    'a', 
    'button', 
    '.btn-primary', 
    '.cta-btns a', 
    'a[href^="mailto:"]', 
    'a[href^="tel:"]'
  ];

  document.body.addEventListener('click', (event) => {
    const target = event.target.closest(selectors.join(','));
    if (target) {
      if (target.id === 'start-experience' || 
          target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA') {
        return;
      }
      snapSound.currentTime = 0;
      snapSound.play().catch(e => console.error("Audio playback blocked:", e));
    }
  });
});
