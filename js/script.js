window.addEventListener("DOMContentLoaded", function () {
    // Look for the dedicated ambient music track
    let audio = document.getElementById("studio-ambient-music");
    
    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "studio-ambient-music";
        audio.src = "opening.mp3"; // Keeps your true musical theme looping on interior pages
        audio.loop = true;
        audio.style.display = "none"; 
        document.body.appendChild(audio);
    }

    const savedTime = localStorage.getItem("luxuryTime");
    if (savedTime) { audio.currentTime = parseFloat(savedTime); }

    if (localStorage.getItem("luxuryPlaying") === "true") {
        audio.play().catch(() => {
            document.addEventListener("click", function startAudio() {
                audio.play();
                document.removeEventListener("click", startAudio);
            });
        });
    }

    window.addEventListener("beforeunload", function () {
        localStorage.setItem("luxuryTime", audio.currentTime);
        localStorage.setItem("luxuryPlaying", !audio.paused);
    });

    // Interaction Trigger
    const playShutterSnap = () => {
        const shutter = new Audio("velvet-snap.mp3");
        shutter.volume = 0.95;
        shutter.play().catch(() => {});
    };

    document.querySelectorAll("nav a, .cta-link-minimal, .logo-brand, .project-card a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const destination = this.href;
                playShutterSnap();
                setTimeout(() => { window.location.href = destination; }, 180);
            }
        });
    });
});
