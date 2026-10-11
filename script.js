
 // =====================================
 // ALONE GUY 🌙
 // Complete Website JavaScript
 // Music player is handled by index.html
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
    const target = document.getElementById(button.dataset.target);
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
// ENVELOPE ✉️
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
  particle.textContent = Math.random() > 0.3 ? "✦" : "·";

  particle.style.left = Math.random() * 100 + "%";
  particle.style.fontSize = 10 + Math.random() * 14 + "px";

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
      hint.textContent = "tap the envelope ☾";
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
// IMPORTANT:
// The 29-song playlist and all music controls
// are managed by the music script in index.html.
// Do not add another music handler here.
// =====================================
