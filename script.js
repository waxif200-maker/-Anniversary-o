// Function to handle audio playback smoothly on mobile browsers
function startAudio() {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");
  
  // Ensure unmuted volume
  music.muted = false;
  music.volume = 1.0;

  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        btn.innerText = "🔊 Playing Our Song";
      })
      .catch(() => {
        // Mobile browser blocked direct autoplay, set up explicit tap listener
        btn.innerText = "🎵 Tap Anywhere for Music";

        const enableAudioOnTouch = () => {
          music.muted = false;
          music.play().then(() => {
            btn.innerText = "🔊 Playing Our Song";
          }).catch((e) => console.log("Playback error:", e));

          // Remove listeners once audio successfully starts
          document.removeEventListener("click", enableAudioOnTouch);
          document.removeEventListener("touchstart", enableAudioOnTouch);
        };

        document.addEventListener("click", enableAudioOnTouch, { once: true });
        document.addEventListener("touchstart", enableAudioOnTouch, { once: true });
      });
  }
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");
  
  if (music.paused) {
    music.muted = false;
    music.play();
    btn.innerText = "🔊 Playing Our Song";
  } else {
    music.pause();
    btn.innerText = "⏸️ Pause Song";
  }
}

// Initialize when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  updateCounter();
  setInterval(updateCounter, 1000);
  startAudio();
});
