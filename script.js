document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById('task-form');
    const taskDescription = document.getElementById('task-description');
    const taskDeadline = document.getElementById('task-deadline');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach(task => {
            addTaskToList(task);
        });
    }

    function addTaskToList(task) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `${task.description} - ${task.deadline} 
            <button class="btn btn-danger btn-sm delete-btn">מחק</button>`;
        
        const deleteButton = li.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            deleteTask(task);
        });

        taskList.appendChild(li);
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.description !== task.description || t.deadline !== task.deadline);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newTask = {
            description: taskDescription.value,
            deadline: taskDeadline.value
        };

        addTaskToList(newTask);
        saveTask(newTask);

        taskDescription.value = '';
        taskDeadline.value = '';
    });

    loadTasks();
});
