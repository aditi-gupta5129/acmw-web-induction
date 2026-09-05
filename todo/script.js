const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");

function addTask() {
    if (input.value.trim() !== "") {
        const task = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const taskText = document.createElement("span");
        taskText.textContent = input.value.trim();

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        task.appendChild(checkbox);
        task.appendChild(taskText);
        task.appendChild(editButton);

        checkbox.addEventListener("change", function() {
            task.classList.toggle("completed");

            if (checkbox.checked) {
                list.appendChild(task);
            }
        });

        editButton.addEventListener("click", function() {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText.textContent;

        task.replaceChild(editInput, taskText);

        editButton.textContent = "Save";

        editButton.addEventListener("click", function saveTask() {
            if (editInput.value.trim() !== "") {
                        taskText.textContent = editInput.value.trim();

                        task.replaceChild(taskText, editInput);

                        editButton.textContent = "Edit";
                    }
                }, { once: true });
            });
            list.appendChild(task);
         const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            task.appendChild(deleteButton);

            deleteButton.addEventListener("click", function() {
                task.remove();
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
