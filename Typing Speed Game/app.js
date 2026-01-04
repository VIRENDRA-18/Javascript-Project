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
const timeLeftText = document.getElementById("timeLeftText");
const confettiContainer = document.getElementById("confetti-container");

/* SOUNDS */
const keySound = new Audio("./sounds/keyboard-typing-fast-371229.mp3");
const errorSound = new Audio("./sounds/error-126627.mp3");
const successSound = new Audio("./sounds/great-success-384935.mp3");

keySound.volume = 0.3;
errorSound.volume = 0.4;
successSound.volume = 0.5;

document.addEventListener("click", () => {
    keySound.play().catch(() => { });
    keySound.pause();
    keySound.currentTime = 0;
}, { once: true });

/* GAME STATE */
let timer, timeLeft, started = false;
let errors = 0, correctChars = 0;

/* TEXT DATA */
const texts = {
    easy: ["Coding improves logical thinking and problem solving skills.",
        "JavaScript is one of the most popular programming languages.",
        "Daily typing practice helps improve speed and accuracy."],
    medium: [
        "JavaScript helps developers build interactive and dynamic web applications with better user experience.",
        "Regular typing practice improves speed accuracy and confidence while working on real world projects.",
        "Frontend development requires a good understanding of logic design and consistent practice."
    ],
    hard: [
        "Frontend development requires logical thinking consistency and strong problem solving skills to build scalable and user friendly web applications efficiently.",
        "Typing speed and accuracy improve over time with regular practice focus and proper hand positioning during typing sessions."
    ]
};

/* LOAD TEXT */
function loadText() {
    const level = levelEl.value;
    const sentence = texts[level][Math.floor(Math.random() * texts[level].length)];
    textEl.innerHTML = sentence.split("").map(c => `<span>${c}</span>`).join("");
}

/* TIMER */
function startTimer() {
    timeLeft = parseInt(timeEl.value);
    timer = setInterval(() => {
        timeLeft--;
        timeLeftText.textContent = `Time Left: ${timeLeft}s`;
        progressBar.style.width = ((parseInt(timeEl.value) - timeLeft) / parseInt(timeEl.value)) * 100 + "%";
        if (timeLeft <= 0) endGame();
    }, 1000);
}

/* CONFETTI */
function launchConfetti() {
    for (let i = 0; i < 120; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = Math.random() > 0.5 ? "#38bdf8" : "#facc15";
        c.style.animationDuration = Math.random() * 1 + 1.5 + "s";
        confettiContainer.appendChild(c);
        setTimeout(() => c.remove(), 2000);
    }
}

/* INPUT */
input.addEventListener("input", () => {
    if (!started) {
        started = true;
        startTimer();
    }

    const chars = textEl.querySelectorAll("span");
    const typed = input.value.split("");

    errors = 0; correctChars = 0;

    chars.forEach((char, i) => {
        char.classList.remove("correct", "wrong", "active");
        if (typed[i] == null) {
            char.classList.add("active");
        } else if (typed[i] === char.innerText) {
            char.classList.add("correct");
            correctChars++;
        } else {
            char.classList.add("wrong");
            errors++;
        }
    });

    const lastIndex = typed.length - 1;
    if (lastIndex >= 0 && chars[lastIndex]) {
        if (typed[lastIndex] === chars[lastIndex].innerText) {
            keySound.currentTime = 0; keySound.play();
        } else {
            errorSound.currentTime = 0; errorSound.play();
        }
    }

    updateStats();
});

/* STATS */
function updateStats() {
    const total = parseInt(timeEl.value);
    const spent = (total - timeLeft) / 60 || 1 / 60;
    wpmEl.textContent = Math.round((correctChars / 5) / spent);
    cpmEl.textContent = Math.round(correctChars / spent);
    accuracyEl.textContent = Math.max(0, Math.round((correctChars / (correctChars + errors)) * 100)) + "%";
    errorsEl.textContent = errors;
}

/* END GAME */
function endGame() {
    clearInterval(timer);
    input.disabled = true;
    successSound.play();
    resultEl.textContent = "Test Completed 🎉";
    launchConfetti();
}

/* RESTART */
restartBtn.onclick = () => {
    clearInterval(timer);
    input.value = "";
    input.disabled = false;
    started = false;
    errors = 0; correctChars = 0;
    progressBar.style.width = "0%";
    resultEl.textContent = "";
    wpmEl.textContent = 0;
    cpmEl.textContent = 0;
    accuracyEl.textContent = "100%";
    errorsEl.textContent = 0;
    timeLeftText.textContent = `Time Left: ${timeEl.value}s`;
    loadText();
};

loadText();
