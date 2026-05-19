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

    // System States
    let isMuted = false;
    let hasEntered = false; // Audio is safely locked until experience begins

    // Pre-load audio elements cleanly so browser memory never chokes
    const clickAudioPlayer = new Audio('./velvet-snap.mp3');
    clickAudioPlayer.volume = 0.9;
    clickAudioPlayer.preload = 'auto';

    const openingAudioPlayer = new Audio('./opening.mp3');
    openingAudioPlayer.volume = 0.9;
    openingAudioPlayer.preload = 'auto';

    // Global tactile micro-click handler
    const playSyntheticClick = () => {
        // Only allow clicking sound if the user is inside and not muted
        if (isMuted || !hasEntered) return;
        
        // Instant recoil reset so rapid clicks never drop sound
        clickAudioPlayer.currentTime = 0; 
        clickAudioPlayer.play().catch(err => console.log("Audio play blocked:", err));
    };

    // 3. GLOBAL EVENT DELEGATION POOL
    // Listens to the entire document dynamically. This guarantees that elements loaded 
    // behind the curtain are caught perfectly without relying on fragile loops.
    document.addEventListener('click', (event) => {
        const target = event.target;
        
        // Check if the clicked element (or its parent) matches your target elements
        const interactiveElement = target.closest('a, button, input[type="submit"], .menu-toggle');
        
        if (interactiveElement) {
            // Bypass exclusions completely (control elements should not trigger the snap click)
            if (interactiveElement.id !== 'globalSoundToggle' && 
                interactiveElement.id !== 'enterStudioBtn' && 
                !interactiveElement.closest('#globalSoundToggle')) {
                
                playSyntheticClick();
            }
        }
    });

    // 4. EXPERIENTIAL TRANSITION TRIGGER
    if (enterStudioBtn && entranceCurtain) {
        enterStudioBtn.addEventListener('click', () => {
            // Unlocks the interactive sound gate safely inside the browser's permitted window
            hasEntered = true;
            
            // Play the gorgeous 8-second ambient overture
            if (!isMuted) {
                openingAudioPlayer.play().catch(err => console.log("Audio play blocked:", err));
            }
            
            // Dissolve loading overlay seamlessly
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
