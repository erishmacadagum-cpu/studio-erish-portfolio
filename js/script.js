document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE NAVIGATION MENU LOGIC
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
        });
    }

    // 2. LUXURY SENSORY AUDIO ENGINE
    const entranceCurtain = document.getElementById('entranceCurtain');
    const enterStudioBtn = document.getElementById('enterStudioBtn');
    const globalSoundToggle = document.getElementById('globalSoundToggle');

    let isMuted = false;
    let hasEntered = false;

    // Pre-loading audio players cleanly
    const clickAudioPlayer = new Audio('./velvet-snap.mp3');
    clickAudioPlayer.volume = 0.9;
    clickAudioPlayer.preload = 'auto';

    const openingAudioPlayer = new Audio('./opening.mp3');
    openingAudioPlayer.volume = 0.9;
    openingAudioPlayer.preload = 'auto';

    // Global tactile micro-click handler with a desktop navigation safety hold
    const playSyntheticClick = (event, interactiveElement) => {
        if (isMuted || !hasEntered) return;
        
        clickAudioPlayer.currentTime = 0; 
        clickAudioPlayer.play().catch(err => console.log("Audio play blocked:", err));

        // DESKTOP SAFEGUARD: If it's a standard linking anchor tag, pause action briefly for the sound to play
        if (interactiveElement.tagName === 'A' && interactiveElement.getAttribute('href')) {
            const href = interactiveElement.getAttribute('href');
            
            // Only delay if it's an external link or smooth-scrolling link
            if (href !== '#' && !href.startsWith('javascript:')) {
                event.preventDefault(); // Pause the instant browser jump
                
                setTimeout(() => {
                    window.location.href = href; // Execute link after 150ms snap window
                }, 150);
            }
        }
    };

    // 3. GLOBAL EVENT DELEGATION POOL
    document.addEventListener('click', (event) => {
        const target = event.target;
        const interactiveElement = target.closest('a, button, input[type="submit"], .menu-toggle');
        
        if (interactiveElement) {
            if (interactiveElement.id !== 'globalSoundToggle' && 
                interactiveElement.id !== 'enterStudioBtn' && 
                !interactiveElement.closest('#globalSoundToggle')) {
                
                playSyntheticClick(event, interactiveElement);
            }
        }
    });

    // 4. EXPERIENTIAL TRANSITION TRIGGER
    if (enterStudioBtn && entranceCurtain) {
        enterStudioBtn.addEventListener('click', () => {
            hasEntered = true;
            
            clickAudioPlayer.load(); 
            openingAudioPlayer.load();

            if (!isMuted) {
                openingAudioPlayer.play().catch(err => console.error("Audio play blocked:", err));
            }
            
            entranceCurtain.style.transition = "opacity 1.5s ease, visibility 1.5s";
            entranceCurtain.style.opacity = "0";
            entranceCurtain.style.visibility = "hidden";
        });
    }

    // 5. GLOBAL MUTE CONTROL
    if (globalSoundToggle) {
        globalSoundToggle.addEventListener('click', () => {
            isMuted = !isMuted;
            globalSoundToggle.classList.toggle('muted', isMuted);
            globalSoundToggle.setAttribute('aria-label', isMuted ? 'Unmute environmental audio' : 'Mute environmental audio');
        });
    }
});
