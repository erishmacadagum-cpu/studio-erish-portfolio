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

    // Pre-loading audio players
    const clickAudioPlayer = new Audio('./velvet-snap.mp3');
    clickAudioPlayer.volume = 0.9;
    clickAudioPlayer.preload = 'auto';

    const openingAudioPlayer = new Audio('./opening.mp3');
    openingAudioPlayer.volume = 0.9;
    openingAudioPlayer.preload = 'auto';

    // Global tactile micro-click handler with strict diagnostic reporting
    const playSyntheticClick = () => {
        if (isMuted) {
            console.log("🔊 Click blocked: Site is muted.");
            return;
        }
        if (!hasEntered) {
            console.log("🔊 Click blocked: User has not cleared the entrance curtain yet.");
            return;
        }
        
        clickAudioPlayer.currentTime = 0; 
        
        clickAudioPlayer.play()
            .then(() => console.log("✅ SUCCESS: velvet-snap.mp3 played perfectly!"))
            .catch(err => {
                console.error("❌ ERROR playing velvet-snap.mp3:", err.name, "-", err.message);
                console.log("💡 Tip: Check if the file is inside a folder, or if the name is spelled exactly correctly.");
            });
    };

    // 3. GLOBAL EVENT DELEGATION POOL
    document.addEventListener('click', (event) => {
        const target = event.target;
        const interactiveElement = target.closest('a, button, input[type="submit"], .menu-toggle');
        
        if (interactiveElement) {
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
            hasEntered = true;
            
            // Explicitly force-wake both audio elements using the primary click gesture
            clickAudioPlayer.load(); 
            openingAudioPlayer.load();

            if (!isMuted) {
                openingAudioPlayer.play()
                    .then(() => console.log("✅ SUCCESS: opening.mp3 started playing."))
                    .catch(err => console.error("❌ ERROR playing opening.mp3:", err));
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
