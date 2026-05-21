document.addEventListener("DOMContentLoaded", function () {
    // 1. Create a completely invisible background audio element
    let audio = document.getElementById("bg-audio");
    
    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "bg-audio";
        audio.src = "velvet-snap.mp3"; // Smooth background audio track
        audio.loop = true;
        audio.style.display = "none"; // Keeps it 100% invisible
        document.body.appendChild(audio);
    }

    // 2. Track audio timestamps in local memory for continuous playback across pages
    if (localStorage.getItem("audioTime")) {
        audio.currentTime = parseFloat(localStorage.getItem("audioTime"));
    }

    if (localStorage.getItem("audioPlaying") === "true") {
        audio.play().catch(err => console.log("Audio waiting for user click to resume seamlessly."));
    }

    // Save playback position constantly right before switching pages
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("audioTime", audio.currentTime);
        localStorage.setItem("audioPlaying", !audio.paused);
    });

    // 3. Clean, layout-safe interaction trigger
    // Instead of rendering an ugly button, audio activates gracefully when a user clicks anywhere on your luxury experience
    document.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            localStorage.setItem("audioPlaying", "true");
        }
    }, { once: true }); // Triggers only once per page visit so it never interferes with navigation
});
