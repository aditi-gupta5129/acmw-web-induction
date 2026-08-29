const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");

function addTask() {
    if (input.value.trim() !== "") {
        const task = document.createElement("li");

        task.textContent = input.value.trim();

        list.appendChild(task);
    }

    input.value = "";
}

button.addEventListener("click", addTask);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});