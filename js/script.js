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

    // 2. SELF-CONTAINED SYNTHETIC LUXURY AUDIO ENGINE
    const entranceCurtain = document.getElementById('entranceCurtain');
    const enterStudioBtn = document.getElementById('enterStudioBtn');
    const globalSoundToggle = document.getElementById('globalSoundToggle');
    
    let isMuted = false;
    let audioCtx = null;

    // Function to initialize the browser's native audio engine safely
    const initAudioEngine = () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    };

    // Synthesizes a beautiful, warm 6-second Neoclassical Ambient Swell
    const playSyntheticOverture = () => {
        if (isMuted) return;
        initAudioEngine();
        
        const now = audioCtx.currentTime;
        
        // Create an elegant multi-tone luxury chord (F Major 7 Atmosphere)
        const frequencies = [174.61, 220.00, 261.63, 329.63]; 
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            // Soft, organic sine waves for a pure, cinematic tone
            oscillator.type = 'sine';
            oscillator.frequency.value = freq;
            
            // Volume Envelope: Smooth 2-second fade-in, long 4-second luxury fade-out
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.08, now + 2.0 + (index * 0.1)); 
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 6.0);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start(now);
            oscillator.stop(now + 6.0);
        });
    };

    // Synthesizes a velvet, organic micro-click tactile response
    // Synthesizes a premium, velvet-damped mechanical click response
    const playSyntheticClick = () => {
        if (isMuted) return;
        initAudioEngine();
        
        const now = audioCtx.currentTime;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        // A pure, organic sine wave instead of a sharp triangle
        oscillator.type = 'sine'; 
        
        // Low, warm, luxury frequency (reminiscent of a physical button click)
        oscillator.frequency.setValueAtTime(160, now); 
        oscillator.frequency.exponentialRampToValueAtTime(80, now + 0.04);
        
        // Ultra-subtle volume envelope (a faint, rapid whisper of a sound)
        gainNode.gain.setValueAtTime(0.04, now); // Significantly lowered volume
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04); // Fast, clean decay
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start(now);
        oscillator.stop(now + 0.04);
    };
        if (isMuted) return;
        initAudioEngine();
        
        const now = audioCtx.currentTime;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'triangle'; // Warmer, wood-like tone
        oscillator.frequency.setValueAtTime(120, now); // Low-frequency dampening click
        oscillator.frequency.exponentialRampToValueAtTime(40, now + 0.08);
        
        // Rapid snap envelope
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start(now);
        oscillator.stop(now + 0.08);
    };

    // Trigger Overture and dissolve screen on deliberate click
    if (enterStudioBtn && entranceCurtain) {
        enterStudioBtn.addEventListener('click', () => {
            playSyntheticOverture();
            entranceCurtain.classList.add('dissolved');
        });
    }

    // Attach click audio signature to all interactive elements
    const attachSensoryClicks = () => {
        const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .menu-toggle');
        interactiveElements.forEach(element => {
            if (element.id === 'globalSoundToggle' || element.id === 'enterStudioBtn' || element.closest('#globalSoundToggle')) return;
            element.addEventListener('click', playSyntheticClick);
        });
    };

    attachSensoryClicks();

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
                playSyntheticClick();
            }
        });
    }
});
