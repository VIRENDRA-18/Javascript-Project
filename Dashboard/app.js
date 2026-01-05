/* ===== TIME ===== */
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent =
    now.toLocaleDateString() + " | " + now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

/* ===== FOCUS ===== */
const focusDisplay = document.getElementById("focusDisplay");
focusDisplay.textContent = localStorage.getItem("focus") || "";

function saveFocus() {
  const value = document.getElementById("focusInput").value;
  localStorage.setItem("focus", value);
  focusDisplay.textContent = value;
}

/* ===== TASKS ===== */
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
    taskList.appendChild(li);
  });
}

function addTask() {
  const task = document.getElementById("taskInput").value;
  if (!task) return;
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("taskInput").value = "";
  renderTasks();
}
renderTasks();

/* ===== MOOD ===== */
const moodDisplay = document.getElementById("moodDisplay");
moodDisplay.textContent = localStorage.getItem("mood") || "";

function saveMood() {
  const mood = document.getElementById("moodSelect").value;
  localStorage.setItem("mood", mood);
  moodDisplay.textContent = "Current mood: " + mood;
}
