const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const darkModeBtn = document.getElementById('theme-toggle')

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const loadTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = "☀️";
        darkModeBtn.style.background = '#fff';
    }
}
loadTheme();

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        darkModeBtn.textContent = "☀️";
        darkModeBtn.style.background = '#fff';
    }
    else {
        darkModeBtn.textContent = "🌙";
        darkModeBtn.style.background = '#333';
        localStorage.setItem('theme', 'light');
    }
})

const renderTodos = () => {
    taskList.innerHTML = '';

    todos.forEach((task) => {
        const li = document.createElement('li');
        li.classList.add('task');

        if(task.done) {
            li.classList.add('done');
        }

        li.setAttribute('data-id', task.id);
        li.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Удалить';

        li.append(deleteBtn);
        taskList.append(li);
    })
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(taskInput.value === '') { 
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        done: false
    };

    todos.push(newTask);

    saveToLocalStorage();
    renderTodos();

    taskInput.value = '';
});


taskList.addEventListener('click', (e) => {
    if(!e.target.classList.contains('delete-btn') && !e.target.classList.contains('task')) {
        return;
    }
    const parentLi = e.target.closest('li');
    const id = Number(parentLi.getAttribute('data-id')); 

    if(e.target.classList.contains('delete-btn')) {
        todos = todos.filter(task => task.id !== id);
    }

    else if(e.target.classList.contains('task')) {
        const task = todos.find(t => t.id === id);
        task.done = !task.done;
    }
    saveToLocalStorage();
    renderTodos();
});

const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}
renderTodos();
