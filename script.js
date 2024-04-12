const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load tasks from localStorage
tasks.forEach(task => {
    addTaskToList(task);
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        showAlert('Please enter a task!');
        return;
    }

    // Add task to array
    tasks.push(taskText);

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Add task to the list
    addTaskToList(taskText);

    // Clear input field
    taskInput.value = '';
}

function addTaskToList(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span class="edit" onclick="editTask('${taskText}')"><i class="fas fa-edit"></i></span>
        <span class="delete" onclick="deleteTask('${taskText}')"><i class="fas fa-trash-alt"></i></span>
    `;
    taskList.appendChild(li);
}

function editTask(taskText) {
    const editTaskModal = document.getElementById('editTaskModal');
    const editTaskInput = document.getElementById('editTaskInput');
    const confirmEditBtn = document.getElementById('confirmEditBtn');

    // Set the initial value of the input field
    editTaskInput.value = taskText;

    // Display the edit task modal
    editTaskModal.style.display = 'block';

    // Close the modal when clicking on the close button
    const closeBtn = document.querySelector('#editTaskModal .close');
    closeBtn.onclick = function() {
        editTaskModal.style.display = 'none';
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == editTaskModal) {
            editTaskModal.style.display = 'none';
        }
    }

    // Update the task text when confirming the edit
    confirmEditBtn.onclick = function() {
        const newTaskText = editTaskInput.value.trim();
        if (newTaskText !== '') {
            const index = tasks.indexOf(taskText);
            if (index !== -1) {
                tasks[index] = newTaskText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                updateTaskInUI(taskText, newTaskText);
            }
            editTaskModal.style.display = 'none';
        } else {
            // Show alert if the input field is empty
            showAlert('Please enter a task!');
        }
    }
}

function updateTaskInUI(oldTaskText, newTaskText) {
    const taskElements = document.querySelectorAll('.task-text');
    taskElements.forEach(element => {
        if (element.textContent === oldTaskText) {
            element.textContent = newTaskText;
        }
    });
}


function deleteTask(taskText) {
    // Remove task from array
    tasks = tasks.filter(task => task !== taskText);

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Remove task from the list
    const taskElement = event.target.closest('li');
    taskElement.remove();
}

// Custom alert function
function showAlert(message) {
    const customAlertModal = document.getElementById('customAlertModal');
    const alertMessage = document.getElementById('alertMessage');
    const closeAlertBtn = document.getElementById('closeAlertBtn');

    // Set alert message
    alertMessage.textContent = message;

    // Display the custom alert modal
    customAlertModal.style.display = 'block';

    // Close the modal when clicking on the close button
    closeAlertBtn.onclick = function() {
        customAlertModal.style.display = 'none';
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == customAlertModal) {
            customAlertModal.style.display = 'none';
        }
    }
}
const taskInput = document.getElementById('taskInput');

// Add event listener for the Enter key press
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});