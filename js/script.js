document.addEventListener("DOMContentLoaded", function () {
    // 1. One-Time Global Background Audio Initializer
    let backgroundTrack = document.getElementById("global-studio-audio");

    if (!backgroundTrack) {
        backgroundTrack = document.createElement("audio");
        backgroundTrack.id = "global-studio-audio";
        backgroundTrack.src = "opening.mp3";
        backgroundTrack.loop = false; // Setting explicitly to play only once
        backgroundTrack.style.display = "none";
        document.body.appendChild(backgroundTrack);
    }

    // Check if the track was already launched during this web session
    const hasPlayedThisSession = sessionStorage.getItem("studioAmbientPlayed");

    if (!hasPlayedThisSession) {
        const executeAudioPlay = () => {
            backgroundTrack.play()
                .then(() => {
                    sessionStorage.setItem("studioAmbientPlayed", "true");
                })
                .catch(err => console.log("Interaction required to unmute luxury soundscape"));
        };

        // Try playing automatically, fall back to initial user interaction click if restricted
        backgroundTrack.play()
            .then(() => {
                sessionStorage.setItem("studioAmbientPlayed", "true");
            })
            .catch(() => {
                document.addEventListener("click", executeAudioPlay, { once: true });
            });
    }

    // 2. Snappy Mechanical Camera Shutter Click Effect
    const executeCameraSnap = () => {
        const shutterAudio = new Audio("velvet-snap.mp3");
        shutterAudio.volume = 0.45;
        shutterAudio.play().catch(() => {});
    };

    // Attach instant snap effect seamlessly to luxury transitions
    document.querySelectorAll("nav a, .logo-brand, .header-logo a").forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.hostname === window.location.hostname) {
                event.preventDefault();
                const routeDestination = this.href;
                executeCameraSnap();
                setTimeout(() => {
                    window.location.href = routeDestination;
                }, 200);
            }
        });
    });
});
