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
    let audioCtx = null;

    // Pre-loading audio players cleanly
    const clickAudioPlayer = new Audio('./velvet-snap.mp3');
    clickAudioPlayer.volume = 0.9;
    clickAudioPlayer.preload = 'auto';

    const openingAudioPlayer = new Audio('./opening.mp3');
    openingAudioPlayer.volume = 0.9;
    openingAudioPlayer.preload = 'auto';

    // Desktop Studio Trick: Keeps the hardware sound card awake so short snaps aren't cut off
    const startSilentHardwareCarrier = () => {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a continuous wave set to 0 volume (completely silent)
            const silentOsc = audioCtx.createOscillator();
            const silentGain = audioCtx.createGain();
            
            silentOsc.type = 'sine';
            silentOsc.frequency.setValueAtTime(440, audioCtx.currentTime);
            silentGain.gain.setValueAtTime(0.0001, audioCtx.currentTime); // Inaudible to human ears
            
            silentOsc.connect(silentGain);
            silentGain.connect(audioCtx.destination);
            
            silentOsc.start();
            console.log("🔊 Desktop Audio Hardware Carrier activated successfully.");
        } catch (e) {
            console.log("AudioContext not supported or blocked:", e);
        }
    };

    // Global tactile micro-click handler with desktop navigation safety hold
    const playSyntheticClick = (event, interactiveElement) => {
        if (isMuted || !hasEntered) return;
        
        // Force wake the Audio Context if desktop suspended it
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        clickAudioPlayer.currentTime = 0; 
        clickAudioPlayer.play().catch(err => console.log("Audio play blocked:", err));

        // DESKTOP SAFEGUARD: Pause action briefly for the sound wave to clear the hardware gate
        if (interactiveElement.tagName === 'A' && interactiveElement.getAttribute('href')) {
            const href = interactiveElement.getAttribute('href');
            
            if (href !== '#' && !href.startsWith('javascript:')) {
                event.preventDefault();
                
                setTimeout(() => {
                    window.location.href = href;
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
            
            // Wake up desktop audio drivers instantly on the first click
            startSilentHardwareCarrier();
            
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
            
            // If user mutes, suspend the carrier to save computing power
            if (isMuted && audioCtx) {
                audioCtx.suspend();
            } else if (!isMuted && audioCtx) {
                audioCtx.resume();
            }

            globalSoundToggle.classList.toggle('muted', isMuted);
            globalSoundToggle.setAttribute('aria-label', isMuted ? 'Unmute environmental audio' : 'Mute environmental audio');
        });
    }
});
