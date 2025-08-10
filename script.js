// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Select the "Add Task" button by its ID
  const addButton = document.getElementById('add-task-btn');
  // Select the input field for entering tasks by its ID
  const taskInput = document.getElementById('task-input');
  // Select the unordered list that will display the tasks by its ID
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and display them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again
  }

  // Function to add a new task to the list
  function addTask(taskText, save = true) {
    // If called from button/input, get value from input field
    if (typeof taskText !== 'string') {
      taskText = taskInput.value.trim();
    }

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

    // When the remove button is clicked, remove the task from the list and Local Storage
    removeBtn.onclick = function() {
      taskList.removeChild(li);
      // Remove from Local Storage
      let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks = storedTasks.filter(task => task !== taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    // Append the remove button to the list item
    li.appendChild(removeBtn);
    // Append the list item to the task list
    taskList.appendChild(li);

    // Save to Local Storage if needed
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Clear the input field after adding the task (only if added via input)
    if (save) {
      taskInput.value = '';
    }
  }

  // Add a click event listener to the "Add Task" button
  addButton.addEventListener('click', function() {
    addTask();
  });

  // Add a keypress event listener to the input field to allow adding tasks with Enter key
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from Local Storage when the page loads
  loadTasks();
});