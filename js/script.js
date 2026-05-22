document.addEventListener("DOMContentLoaded", function () {
    // 1. Precise Ambient Audio Initialization Engine
    let ambientTrack = document.getElementById("global-studio-audio");

    if (!ambientTrack) {
        ambientTrack = document.createElement("audio");
        ambientTrack.id = "global-studio-audio";
        ambientTrack.src = "opening.mp3";
        ambientTrack.loop = false; // Strictly run track once
        ambientTrack.style.display = "none";
        document.body.appendChild(ambientTrack);
    }

    const sessionAudioTracker = sessionStorage.getItem("luxuryAmbientFired");

    const releaseAmbientSound = () => {
        if (!sessionStorage.getItem("luxuryAmbientFired")) {
            ambientTrack.play()
                .then(() => {
                    sessionStorage.setItem("luxuryAmbientFired", "true");
                })
                .catch(err => console.log("Sound engine active and on standby"));
        }
    };

    // Initialize track precisely upon user's first interactive landing choice click
    if (!sessionAudioTracker) {
        document.addEventListener("click", releaseAmbientSound, { once: true });
    }

    // 2. High-Precision Mechanical Shutter Click Execution
    const triggerMechanicalSnap = () => {
        const shutterAudio = new Audio("velvet-snap.mp3");
        shutterAudio.volume = 0.55;
        shutterAudio.play().catch(() => {});
    };

    // Inject snappy transition camera sound effects across all routing paths
    document.querySelectorAll("nav a, .logo-brand, .header-logo a").forEach(targetLink => {
        targetLink.addEventListener("click", function (event) {
            if (this.hostname === window.location.hostname) {
                event.preventDefault();
                const navigationRoute = this.href;
                
                // Trigger camera snap instantly
                triggerMechanicalSnap();
                
                // Direct route jump seamlessly immediately behind the snap audio audio clearance
                setTimeout(() => {
                    window.location.href = navigationRoute;
                }, 200);
            }
        });
    });
});
