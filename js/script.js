window.addEventListener("DOMContentLoaded", function () {
    // 1. Setup Isolated Ambient Background Engine
    let audioEngine = document.getElementById("studio-ambient-music");
    
    if (!audioEngine) {
        audioEngine = document.createElement("audio");
        audioEngine.id = "studio-ambient-music";
        audioEngine.src = "opening.mp3"; // Background loop ONLY
        audioEngine.loop = true;
        audioEngine.style.display = "none"; 
        document.body.appendChild(audioEngine);
    }

    // Load saved tracking states
    const savedTime = localStorage.getItem("luxuryTime");
    if (savedTime) { audioEngine.currentTime = parseFloat(savedTime); }

    if (localStorage.getItem("luxuryPlaying") === "true") {
        audioEngine.play().catch(() => {
            // Unblock browser interactions
            document.addEventListener("click", function startAudio() {
                audioEngine.play();
                document.removeEventListener("click", startAudio);
            });
        });
    }

    window.addEventListener("beforeunload", function () {
        localStorage.setItem("luxuryTime", audioEngine.currentTime);
        localStorage.setItem("luxuryPlaying", !audioEngine.paused);
    });

    // 2. Completely Isolated Instant Interaction Click Trigger
    const playMechanicalSnap = () => {
        const snapEffect = new Audio("velvet-snap.mp3"); // Quick effect file ONLY
        snapEffect.volume = 0.95;
        snapEffect.play().catch(() => {});
    };

    // Apply snap effect to all navigation changes
    document.querySelectorAll("nav a, .cta-link-minimal, .logo-brand, .header-logo a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const destinationUrl = this.href;
                playMechanicalSnap();
                setTimeout(() => { window.location.href = destinationUrl; }, 200);
            }
        });
    });
});
