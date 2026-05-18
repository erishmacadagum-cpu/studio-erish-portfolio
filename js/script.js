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
    const welcomeOverture = document.getElementById('welcomeOverture');
    const tactileClick = document.getElementById('tactileClick');
    const globalSoundToggle = document.getElementById('globalSoundToggle');
    const entranceCurtain = document.getElementById('entranceCurtain');
    const enterStudioBtn = document.getElementById('enterStudioBtn');
    
    let isMuted = false;

    // Subdued, luxury mixing volume levels
    if (welcomeOverture) welcomeOverture.volume = 0.45;
    if (tactileClick) tactileClick.volume = 0.25;

    // Trigger Overture and dissolve screen on deliberate button click
    if (enterStudioBtn && entranceCurtain) {
        enterStudioBtn.addEventListener('click', () => {
            // Play the welcome sound signature instantly
            if (welcomeOverture && !isMuted) {
                welcomeOverture.play().catch(err => console.log("Audio unlock handled:", err));
            }
            // Beautifully dissolve the screen overlay curtain
            entranceCurtain.classList.add('dissolved');
        });
    }

    // Function to trigger micro-tactile click sounds
    const playTactileClick = () => {
        if (tactileClick && !isMuted) {
            tactileClick.currentTime = 0;
            tactileClick.play();
        }
    };

    // Attach click audio signature to all interactive parameters
    const attachSensoryClicks = () => {
        const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .menu-toggle');
        interactiveElements.forEach(element => {
            if (element.id === 'globalSoundToggle' || element.id === 'enterStudioBtn' || element.closest('#globalSoundToggle')) return;
            element.addEventListener('click', playTactileClick);
        });
    };

    // Run the click setup
    attachSensoryClicks();

    // Master Audio Dock Toggle Control (Sound On/Off Button)
    if (globalSoundToggle) {
        globalSoundToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isMuted = !isMuted;
            
            if (isMuted) {
                globalSoundToggle.classList.add('muted');
                globalSoundToggle.querySelector('.sonic-status-label').textContent = "SOUND OFF";
                if (welcomeOverture) welcomeOverture.pause();
            } else {
                globalSoundToggle.classList.remove('muted');
                globalSoundToggle.querySelector('.sonic-status-label').textContent = "SOUND ON";
            }
        });
    }
});
