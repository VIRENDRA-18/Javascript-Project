const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please add a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <div class="task">
            <input type="checkbox" onchange="toggleTask(this)">
            <span>${taskText}</span>
        </div>
        <span class="delete" onclick="deleteTask(this)">✕</span>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
}

function deleteTask(el) {
    el.parentElement.remove();
}

function toggleTask(el) {
    el.parentElement.parentElement.classList.toggle("completed");
}
