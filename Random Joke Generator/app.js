const jokeText = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

const jokes = [
  "Why don’t programmers like nature? Because it has too many bugs 😂",
  "Why did the computer go to the doctor? Because it caught a virus 🤒",
  "I told my computer I needed a break… it froze 🧊",
  "Why do JavaScript developers wear glasses? Because they don’t C 😎",
  "Why was the math book sad? Because it had too many problems 📘",
  "Why did the developer go broke? Because he used up all his cache 💸",
  "Why don’t programmers argue? Because they always find a solution 😄",
  "Debugging: Being the detective in a crime movie where you are also the criminal 🕵️‍♂️",
  "Why did the function return early? It had a date 🥲",
  "Programmer’s diet: bytes and cookies 🍪"
];

jokeBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  jokeText.textContent = jokes[randomIndex];
});
