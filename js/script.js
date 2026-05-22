document.addEventListener("DOMContentLoaded", function () {
    // 1. One-Time Ambient Soundscape Initialization Tracker
    let studioAmbientTrack = document.getElementById("global-studio-audio");

    if (!studioAmbientTrack) {
        studioAmbientTrack = document.createElement("audio");
        studioAmbientTrack.id = "global-studio-audio";
        studioAmbientTrack.src = "opening.mp3";
        studioAmbientTrack.loop = false; // Must play only once upon click activation
        studioAmbientTrack.style.display = "none";
        document.body.appendChild(studioAmbientTrack);
    }

    // Verify system session state to completely freeze repeat triggers
    const ambientHasFired = sessionStorage.getItem("ambientAudioFired");

    const releaseStudioSoundscape = () => {
        if (!sessionStorage.getItem("ambientAudioFired")) {
            studioAmbientTrack.play()
                .then(() => {
                    sessionStorage.setItem("ambientAudioFired", "true");
                })
                .catch(err => console.log("Sound configuration optimized"));
        }
    };

    // Attach activation trigger to first interactive movement on the luxury framework
    if (!ambientHasFired) {
        document.addEventListener("click", releaseStudioSoundscape, { once: true });
    }

    // 2. High-Fidelity Mechanical Shutter Action Execution
    const fireCameraShutterClick = () => {
        const structuralSnap = new Audio("velvet-snap.mp3");
        structuralSnap.volume = 0.50;
        structuralSnap.play().catch(() => {});
    };

    // Instantly inject shutter precision into all local domain route elements
    document.querySelectorAll("nav a, .logo-brand, .header-logo a").forEach(navigationLink => {
        navigationLink.addEventListener("click", function (event) {
            if (this.hostname === window.location.hostname) {
                event.preventDefault();
                const targetURL = this.href;
                
                // Fire mechanical snap sound instantly
                fireCameraShutterClick();
                
                // Keep transition moving seamlessly behind the audio snap
                setTimeout(() => {
                    window.location.href = targetURL;
                }, 200);
            }
        });
    });
});
