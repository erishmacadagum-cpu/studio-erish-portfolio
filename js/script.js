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

    // Pre-load the working opening file track cleanly
    const openingAudioPlayer = new Audio('./opening.mp3');
    openingAudioPlayer.volume = 0.9;
    openingAudioPlayer.preload = 'auto';

    // Generates a flawless, organic, premium mechanical micro-click using pure frequency waves
    const playSyntheticClick = () => {
        if (isMuted || !hasEntered) return;

        // Initialize Web Audio Context if it hasn't started yet
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // High-end acoustic signature tuning
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(160, now); // Crisp tactile strike frequency
        oscillator.frequency.exponentialRampToValueAtTime(80, now + 0.04); // Deep mechanical drop

        // Volume Envelope (Damped, high-end studio sound)
        gainNode.gain.setValueAtTime(0.4, now); // Audible, clean volume height
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04); // Smooth velvet fade

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.04);
    };

    // 3. IMMEDIATE BINDING POOL
    const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .menu-toggle');
    interactiveElements.forEach(element => {
        if (element.id !== 'globalSoundToggle' && element.id !== 'enterStudioBtn' && !element.closest('#globalSoundToggle')) {
            element.addEventListener('click', playSyntheticClick);
        }
    });

    // 4. EXPERIENTIAL TRANSITION TRIGGER
    if (enterStudioBtn && entranceCurtain) {
        enterStudioBtn.addEventListener('click', () => {
            hasEntered = true;
            
            // Start browser audio system instantly on user interaction
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            if (!isMuted) {
                openingAudioPlayer.play().catch(err => console.log("Audio play blocked:", err));
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
