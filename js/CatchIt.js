import { loadFromLocalStorage } from "./data/helper-functions.js";

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener("DOMContentLoaded", () => {
    const allPlayerData = loadFromLocalStorage("allPlayerData");
    const canvas = document.getElementById("jungleCanvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to match window and update on resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let backgroundVideo = document.getElementById("backgroundVideo");
    backgroundVideo.load();

    // Set default track to "Mystical 1" only if musicTracks exists
    if (window.musicTracks && window.musicTracks.length > 0) {
        const defaultTrack = window.musicTracks[allPlayerData.generalStats.indexes.currentTrackIndex];
        document.getElementById("bgMusicButton").textContent = defaultTrack.name;
        const audioElement = document.getElementById("backgroundAudio");

        if (audioElement) {
            audioElement.src = defaultTrack.file;  // Set default track
            audioElement.load();  // Load the track
            console.log(`✅ Default track set: ${defaultTrack.name}, file: ${defaultTrack.file}`);
        } else {
            console.error("❌ audioElement not found!");
        }
    } else {
        console.error("❌ musicTracks is not defined or empty!");
    }

    // Firefly particles
    const fireflies = [];
    const maxFireflies = 100;

    // Falling leaves
    const leafImg = new Image();
    leafImg.src = "Media/Background/leaf.png";
    const leaves = [];

    // Audio elements and states
    const audioElement = document.getElementById("backgroundAudio");
    let musicPlaying = false;
    let audioStarted = false;

    // Firefly class
    class Firefly {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.speedY = (Math.random() - 0.5) * 1.5;
            this.alpha = Math.random();
            this.alphaChange = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            this.alpha += this.alphaChange;
            if (this.alpha <= 0 || this.alpha >= 1) this.alphaChange *= -1;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 153, 1)"; // Soft yellow light
            ctx.fill();
        }
    }

    function initFireflies() {
        for (let i = 0; i < maxFireflies; i++) {
            fireflies.push(new Firefly());
        }
    }

    function spawnLeaves() {
        if (!document.hidden) {
            leaves.push({
                x: Math.random() * canvas.width,
                y: 0,
                width: canvas.width * 0.04,
                height: canvas.height * 0.06,
                speed: Math.random() * 1 + 0.2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.05,
                img: leafImg
            });
        }
    }

    function moveLeaves() {
        leaves.forEach((leaf, leafIndex) => {
            leaf.y += leaf.speed;
            leaf.rotation += leaf.rotationSpeed;

            if (leaf.y > canvas.height) leaves.splice(leafIndex, 1);
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireflies.forEach((firefly) => {
            firefly.update();
            firefly.draw();
        });

        ctx.globalAlpha = 1;

        moveLeaves();
        leaves.forEach((leaf) => {
            ctx.save();
            ctx.translate(leaf.x + leaf.width / 2, leaf.y + leaf.height / 2);
            ctx.rotate(leaf.rotation);
            ctx.drawImage(
                leaf.img,
                -leaf.width / 2,
                -leaf.height / 2,
                leaf.width,
                leaf.height
            );
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    // Toggle music
    const musicButton = document.getElementById("musicButton");
    let isAudioPlaying = false;  // Track if audio is playing

    // Ensure the audio is ready to play
    audioElement.addEventListener('canplaythrough', () => {
        console.log('Audio is ready to play!');
    });

    musicButton.addEventListener("click", () => {
        console.log('Music button clicked! Current text content:', musicButton.textContent);

        if (musicButton.textContent === "Pause Music") {
            console.log('Pausing audio...');
            audioElement.pause();
            musicButton.textContent = "Start Music";
        } else {
            console.log('Attempting to play audio...');

            const playPromise = audioElement.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio is now playing!');
                }).catch((error) => {
                    console.error('Audio playback failed:', error);
                });
            }

            musicButton.textContent = "Pause Music";
        }
    });

    // Handle track selection (without autoplay)
    document.addEventListener("trackSelected", (event) => {
        const { selectedTrack } = event.detail;
        console.log("Track selected:", selectedTrack.name);

        // Update audio source
        audioElement.src = selectedTrack.file;
        audioElement.volume = allPlayerData.generalStats.musicVolume;
        audioElement.load();
        console.log("Audio source updated:", selectedTrack.file);

        // If music was not playing, start playing and update button text
        if (musicButton.textContent === "Start Music") {
            audioElement.play().then(() => {
                console.log(`🎵 Now playing: ${selectedTrack.name}`);
                musicButton.textContent = "Pause Music";  // ✅ Automatically update button
            }).catch((error) => {
                console.error("❌ Audio playback failed:", error);
            });
        }
    });

    // Play audio once on canvas click
    canvas.addEventListener("click", () => {
        console.log('Canvas clicked, attempting to play audio...');

        // Make sure audio is paused, and allow play only after user interaction
        if (!audioStarted) {
            audioElement.play()
                .then(() => {
                    console.log("Audio is playing!");
                    audioStarted = true;
                    isAudioPlaying = true;  // Set audio playing flag to true
                })
                .catch((error) => {
                    console.error("Audio playback failed:", error);
                });
        }
    });

    // Handle background video
    window.addEventListener("load", function () {
        backgroundVideo.play().catch(error => console.log("Autoplay blocked:", error));
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Initialize
    initFireflies();
    animate();
    setInterval(spawnLeaves, 3000);
});
