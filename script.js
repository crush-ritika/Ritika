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
        card.dataset.note || "Some thoughts are better left quiet. 🌙";

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

// Change these names and paths to match your files.
const playlist = [
  {
    name: "Midnight",
    src: "music/song1.mp3"
  },
  {
    name: "Lonely Nights",
    src: "music/song2.mp3"
  },
  {
    name: "Peaceful Mind",
    src: "music/song3.mp3"
  }
];

let currentSong = 0;

function loadSong(index, autoplay = false) {
  if (!music || playlist.length === 0) return;

  currentSong =
    (index + playlist.length) % playlist.length;

  music.src = playlist[currentSong].src;
  music.load();

  if (songSelect) {
    songSelect.value = String(currentSong);
  }

  if (autoplay) {
    music.play()
      .then(() => {
        if (musicBtn) {
          musicBtn.textContent = "⏸️ Pause Music";
        }
      })
      .catch(() => {
        showToast("Tap Play Music to start listening. 🎵");
      });
  }
}

if (music) {
  if (songSelect) {
    songSelect.innerHTML = "";

    playlist.forEach((song, index) => {
      const option = document.createElement("option");

      option.value = String(index);
      option.textContent = song.name;

      songSelect.appendChild(option);
    });

    songSelect.addEventListener("change", () => {
      loadSong(Number(songSelect.value), true);
    });
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", async () => {
      if (music.paused) {
        try {
          await music.play();
        } catch (error) {
          showToast("Check your music file and try again. 🎵");
        }
      } else {
        music.pause();
      }
    });
  }

  if (nextSongBtn) {
    nextSongBtn.addEventListener("click", () => {
      loadSong(currentSong + 1, true);
    });
  }

  if (prevSongBtn) {
    prevSongBtn.addEventListener("click", () => {
      loadSong(currentSong - 1, true);
    });
  }

  music.addEventListener("play", () => {
    if (musicBtn) musicBtn.textContent = "⏸️ Pause Music";
  });

  music.addEventListener("pause", () => {
    if (musicBtn) musicBtn.textContent = "🎵 Play Music";
  });

  music.addEventListener("ended", () => {
    loadSong(currentSong + 1, true);
  });

  loadSong(0);
}
