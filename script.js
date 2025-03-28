// Wait until the HTML content is fully loaded before running JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Select input field, add button, and task list from the HTML
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load saved tasks from local storage (if any exist)
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Loop through saved tasks and display them on the page
    savedTasks.forEach(task => addTaskToDOM(task));

    // Event listener for adding a task when clicking "Add Task" button
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim(); // Get input value and remove extra spaces

        // If input is empty, do nothing
        if (taskText === "") return;

        // Add the task to the page
        addTaskToDOM(taskText);
        
        // Save the task to local storage
        saveTask(taskText);

        // Clear the input field after adding the task
        taskInput.value = "";
    });

    // Function to add task to the DOM (the page)
    function addTaskToDOM(taskText) {
        const li = document.createElement("li"); // Create a new list item
        li.innerHTML = `${taskText} <button class="delete-btn">X</button>`; // Add text and delete button
        
        taskList.appendChild(li); // Add new task to the list

        // Add event listener to delete button to remove task
        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove(); // Remove from page
            removeTask(taskText); // Remove from local storage
        });
    }

    // Save task to local storage so it stays after refresh
    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get current tasks
        tasks.push(taskText); // Add new task to the list
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save back to local storage
    }

    // Remove task from local storage when deleted
    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get tasks
        tasks = tasks.filter(task => task !== taskText); // Remove the selected task
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated list
    }
});
