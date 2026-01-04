const textEl = document.getElementById("text");
const input = document.getElementById("input");
const wpmEl = document.getElementById("wpm");
const cpmEl = document.getElementById("cpm");
const accuracyEl = document.getElementById("accuracy");
const errorsEl = document.getElementById("errors");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart");
const progressBar = document.getElementById("progressBar");
const levelEl = document.getElementById("level");
const timeEl = document.getElementById("time");

/* ================= SOUNDS (EXACT FILE PATHS) ================= */
const keySound = new Audio("./sounds/keyboard-typing-fast-371229.mp3");
const errorSound = new Audio("./sounds/error-126627.mp3");
const successSound = new Audio("./sounds/great-success-384935.mp3");

[keySound, errorSound, successSound].forEach(sound => {
  sound.preload = "auto";
});

keySound.volume = 0.3;
errorSound.volume = 0.4;
successSound.volume = 0.5;

/* ================= BROWSER AUTOPLAY FIX ================= */
document.addEventListener("click", () => {
  keySound.play().catch(() => {});
  keySound.pause();
  keySound.currentTime = 0;
}, { once: true });

/* ================= GAME STATE ================= */
let timer;
let timeLeft;
let started = false;
let errors = 0;
let correctChars = 0;

/* ================= TEXT DATA ================= */
const texts = {
  easy: [
    "coding is fun",
    "javascript rocks",
    "practice daily"
  ],
  medium: [
    "JavaScript helps build interactive web applications.",
    "Typing speed improves with regular practice."
  ],
  hard: [
    "Frontend development requires logical thinking, consistency, and strong problem solving skills."
  ]
};

/* ================= LOAD TEXT ================= */
function loadText() {
  const level = levelEl.value;
  const sentence =
    texts[level][Math.floor(Math.random() * texts[level].length)];

  textEl.innerHTML = sentence
    .split("")
    .map(char => `<span>${char}</span>`)
    .join("");
}

/* ================= START TIMER ================= */
function startTimer() {
  timeLeft = parseInt(timeEl.value);

  timer = setInterval(() => {
    timeLeft--;

    const totalTime = parseInt(timeEl.value);
    progressBar.style.width =
      ((totalTime - timeLeft) / totalTime) * 100 + "%";

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

/* ================= INPUT EVENT ================= */
input.addEventListener("input", () => {
  if (!started) {
    started = true;
    startTimer();
  }

  const chars = textEl.querySelectorAll("span");
  const typed = input.value.split("");

  errors = 0;
  correctChars = 0;

  chars.forEach((char, index) => {
    char.classList.remove("correct", "wrong", "active");

    if (typed[index] == null) {
      char.classList.add("active");
    } else if (typed[index] === char.innerText) {
      char.classList.add("correct");
      correctChars++;
    } else {
      char.classList.add("wrong");
      errors++;
    }
  });

  /* ===== SOUND LOGIC (LAST CHARACTER ONLY) ===== */
  const lastIndex = typed.length - 1;
  if (lastIndex >= 0 && chars[lastIndex]) {
    if (typed[lastIndex] === chars[lastIndex].innerText) {
      keySound.currentTime = 0;
      keySound.play();
    } else {
      errorSound.currentTime = 0;
      errorSound.play();
    }
  }

  updateStats();
});

/* ================= UPDATE STATS ================= */
function updateStats() {
  const totalTime = parseInt(timeEl.value);
  const timeSpent = (totalTime - timeLeft) / 60 || 1 / 60;

  const wpm = Math.round((correctChars / 5) / timeSpent);
  const cpm = Math.round(correctChars / timeSpent);
  const accuracy = Math.max(
    0,
    Math.round((correctChars / (correctChars + errors)) * 100)
  );

  wpmEl.textContent = wpm;
  cpmEl.textContent = cpm;
  accuracyEl.textContent = accuracy + "%";
  errorsEl.textContent = errors;
}

/* ================= END GAME ================= */
function endGame() {
  clearInterval(timer);
  input.disabled = true;

  successSound.currentTime = 0;
  successSound.play();

  resultEl.textContent = "Test Completed 🚀";
}

/* ================= RESTART ================= */
restartBtn.addEventListener("click", () => {
  clearInterval(timer);

  input.value = "";
  input.disabled = false;
  started = false;
  errors = 0;
  correctChars = 0;

  progressBar.style.width = "0%";
  resultEl.textContent = "";

  wpmEl.textContent = 0;
  cpmEl.textContent = 0;
  accuracyEl.textContent = "100%";
  errorsEl.textContent = 0;

  loadText();
});

/* ================= INIT ================= */
loadText();
