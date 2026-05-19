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

    // Tactile micro-click response (Paths updated to absolute root)
    const playSyntheticClick = () => {
        if (isMuted) return;
        const clickAudio = new Audio('./velvet-snap.mp3');
        clickAudio.volume = 0.8; 
        clickAudio.play().catch(err => console.log("Audio playback blocked:", err));
    };

    // Grand cinematic opening audio track (Paths updated to absolute root)
    const playCinematicOverture = () => {
        if (isMuted) return;
        const openingAudio = new Audio('./opening.mp3');
        openingAudio.volume = 0.9; 
        openingAudio.play().catch(err => console.log("Audio playback blocked:", err));
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
