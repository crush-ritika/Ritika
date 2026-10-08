const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


// ===============================
// SMOOTH SCROLL / REVEAL
// ===============================

function reveal(element) {
  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// Start button
$("#start").onclick = () => {
  reveal($("#story"));
};


// Next buttons
$$(".next").forEach((button) => {
  button.onclick = () => {
    const target = document.getElementById(button.dataset.target);

    if (target) {
      reveal(target);
    }
  };
});


// ===============================
// TAP CARDS / MODAL
// ===============================

const modal = $("#modal");
const modalText = $("#modalText");

$$(".note").forEach((card) => {
  card.onclick = () => {
    const message = card.dataset.note || "";

    modalText.textContent = message;
    modal.classList.add("open");
  };
});


function closeModal() {
  modal.classList.remove("open");
}


$("#close").onclick = closeModal;


// Close modal by tapping outside
modal.onclick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};


// Close modal with Escape
document.onkeydown = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};


// ===============================
// CUTE TRANSITION
// ===============================

$("#reveal").onclick = () => {

  document.body.classList.add("transitioning");

  setTimeout(() => {

    reveal($("#envelopeSection"));

    document.body.classList.remove("transitioning");

  }, 380);

};


// ===============================
// ANIMATED ENVELOPE
// ===============================

let envelopeOpened = false;


function openEnvelope() {

  if (envelopeOpened) return;

  envelopeOpened = true;

  const envelope = $("#envelope");
  const hint = $("#tapHint");

  envelope.classList.add("open");

  if (hint) {
    hint.textContent = "the secret is opening... ♡";
  }


  // Reveal confession after envelope animation
  setTimeout(() => {

    reveal($("#confession"));

  }, 1500);

}


// Tap envelope
$("#envelope").onclick = openEnvelope;


// Keyboard accessibility
$("#envelope").onkeydown = (event) => {

  if (event.key === "Enter" || event.key === " ") {

    event.preventDefault();

    openEnvelope();

  }

};


// ===============================
// FLOATING HEARTS
// ===============================

const heartLayer = $("#floatingHearts");


function spawnHeart() {

  if (document.hidden || !heartLayer) return;


  const heart = document.createElement("span");

  heart.className = "floating-heart";


  // Mostly outline hearts, sometimes filled
  heart.textContent =
    Math.random() > 0.2 ? "♡" : "♥";


  // Random horizontal position
  heart.style.left =
    Math.random() * 100 + "%";


  // Random size
  heart.style.fontSize =
    10 + Math.random() * 16 + "px";


  // Random animation duration
  heart.style.setProperty(
    "--duration",
    6 + Math.random() * 5 + "s"
  );


  // Random sideways movement
  heart.style.setProperty(
    "--drift",
    -60 + Math.random() * 120 + "px"
  );


  heartLayer.appendChild(heart);


  // Remove after animation
  setTimeout(() => {

    heart.remove();

  }, 12000);

}


// Create hearts continuously
setInterval(spawnHeart, 700);


// Initial hearts
for (let i = 0; i < 8; i++) {

  setTimeout(
    spawnHeart,
    i * 240
  );

}


// ===============================
// FINAL BUTTONS
// ===============================

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


// "I'd like to talk"
$("#talk").onclick = () => {

  showToast(
    "No pressure at all — if you want to talk, I'm here. 😊"
  );

};


// "Maybe another time"
$("#later").onclick = () => {

  showToast(
    "Take your time. Whatever you feel is okay. 🌙"
  );

};


// ===============================
// RESTART
// ===============================

$("#restart").onclick = () => {

  envelopeOpened = false;


  const envelope = $("#envelope");
  const hint = $("#tapHint");


  envelope.classList.remove("open");


  if (hint) {
    hint.textContent = "tap the envelope ♡";
  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};


// ===============================
// MUSIC PLAYER 🎵
// ===============================

const music = $("#bgMusic");
const musicBtn = $("#musicBtn");

if (music && musicBtn) {

  musicBtn.onclick = () => {

    if (music.paused) {

      music.play()
        .then(() => {

          musicBtn.textContent = "⏸️ Pause Music";

        })
        .catch(() => {

          musicBtn.textContent = "🎵 Tap to Play";

        });

    } else {

      music.pause();

      musicBtn.textContent = "🎵 Play Music";

    }

  };

}
