
/* =====================================
   ALONE GUY 🌙
   Website JavaScript
===================================== */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// SMOOTH SCROLL
function reveal(element) {
  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// START BUTTON
const startButton = $("#start");

if (startButton) {
  startButton.addEventListener("click", () => {
    reveal($("#story"));
  });
}

// NEXT BUTTONS
$$(".next").forEach((button) => {
  button.addEventListener("click", () => {
    reveal(document.getElementById(button.dataset.target));
  });
});

// =====================================
// NOTE CARDS / MODAL 🌙
// =====================================

const modal = $("#modal");
const modalText = $("#modalText");
const closeButton = $("#close");

function closeModal() {
  if (modal) {
    modal.classList.remove("open");
    modal.classList.remove("show");
  }
}

if (modal && modalText) {
  $$(".note[data-note]").forEach((card) => {
    card.addEventListener("click", () => {
      modalText.textContent = card.dataset.note;
      modal.classList.remove("show");
      modal.classList.add("open");
    });
  });

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
// A MESSAGE FOR YOU ✨
// =====================================

const revealButton = $("#reveal");

if (revealButton) {
  revealButton.addEventListener("click", () => {
    document.body.classList.add("transitioning");

    setTimeout(() => {
      reveal($("#envelopeSection"));
      document.body.classList.remove("transitioning");
    }, 380);

    let message = $("#specialMessage");

    if (!message) {
      message = document.createElement("div");
      message.id = "specialMessage";

      message.innerHTML = `
        <span style="font-size:26px;">🌙 ✨</span>
        <h3 style="margin:12px 0;">A little reminder for you</h3>
        <p>
          You don't have to have everything figured out.
          Take your time, protect your peace, and keep
          becoming the person you want to be.
        </p>
        <p>
          Even on difficult days, there is still something
          beautiful waiting for you. Never forget that. ♡
        </p>
      `;

      message.style.cssText = `
        margin: 20px 0;
        padding: 24px;
        background: linear-gradient(145deg, #151923, #252b3a);
        color: #e9edf7;
        border: 1px solid #8295b8;
        border-radius: 20px;
        font-size: 16px;
        line-height: 1.9;
        box-shadow: 0 0 25px rgba(155,174,208,0.15);
        animation: messageAppear 0.5s ease;
      `;

      revealButton.insertAdjacentElement("afterend", message);
      revealButton.textContent = "♡ Message opened";
    } else {
      message.remove();
      revealButton.textContent = "A message for you ✦";
    }
  });
}

// =====================================
// ENVELOPE ✉️
// =====================================

let envelopeOpened = false;

function openEnvelope() {
  const currentEnvelope = $("#envelope");

  if (!currentEnvelope || envelopeOpened) return;

  envelopeOpened = true;
  currentEnvelope.classList.add("open");

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
  particle.style.fontSize =
    10 + Math.random() * 14 + "px";

  particle.style.setProperty(
    "--duration",
    6 + Math.random() * 5 + "s"
  );

  particle.style.setProperty(
    "--drift",
    -40 + Math.random() * 80 + "px"
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
// TOAST MESSAGE
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
// INSTAGRAM BUTTON
// =====================================

const talkButton = $("#talk");

if (talkButton) {
  talkButton.addEventListener("click", () => {
    window.open(
      "https://www.instagram.com/brave_thinker_/",
      "_blank",
      "noopener,noreferrer"
    );
  });
}

// =====================================
// STAY A LITTLE LONGER 🎬
// =====================================

const laterButton = $("#later");

if (laterButton) {
  laterButton.addEventListener("click", () => {
    window.location.href = "watch.html";
  });
}

// =====================================
// RESTART BUTTON
// =====================================

const restartButton = $("#restart");

if (restartButton) {
  restartButton.addEventListener("click", () => {
    envelopeOpened = false;

    const currentEnvelope = $("#envelope");
    const hint = $("#tapHint");
    const specialMessage = $("#specialMessage");

    if (currentEnvelope) {
      currentEnvelope.classList.remove("open");
    }

    if (hint) {
      hint.textContent = "tap the envelope ☾";
    }

    if (specialMessage) {
      specialMessage.remove();
    }

    if (revealButton) {
      revealButton.textContent = "A message for you ✦";
    }

    closeModal();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
