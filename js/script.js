document.addEventListener("DOMContentLoaded", function () {
    // 1. Precise Audio Initializer Engine
    let backgroundTrack = document.getElementById("global-studio-audio");

    if (!backgroundTrack) {
        backgroundTrack = document.createElement("audio");
        backgroundTrack.id = "global-studio-audio";
        backgroundTrack.src = "opening.mp3";
        backgroundTrack.loop = false; // Intentionally play once only
        backgroundTrack.style.display = "none";
        document.body.appendChild(backgroundTrack);
    }

    // Lock session tracking to ensure it doesn't loop or start fresh on next pages
    const hasFiredThisSession = sessionStorage.getItem("studioAmbientPlayed");

    const initializeSoundtrack = () => {
        if (!sessionStorage.getItem("studioAmbientPlayed")) {
            backgroundTrack.play()
                .then(() => {
                    sessionStorage.setItem("studioAmbientPlayed", "true");
                })
                .catch(err => console.log("Sound ready for next action initialization"));
        }
    };

    // Listen globally for the initial choice click to unleash the opening sound smoothly
    if (!hasFiredThisSession) {
        document.addEventListener("click", initializeSoundtrack, { once: true });
    }

    // 2. High-Precision Mechanical Shutter Click Execution
    const executeCameraSnap = () => {
        const shutterAudio = new Audio("velvet-snap.mp3");
        shutterAudio.volume = 0.50;
        shutterAudio.play().catch(() => {});
    };

    // Attach instant structural transition snap tracking across link arrays
    document.querySelectorAll("nav a, .logo-brand, .header-logo a").forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.hostname === window.location.hostname) {
                event.preventDefault();
                const routeDestination = this.href;
                
                // Fire instant sharp mechanical snap click
                executeCameraSnap();
                
                // Allow sound execution window clearance before pushing target location
                setTimeout(() => {
                    window.location.href = routeDestination;
                }, 220);
            }
        });
    });
});
