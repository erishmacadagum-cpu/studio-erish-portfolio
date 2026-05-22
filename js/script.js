document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Precise Live Studio Timeclock Engine
    const launchTimeclock = () => {
        const timeclockContainer = document.getElementById("studio-timeclock");
        if (!timeclockContainer) return;

        setInterval(() => {
            const rawDate = new Date();
            let hours = rawDate.getHours();
            let minutes = rawDate.getMinutes();
            let seconds = rawDate.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            // Format hours to standard 12-hour clock setup
            hours = hours % 12;
            hours = hours ? hours : 12; 
            
            // Padding zeros for clean structure metrics
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            timeclockContainer.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        }, 1000);
    };
    launchTimeclock();

    // 2. Automated Site QR Code Generator
    const generateSiteQR = () => {
        const qrContainer = document.getElementById("site-qr-code");
        if (!qrContainer) return;

        // Automatically captures the exact web address the site is live on
        const activeWebAddress = window.location.href;

        new QRCode(qrContainer, {
            text: activeWebAddress,
            width: 90,
            height: 90,
            colorDark: "#111111",
            colorLight: "#fafafa",
            correctLevel: QRCode.CorrectLevel.H
        });
    };
    generateSiteQR();

    // 3. One-Time Ambient Soundscape Initialization Tracker
    let ambientMusic = document.getElementById("global-studio-audio");

    if (!ambientMusic) {
        ambientMusic = document.createElement("audio");
        ambientMusic.id = "global-studio-audio";
        ambientMusic.src = "opening.mp3";
        ambientMusic.loop = false; // Strictly run exactly once
        ambientMusic.style.display = "none";
        document.body.appendChild(ambientMusic);
    }

    const hasAudioPlayed = sessionStorage.getItem("luxuryAmbientFired");

    const playAmbientSoundscape = () => {
        if (!sessionStorage.getItem("luxuryAmbientFired")) {
            ambientMusic.play()
                .then(() => {
                    sessionStorage.setItem("luxuryAmbientFired", "true");
                })
                .catch(err => console.log("Audio pipeline primed"));
        }
    };

    // Release background soundtrack immediately on the absolute first user interaction click
    if (!hasAudioPlayed) {
        document.addEventListener("click", playAmbientSoundscape, { once: true });
    }

    // 4. Crisp Camera Shutter Effect Trigger
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
                    window.location.href = routeDestinatio
