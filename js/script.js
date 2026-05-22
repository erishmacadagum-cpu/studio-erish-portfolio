// Ensure the audio engine only runs after the page completely loads
window.addEventListener("DOMContentLoaded", function () {
    // 1. Establish the background ambient loop using opening.mp3
    let audio = document.getElementById("luxury-audio-engine");
    
    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "luxury-audio-engine";
        audio.src = "opening.mp3"; // FIXED: Keeps your true beautiful background track looping
        audio.loop = true;
        audio.style.display = "none"; 
        document.body.appendChild(audio);
    }

    // Safely retrieve the exact timestamp from the previous page transition
    const savedTime = localStorage.getItem("luxuryTime");
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Check if music was already playing before the user clicked a new link
    if (localStorage.getItem("luxuryPlaying") === "true") {
        audio.play().catch(() => {
            // Safe fallback if browser blocks cross-page transition audio autoplay
            document.addEventListener("click", function startAudio() {
                audio.play();
                document.removeEventListener("click", startAudio);
            });
        });
    }

    // Save the exact timestamp tracking position ONLY when leaving the page
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("luxuryTime", audio.currentTime);
        localStorage.setItem("luxuryPlaying", !audio.paused);
    });

    // 2. THE CHOSEN VELVET SHUTTER SNAP ENGINE
    const playShutterSnap = () => {
        const shutter = new Audio("velvet-snap.mp3"); // Dedicated snappy click
        shutter.volume = 0.95;
        shutter.play().catch(() => {});
    };

    // 3. GLOBAL LINK NAVIGATION CLICK HANDLER
    // This catches links across all interior pages to play the crisp shutter snap sound
    document.querySelectorAll("nav a, .cta-link-minimal, .logo-brand, .project-card a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const destination = this.href;
                
                playShutterSnap();
                
                // 180ms delay allows the physical shutter click to resonate beautifully before the page slide
                setTimeout(() => {
                    window.location.href = destination;
                }, 180);
            }
        });
    });
});
