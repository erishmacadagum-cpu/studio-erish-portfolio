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
    let gainNode = null;
    let audioSource = null;

    // Pre-loading audio players cleanly
    const clickAudioPlayer = new Audio('./velvet-snap.mp3');
    clickAudioPlayer.preload = 'auto';

    const openingAudioPlayer = new Audio('./opening.mp3');
    openingAudioPlayer.volume = 0.9;
    openingAudioPlayer.preload = 'auto';

    // Desktop Studio Engine: Connects the click file to a powerful volume booster
    const initializeAudioEngine = () => {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a Gain Node to manually overdrive the volume wave
            gainNode = audioCtx.createGain();
            gainNode.gain.setValueAtTime(2.5, audioCtx.currentTime); // 🚀 OVERDRIVE: Boosts volume to 250%

            // Hook the click audio element into our amplifier
            audioSource = audioCtx.createMediaElementSource(clickAudioPlayer);
            audioSource.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            // Create a background silent carrier to keep the desktop channel open
            const silentOsc = audioCtx.createOscillator();
            const silentGain = audioCtx.createGain();
            silentOsc.type = 'sine';
            silentOsc.frequency.setValueAtTime(440, audioCtx.currentTime);
            silentGain.gain.setValueAtTime(0.0001, audioCtx.currentTime); 
            
            silentOsc.connect(silentGain);
            silentGain.connect(audioCtx.destination);
            silentOsc.start();
            
            console.log("🔊 Web Audio Engine with 250% Volume Overdrive activated.");
        } catch (e) {
            console.log("Audio Engine setup skipped or handled:", e);
        }
    };

    // Global tactile micro-click handler with desktop navigation safety hold
    const playSyntheticClick = (event, interactiveElement) => {
        if (isMuted || !hasEntered) return;
        
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        clickAudioPlayer.currentTime = 0; 
        clickAudioPlayer.play().catch(err => console.log("Audio play blocked:", err));

        // DESKTOP SAFEGUARD: Pause action briefly for the heavy sound wave to clear the hardware gate
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
            
            // Fire up the overdrive amplifier immediately
            initializeAudioEngine();
            
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
            
            if (audioCtx) {
                if (isMuted) {
                    audioCtx.suspend();
                } else {
                    audioCtx.resume();
                }
            }

            globalSoundToggle.classList.toggle('muted', isMuted);
            globalSoundToggle.setAttribute('aria-label', isMuted ? 'Unmute environmental audio' : 'Mute environmental audio');
        });
    }
});
