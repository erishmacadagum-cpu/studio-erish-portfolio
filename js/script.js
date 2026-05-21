// Ensure the audio engine only runs after the page completely loads
window.addEventListener("load", function () {
    // Check if the audio element already exists to prevent duplicate stacking
    let audio = document.getElementById("bg-audio");
    
    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "bg-audio";
        audio.src = "velvet-snap.mp3"; 
        audio.loop = true;
        audio.style.display = "none"; 
        document.body.appendChild(audio);
    }

    // Safely retrieve the exact timestamp from the previous page
    const savedTime = localStorage.getItem("audioTime");
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Check if it was already playing before the user clicked a new link
    if (localStorage.getItem("audioPlaying") === "true") {
        audio.play().catch(() => {
            // If the browser blocks auto-play, wait for a single safe click anywhere
            document.addEventListener("click", function startAudio() {
                audio.play();
                document.removeEventListener("click", startAudio);
            });
        });
    }

    // CRITICAL: Save the exact timestamp ONLY when the user clicks a link to leave the page
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("audioTime", audio.currentTime);
        localStorage.setItem("audioPlaying", !audio.paused);
    });

    // Fallback click trigger for the very first visit
    document.addEventListener("click", function firstPlay() {
        if (audio.paused) {
            audio.play();
            localStorage.setItem("audioPlaying", "true");
        }
        document.removeEventListener("click", firstPlay);
    }, { once: true });
});
