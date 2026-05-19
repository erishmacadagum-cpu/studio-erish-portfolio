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
    let audioCtx = null;

    const initAudioEngine = () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    };

    // Tactile micro-click response (Volume boosted to 0.8)
    const playSyntheticClick = () => {
        if (isMuted) return;
        const clickAudio = new Audio('velvet-snap.mp3');
        clickAudio.volume = 0.8; // Louder, premium tactile response
        clickAudio.play().catch(err => console.log("Audio playback blocked:", err));
    };

    // Synthesizes a deep cinematic ambient note directly in the browser
    const playCinematicOverture = () => {
        initAudioEngine();
        const now = audioCtx.currentTime;
        
        // Creates a deep, rich low-frequency oscillator blend
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(90, now); // Deep base frequency
        osc1.frequency.linearRampToValueAtTime(45, now + 2.0); // Smooth downward sweep

        osc2.type = 'triangle'; // Adds velvet warmth texture
        osc2.frequency.setValueAtTime(92, now);
        osc2.frequency.linearRampToValueAtTime(46, now + 2.0);

        gainNode.gain.setValueAtTime(0.2, now); // Master volume for opening note
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.5); // Smooth fade-out over 2.5 seconds

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.5);
        osc2.stop(now + 2.5);
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
            // OPTION A: Synthesized deep cinematic note
            playCinematicOverture();
            
            // NOTE FOR LATER: If you prefer your 8-second MP3 file instead, 
            // delete the line above and uncomment the two lines below:
            // const customOpening = new Audio('YOUR_FILE_NAME.mp3');
            // customOpening.play().catch(err => console.log(err));

            // Re-bind click events smoothly inside authorized user gesture window
            attachSensoryClicks();
            
            // Dissolve loading overlay instantly
            entranceCurtain.style.transition = "opacity 1.2s ease, visibility 1.2s";
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
