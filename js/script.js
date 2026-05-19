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

    // Pre-load the custom audio asset instantly
    const clickAudio = new Audio('velvet-snap.mp3');
    clickAudio.volume = 0.5;
    clickAudio.preload = 'auto';

    // Safely initialize the browser's native audio engine
    const initAudioEngine = () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    };

    // Synthesizes a beautiful, warm 6-second Neoclassical Ambient Swell
    const playSyntheticOverture = () => {
        if (isMuted) return;
        initAudioEngine();
        
        const now = audioCtx.currentTime;
        const frequencies = [174.61, 220.00, 261.63, 329.63]; // Elegant F Major 7 Chord Structure
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = freq;
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.08, now + 2.0 + (index * 0.1)); 
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 6.0);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start(now);
            oscillator.stop(now + 6.0);
        });
    };

    // Master function to play your velvet snap asset
    const playSyntheticClick = () => {
        if (isMuted) return;
        initAudioEngine();
        
        // Reset sound pointer to the beginning so rapid clicks trigger perfectly
        clickAudio.currentTime = 0;
        
        // Play trigger with a built-in backup path fallback
        clickAudio.play().catch(() => {
            // Backup fallback attempt if root pathing shifts
            const fallbackAudio = new Audio('/velvet-snap.mp3');
            fallbackAudio.volume = 0.5;
            fallbackAudio.play().catch(err => console.log("Audio completely blocked:", err));
        });
    };

    // Attach click audio signature securely to all interactive parameters
    const attachSensoryClicks = () => {
        const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .menu-toggle');
        interactiveElements.forEach(element => {
            if (element.id === 'globalSoundToggle' || element.id === 'enterStudioBtn' || element.closest('#globalSoundToggle')) return;
            
            element.removeEventListener('click', playSyntheticClick);
            element.addEventListener('click', playSyntheticClick);
        });
    };

    // Trigger Overture, activate links, and dissolve screen on deliberate button click
    if (enterStudioBtn && entranceCurtain) {
        enterStudioBtn.addEventListener('click', () => {
            playSyntheticOverture();
            attachSensoryClicks(); // Binds click listeners inside an approved user gesture
            entranceCurtain.classList.add('dissolved');
        });
    }

    // Master Audio Dock Toggle Control
    if (globalSoundToggle) {
        globalSoundToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isMuted = !isMuted;
            
            if (isMuted) {
                globalSoundToggle.classList.add('muted');
                globalSoundToggle.querySelector('.sonic-status-label').textContent = "SOUND OFF";
            } else {
                globalSoundToggle.classList.remove('muted');
                globalSoundToggle.querySelector('.sonic-status-label').textContent = "SOUND ON";
                initAudioEngine();
                playSyntheticClick();
            }
        });
    }
});
