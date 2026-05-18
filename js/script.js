document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Toggle active classes to open/close menu
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
        });
    }
});

// ==========================================================================
// Studio Erish — Luxury Sensory Audio Engine
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const welcomeOverture = document.getElementById('welcomeOverture');
    const tactileClick = document.getElementById('tactileClick');
    const globalSoundToggle = document.getElementById('globalSoundToggle');
    
    let isMuted = false;
    let overturePlayed = false;

    // Adjust volume increments for luxury subtlety (never harsh or loud)
    if (welcomeOverture) welcomeOverture.volume = 0.4;
    if (tactileClick) tactileClick.volume = 0.25;

    // Function to trigger the 7-Second Welcome Overture
    const playWelcomeOverture = () => {
        if (!overturePlayed && welcomeOverture && !isMuted) {
            welcomeOverture.play().then(() => {
                overturePlayed = true;
                // Remove the global trigger listeners once played successfully
                document.removeEventListener('click', playWelcomeOverture);
                document.removeEventListener('touchstart', playWelcomeOverture);
            }).catch(error => {
                console.log("Awaiting deliberate user interaction to release audio signature.");
            });
        }
    };

    // Trigger overture on the client's very first interaction with the interface
    document.addEventListener('click', playWelcomeOverture);
    document.addEventListener('touchstart', playWelcomeOverture);

    // Function to trigger micro-tactile click sounds
    const playTactileClick = () => {
        if (tactileClick && !isMuted) {
            // Reset audio track timeline to 0 so overlapping rapid clicks execute instantly
            tactileClick.currentTime = 0;
            tactileClick.play();
        }
    };

    // Attach click audio signature to all interactive brand parameters
    const attachSensoryClicks = () => {
        const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .menu-toggle');
        interactiveElements.forEach(element => {
            // Skip the audio master controller itself to prevent loop confusion
            if (element.id === 'globalSoundToggle' || element.closest('#globalSoundToggle')) return;
            
            element.addEventListener('click', playTactileClick);
        });
    };

    // Initialize sensory mapping
    attachSensoryClicks();

    // Master Audio Dock Toggle Control
    if (globalSoundToggle) {
        globalSoundToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents toggle click from firing the welcome overture accidentally
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
