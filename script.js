// Step 1 - Access the HTML Elements
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");

// Step 2 - Store Tasks in an array
const tasks = [];

// Step 3 - Respond to Form Submission
form.addEventListener("submit", function (event) {
    // Prevents the browser from automatically reloading the page
    event.preventDefault();

    // Read the values entered by the user[cite: 1]
    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    // Do not create a task if the task name is empty
    if (taskName === "") {
        alert("A Hunter must know their objective! Please enter a mission name.");
        return;
    }

    // Step 4 - Add the Task
    const task = {
        name: taskName,
        priority: taskPriority,
        completed: false
    };

    tasks.push(task); // Add it to our array

    // Clear the input box for the next mission
    taskInput.value = "";

    // Update what is displayed on the page
    displayTasks();
});

// Step 5 - Display Tasks
function displayTasks() {
    // Clear out the current HTML list so we don't duplicate missions
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        // Create the main container for the task[cite: 1]
        const taskElement = document.createElement("div");

        // Apply our base CSS class, and the priority color class
        taskElement.classList.add("mission-scroll", `priority-${task.priority}`);

        // If the task is completed, apply the completed styling
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        // Create text to show the name and priority
        const textSpan = document.createElement("span");
        // Using toUpperCase() so "s-rank" looks nice on the board
        textSpan.textContent = `[${task.priority.toUpperCase()}] ${task.name}`;

        // Container for our buttons
        const buttonDiv = document.createElement("div");

        // Create the Complete Button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.classList.add("action-btn");

        // Step 6 - Complete a Task
        completeBtn.addEventListener("click", function () {
            // Toggle the completion status (true becomes false, false becomes true)
            task.completed = !task.completed;
            displayTasks(); // Re-draw the screen to show the changes
        });

        // Create the Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("action-btn");

        // Step 7 - Delete a Task
        deleteBtn.addEventListener("click", function () {
            // Remove 1 item at this exact index from the array
            tasks.splice(index, 1);
            displayTasks(); // Re-draw the screen to show it is gone
        });

        // Attach the buttons to the button container
        buttonDiv.appendChild(completeBtn);
        buttonDiv.appendChild(deleteBtn);

        // Attach the text and the buttons to the main task element
        taskElement.appendChild(textSpan);
        taskElement.appendChild(buttonDiv);

        // Finally, attach the entire task element to the task list on the page
        taskList.appendChild(taskElement);
    });
}