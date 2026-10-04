// Set Anniversary Date: April 23, 2026 (Month is 0-indexed, so 3 = April)
const START_DATE = new Date(2026, 3, 23, 0, 0, 0); 
const PARTNER_NAME = "My Lovely Psycho";

const MEMORIES = [
  "That late-night conversation where we lost track of time.",
  "Our very first chat and how nervous we both were.",
  "your Every Message that made my boring day special.",
  "All the laughter, inside jokes, dirty jokes and shared moments in between."
];

const REASONS_TO_LOVE = [
  "Your smile makes even the most stressful days instantly better.",
  "You always know how to bring out the absolute best in me.",
  "Talking with you always cheers me up, you are my one and only comfort zone.",
  "You are my favorite person to share every small things with."
];

function updateCounter() {
  const now = new Date();
  const timerElem = document.getElementById("timer");

  if (now >= START_DATE) {
    const diffMs = now - START_DATE;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    const pad = (n) => String(n).padStart(2, "0");
    timerElem.innerText = `${days.toLocaleString()} Days | ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
  } else {
    const diffMs = START_DATE - now;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    const pad = (n) => String(n).padStart(2, "0");
    timerElem.innerText = `Countdown: ${days} Days, ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }
}

function updateNoteWithAnimation(htmlContent, textColor) {
  const noteElem = document.getElementById("note-text");
  noteElem.style.opacity = "0";
  
  setTimeout(() => {
    noteElem.style.color = textColor;
    noteElem.innerHTML = htmlContent;
    noteElem.style.opacity = "1";
  }, 200);
}

function showMemory() {
  const memory = MEMORIES[Math.floor(Math.random() * MEMORIES.length)];
  updateNoteWithAnimation(`✨ <strong>A Favorite Memory</strong> ✨<br><br>"${memory}"`, "#89b4fa");
}

function showReason() {
  const reason = REASONS_TO_LOVE[Math.floor(Math.random() * REASONS_TO_LOVE.length)];
  updateNoteWithAnimation(`💖 <strong>Why You're Special</strong> 💖<br><br>"${reason}"`, "#f5c2e7");
}

function showSurprise() {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  
  const rhyme = `You call yourself normal, but you're my psycho, true,\n` +
                `And nobody loves you the way that I do.\n` +
                `You say you're not talented, but babe, that's a lie,\n` +
                `You shine like a star in my entire sky!\n\n` +
                `I'm your number 1 fan through the dark and the light,\n` +
                `So keep up that smile that makes my world bright.\n` +
                `Just stay right beside me, don't ever walk away,\n` +
                `And love me forever, day after day. ❤️`;

  modalText.innerText = rhyme + `\n\nHope to make more memories together!`;
  modal.style.display = "flex";
}

function closeSurprise() {
  document.getElementById("modal").style.display = "none";
}

// Automatic Play Logic
function startAudio() {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");
  
  music.play().then(() => {
    btn.innerText = "🔊 Playing Our Song";
  }).catch(() => {
    // If browser blocks unmuted autoplay, play on first user touch/click
    btn.innerText = "🎵 Tap to Play Music";
    const enableAudio = () => {
      music.play();
      btn.innerText = "🔊 Playing Our Song";
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };
    document.addEventListener("click", enableAudio);
    document.addEventListener("touchstart", enableAudio);
  });
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");
  if (music.paused) {
    music.play();
    btn.innerText = "🔊 Playing Our Song";
  } else {
    music.pause();
    btn.innerText = "⏸️ Pause Song";
  }
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  updateCounter();
  setInterval(updateCounter, 1000);
  startAudio();
});