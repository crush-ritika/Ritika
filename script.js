
// =====================================
// ALONE GUY 🌙
// Complete Website JavaScript
// =====================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// =====================================
// SMOOTH SCROLL
// =====================================

function reveal(element) {
  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

const startButton = $("#start");

if (startButton) {
  startButton.addEventListener("click", () => {
    reveal($("#story"));
  });
}

$$(".next").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(
      button.dataset.target
    );

    reveal(target);
  });
});

// =====================================
// NOTE CARDS / MODAL
// =====================================

const modal = $("#modal");
const modalText = $("#modalText");
const closeButton = $("#close");

if (modal && modalText) {
  $$(".note").forEach((card) => {
    card.addEventListener("click", () => {
      modalText.textContent =
        card.dataset.note ||
        "Some thoughts are better left quiet. 🌙";

      modal.classList.add("open");
    });
  });

  function closeModal() {
    modal.classList.remove("open");
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

// =====================================
// REVEAL BUTTON
// =====================================

const revealButton = $("#reveal");

if (revealButton) {
  revealButton.addEventListener("click", () => {
    document.body.classList.add("transitioning");

    setTimeout(() => {
      reveal($("#envelopeSection"));
      document.body.classList.remove("transitioning");
    }, 380);
  });
}

// =====================================
// OPTIONAL ENVELOPE
// =====================================

let envelopeOpened = false;

function openEnvelope() {
  const envelope = $("#envelope");

  if (!envelope || envelopeOpened) return;

  envelopeOpened = true;
  envelope.classList.add("open");

  const hint = $("#tapHint");

  if (hint) {
    hint.textContent = "A quiet thought, just for you. 🌙";
  }

  setTimeout(() => {
    reveal($("#confession"));
  }, 1500);
}

const envelope = $("#envelope");

if (envelope) {
  envelope.addEventListener("click", openEnvelope);

  envelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openEnvelope();
    }
  });
}

// =====================================
// FLOATING STARS ✨
// =====================================

const particleLayer =
  $("#floatingParticles") || $("#floatingHearts");

function spawnParticle() {
  if (document.hidden || !particleLayer) return;

  const particle = document.createElement("span");

  particle.className = "floating-heart";
  particle.textContent =
    Math.random() > 0.3 ? "✦" : "·";

  particle.style.left = Math.random() * 100 + "%";
  particle.style.fontSize =
    10 + Math.random() * 14 + "px";

  particle.style.setProperty(
    "--duration",
    6 + Math.random() * 5 + "s"
  );

  particle.style.setProperty(
    "--drift",
    (-40 + Math.random() * 80) + "px"
  );

  particleLayer.appendChild(particle);

  setTimeout(() => particle.remove(), 12000);
}

if (particleLayer) {
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnParticle, i * 300);
  }

  setInterval(spawnParticle, 1000);
}

// =====================================
// TOAST MESSAGES
// =====================================

let toastTimer;

function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// =====================================
// INSTAGRAM BUTTON 📸
// =====================================

const talkButton = $("#talk");

if (talkButton) {
  talkButton.addEventListener("click", () => {
    window.open(
      "https://www.instagram.com/Sushant.x.822/",
      "_blank",
      "noopener,noreferrer"
    );
  });
}

// =====================================
// LATER BUTTON 🌙
// =====================================

const laterButton = $("#later");

if (laterButton) {
  laterButton.addEventListener("click", () => {
    showToast("No rush. Take life at your own pace. 🌙");
  });
}

// =====================================
// RESTART BUTTON 🔄
// =====================================

const restartButton = $("#restart");

if (restartButton) {
  restartButton.addEventListener("click", () => {
    envelopeOpened = false;

    const currentEnvelope = $("#envelope");
    const hint = $("#tapHint");

    if (currentEnvelope) {
      currentEnvelope.classList.remove("open");
    }

    if (hint) {
      hint.textContent = "tap the envelope";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// =====================================
// MUSIC PLAYER 🎵
// =====================================

const music = $("#bgMusic");
const musicBtn = $("#musicBtn");
const songSelect = $("#songSelect");
const nextSongBtn = $("#nextSong");
const prevSongBtn = $("#prevSong");
const musicStatus = $("#musicStatus");

// MP3 files are assumed to be in the repository root.
const playlist = [
  { name: "Midnight", src: "song.mp3" },
  { name: "Lonely Nights", src: "song1.mp3" },
  { name: "Peaceful Mind", src: "song2.mp3" },
  { name: "Dreamy Nights", src: "song3.mp3" }
];

let currentSong = 0;

function loadSong(index, autoplay = false) {
  if (!music || playlist.length === 0) return;

  currentSong =
    (index + playlist.length) % playlist.length;

  music.pause();
  music.src = playlist[currentSong].src;
  music.load();

  if (songSelect) {
    songSelect.selectedIndex = currentSong;
  }

  if (musicBtn) {
    musicBtn.textContent = "🎵 Play Music";
  }

  if (musicStatus) {
    musicStatus.textContent =
      playlist[currentSong].name + " selected";
  }

  if (autoplay) {
    playSong();
  }
}

async function playSong() {
  if (!music) return;

  try {
    await music.play();
  } catch (error) {
    if (musicStatus) {
      musicStatus.textContent =
        "Couldn't play the song. Check the MP3 filename.";
    }

    showToast("Check your music file and try again. 🎵");
  }
}

if (music) {
  // Populate the song dropdown.
  if (songSelect) {
    songSelect.innerHTML = "";

    playlist.forEach((song) => {
      const option = document.createElement("option");

      option.value = song.src;
      option.textContent = song.name;

      songSelect.appendChild(option);
    });

    songSelect.addEventListener("change", () => {
      loadSong(songSelect.selectedIndex, true);
    });
  }

  // Play / Pause.
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (music.paused) {
        playSong();
      } else {
        music.pause();
      }
    });
  }

  // Next song.
  if (nextSongBtn) {
    nextSongBtn.addEventListener("click", () => {
      loadSong(currentSong + 1, true);
    });
  }

  // Previous song.
  if (prevSongBtn) {
    prevSongBtn.addEventListener("click", () => {
      loadSong(currentSong - 1, true);
    });
  }

  // Update the player when playback starts.
  music.addEventListener("play", () => {
    if (musicBtn) {
      musicBtn.textContent = "⏸️ Pause Music";
    }

    if (musicStatus) {
      musicStatus.textContent =
        "Playing " + playlist[currentSong].name;
    }
  });

  // Update the button when paused.
  music.addEventListener("pause", () => {
    if (musicBtn) {
      musicBtn.textContent = "🎵 Play Music";
    }
  });

  // Automatically play the next song.
  music.addEventListener("ended", () => {
    loadSong(currentSong + 1, true);
  });

  // Show an error if an MP3 cannot be loaded.
  music.addEventListener("error", () => {
    if (musicStatus) {
      musicStatus.textContent =
        "Song not found. Check the MP3 filename on GitHub.";
    }
  });

  // Load the first song without autoplay.
  loadSong(0);
}
