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

    const openingAudioPlayer = new Audio('./opening.mp3');
    openingAudioPlayer.volume = 0.9;
    openingAudioPlayer.preload = 'auto';

    // Generates the mechanical click and forces the engine awake on every single trigger
    const playSyntheticClick = () => {
        if (isMuted || !hasEntered) return;

        // Force create or resume the audio context instantly on every single click
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(150, now); 
        oscillator.frequency.exponentialRampToValueAtTime(70, now + 0.03); 

        gainNode.gain.setValueAtTime(0.6, now); 
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.03); 

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.03);
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
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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
                if (isMuted) audioCtx.suspend();
                else audioCtx.resume();
            }
            globalSoundToggle.classList.toggle('muted', isMuted);
        });
    }
});
