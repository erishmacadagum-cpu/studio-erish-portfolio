document.addEventListener("DOMContentLoaded", function () {
    // 1. Setup Sound Elements
    let ambientMusic = document.getElementById("global-studio-audio");

    if (!ambientMusic) {
        ambientMusic = document.createElement("audio");
        ambientMusic.id = "global-studio-audio";
        ambientMusic.src = "opening.mp3";
        ambientMusic.loop = false; // Strictly run exactly once
        ambientMusic.style.display = "none";
        document.body.appendChild(ambientMusic);
    }

    // Read session state to block duplicate audio instances
    const hasAudioPlayed = sessionStorage.getItem("luxuryAmbientFired");

    const playAmbientSoundscape = () => {
        if (!sessionStorage.getItem("luxuryAmbientFired")) {
            ambientMusic.play()
                .then(() => {
                    sessionStorage.setItem("luxuryAmbientFired", "true");
                })
                .catch(err => console.log("Audio waiting for explicit interaction context"));
        }
    };

    // Release background soundtrack immediately on the absolute first user interaction click
    if (!hasAudioPlayed) {
        document.addEventListener("click", playAmbientSoundscape, { once: true });
    }

    // 2. Crisp Camera Shutter Effect Trigger
    const playCameraSnap = () => {
        const shutterAudio = new Audio("velvet-snap.mp3");
        shutterAudio.volume = 0.60;
        shutterAudio.play().catch(() => {});
    };

    // Attach high-precision snappy camera shutter clicks to all site navigation routes
    document.querySelectorAll("nav a, .logo-brand, .header-logo a").forEach(navLink => {
        navLink.addEventListener("click", function (event) {
            if (this.hostname === window.location.hostname) {
                event.preventDefault();
                const routeDestination = this.href;
                
                // Fire instant mechanical sound effect
                playCameraSnap();
                
                // Route transition delay to allow audio clip room to execute cleanly
                setTimeout(() => {
                    window.location.href = routeDestination;
                }, 220);
            }
        });
    });
});
