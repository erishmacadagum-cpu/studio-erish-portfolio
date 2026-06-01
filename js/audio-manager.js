// js/audio-manager.js
document.addEventListener('DOMContentLoaded', () => {
  const snapSound = new Audio('/velvet-snap.mp3');
  snapSound.volume = 0.5;

  const selectors = [
  'a', 
    'button', 
    '.btn-primary', 
    '.btn-ghost', 
    '.cta-btns a', 
    'a[href^="mailto:"]', 
    'a[href^="tel:"]'
  ];

  document.body.addEventListener('click', (event) => {
    const target = event.target.closest(selectors.join(','));
    if (target) {
      // 1. If it's our MAIN button, play opening sound and skip snap sound
      if (target.id === 'start-experience') {
        const openingSound = new Audio('opening.mp3');
        openingSound.play().catch(e => console.error("Opening sound blocked:", e));
        document.querySelector('.trust-strip').scrollIntoView({ behavior: 'smooth' });
        return; 
      }
      
      // 2. Otherwise, play the standard snap sound for other links/buttons
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        snapSound.currentTime = 0;
        snapSound.play().catch(e => console.error("Snap sound blocked:", e));
      }
    }
  });
});
