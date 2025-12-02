const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const darkModeBtn = document.getElementById('theme-toggle');

const loadTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = "☀️";
        darkModeBtn.style.background = '#fff';
    }
}
loadTheme();

const saveData = () => {
    localStorage.setItem('todoData', taskList.innerHTML);
}

const loadData = () => {
    const savedHtml = localStorage.getItem("todoData");
    if (savedHtml) {
        taskList.innerHTML = savedHtml;
    }
}

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
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputText = taskInput.value;
    if (inputText === '') {
        return
    }
    const newLi = document.createElement('li');
    newLi.classList.add('task');
    newLi.textContent = inputText;
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Удалить';
    newLi.append(deleteButton);
    taskList.append(newLi);
    saveData();
    taskInput.value = ''; 
})

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove()
    }
    else if (event.target.classList.contains('task')) {
        event.target.classList.toggle('done')
    }
    saveData();
})

loadData();


