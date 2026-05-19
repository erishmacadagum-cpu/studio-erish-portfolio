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

    // Rebuilt, safely clamped audio data string
    const EMBEDDED_SNAP_DATA = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWGluyWAAAA8AAAAbBaABbAACvwgADBwsPEBITfxgZHwdHyAjJCcoKSstLi8wMTM0NTY3ODk6Ozs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjYEdIR0hHSMdIx0g=";

    const initAudioEngine = () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    };

    // Synthesizes a premium, velvet-damped mechanical micro-click response
    const playSyntheticClick = () => {
        if (isMuted) return;
        initAudioEngine();

        const now = audioCtx.currentTime;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(140, now);
        oscillator.frequency.exponentialRampToValueAtTime(70, now + 0.03);

        gainNode.gain.setValueAtTime(0.07, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.03);
    };

    // Synthesizes a deep premium atmospheric overture string response
    const playSyntheticOverture = () => {
        initAudioEngine();

        const now = audioCtx.currentTime;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(110, now);
        oscillator.frequency.exponentialRampToValueAtTime(60, now + 0.02);

        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.02);
    };

    // Attach click audio signature securely to all interactive parameters
    const attachSensoryClicks = () => {
        const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .menu-toggle');
        
        interactiveElements.forEach(element => {
            // Corrected conditional wrapper to bypass exclusion elements perfectly
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
            playSyntheticOverture();
            
            // Re-bind click events smoothly inside authorized user gesture window
            attachSensoryClicks();
            
            // Dissolve loading overlay
            entranceCurtain.style.transition = "opacity 0.8s ease, visibility 0.8s";
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
