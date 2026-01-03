const jokeText = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");
const jokeSound = document.getElementById("jokeSound");

const jokes = [
  "Why don’t programmers like nature? Because it has too many bugs 😂",
  "Why did the computer go to the doctor? Because it caught a virus 🤒",
  "I told my computer I needed a break… it froze 🧊",
  "Why do JavaScript developers wear glasses? Because they don’t C 😎",
  "Debugging: Being the detective in a crime movie where you are also the criminal 🕵️‍♂️",
  "Why did the developer go broke? Because he used up all his cache 💸",
  "Why was the math book sad? Because it had too many problems 📘",
  "Programmer’s favorite snack? Cookies 🍪",
  "Why did the function return early? It had a date 😄",
  "Coding is 90% fixing bugs you created yesterday 🤯"
];

jokeBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  jokeText.textContent = jokes[randomIndex];

  // 🔊 Play sound
  jokeSound.currentTime = 0;
  jokeSound.play();
});
