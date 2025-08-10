// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Select the "Add Task" button by its ID
  const addButton = document.getElementById('add-task');
  // Select the input field for entering tasks by its ID
  const taskInput = document.getElementById('task-input');
  // Select the unordered list that will display the tasks by its ID
  const taskList = document.getElementById('task-list');

  // Function to add a new task to the list
  function addTask() {
    // Get and trim the value from the task input field
    const taskText = taskInput.value.trim();

    // If the input is empty, alert the user and exit the function
    if (taskText === "") {
      alert('Please enter a task.');
      return;
    }

    // Create a new list item (li) element
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button for the task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When the remove button is clicked, remove the task from the list
    removeBtn.onclick = function() {
      taskList.removeChild(li);
    };

    // Append the remove button to the list item
    li.appendChild(removeBtn);
    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = '';
  }

  // Add a click event listener to the "Add Task" button
  addButton.addEventListener('click', addTask);

  // Add a keypress event listener to the input field to allow adding tasks with Enter key
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});