const API = "http://localhost:3000"; // backend lokalnie

async function loadTasks() {
    const res = await fetch(`${API}/tasks`);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.title} - ${task.dueDate}`;
        list.appendChild(li);
    });
}

document.getElementById("taskForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTask = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        dueDate: document.getElementById("dueDate").value,
    };

    await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
    });

    loadTasks();
});

loadTasks();