const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");

function addTask() {
    if (input.value.trim() !== "") {
       const task = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        task.appendChild(checkbox);
        task.appendChild(document.createTextNode(input.value.trim()));

        list.appendChild(task);
        checkbox.addEventListener("change", function() {
        task.classList.toggle("completed");
            if (checkbox.checked) {
            list.appendChild(task);
            }
        });
    }

    input.value = "";
}

button.addEventListener("click", addTask);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
