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

    // PRE-LOAD THE AUDIO ASSETS ONCE (This stops the browser from blocking them)
    const clickAudioPlayer = new Audio('./velvet-snap.mp3');
    clickAudioPlayer.volume = 0.9; // Maximize crispness
    clickAudioPlayer.preload = 'auto';

    const openingAudioPlayer = new Audio('./opening.mp3');
    openingAudioPlayer.volume = 0.9;
    openingAudioPlayer.preload = 'auto';

    // Tactile micro-click response using the pre-loaded player
    const playSyntheticClick = () => {
        if (isMuted) return;
        
        // Reset sound to start instantly even if clicked repeatedly
        clickAudioPlayer.currentTime = 0; 
        clickAudioPlayer.play().catch(err => console.log("Audio playback blocked:", err));
    };

    // Grand cinematic opening audio track using the pre-loaded player
    const playCinematicOverture = () => {
        if (isMuted) return;
        openingAudioPlayer.play().catch(err => console.log("Audio playback blocked:", err));
    };

    // Attach click audio signature securely to all interactive parameters
    const attachSensoryClicks = () => {
        const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .menu-toggle');
        
        interactiveElements.forEach(element => {
            if (element.id !== 'globalSoundToggle' && 
                element.id !== 'enterStudioBtn' && 
                !element.closest('#globalSoundToggle')) {
                
                element.removeEventListener('click', playSyntheticClick);
                element.addEventListener('click', playSyntheticClick);
            }
        });
    };

    // Trigger Overture, activate links, and dissolve screen on deliberate button click
    if (enterStudioBtn && entranceCurtain) {
        enterStudioBtn.addEventListener('click', () => {
            playCinematicOverture();
            
            // Activate the click sounds instantly when entering
            attachSensoryClicks();
            
            entranceCurtain.style.transition = "opacity 1.5s ease, visibility 1.5s";
            entranceCurtain.style.opacity = "0";
            entranceCurtain.style.visibility = "hidden";
        });
    }

    // Global volume toggle intercept handler
    if (globalSoundToggle) {
        globalSoundToggle.addEventListener('click', () => {
            isMuted = !isMuted;
            globalSoundToggle.classList.toggle('muted', isMuted);
            globalSoundToggle.setAttribute('aria-label', isMuted ? 'Unmute environmental audio' : 'Mute environmental audio');
        });
    }
});
