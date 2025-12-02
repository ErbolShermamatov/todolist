const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input'); 
const taskList = document.getElementById('task-list');
const darkModeBtn = document.getElementById('theme-toggle');

const loadTheme = () => {
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = "☀️";
        darkModeBtn.style.background = '#fff';
    }
}
loadTheme();

const saveData = () => {
    //Мы берем весь HTML, который есть сейчас внутри <ul>, и сохраняем его, как строку
    localStorage.setItem('todoData', taskList.innerHTML);
}

const loadData = () => {
    //Вызываем сохраненную строку
    const savedHtml = localStorage.getItem("todoData");
    //Если там что-то есть - вставляем обратно в <ul>
    if(savedHtml) {
        taskList.innerHTML = savedHtml;
    }
}

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')) {
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
    let inputText = taskInput.value; //сохраняем в переменную inputText, то что ввел пользователь
    if(inputText === '') { //проверяем, если пользователь ввел пустую строку, то мы не добавляем его
        return
    }
    const newLi = document.createElement('li'); //создаем элемент списка
    newLi.classList.add('task'); ////добавили класс
    newLi.textContent = inputText; 
    const deleteButton = document.createElement('button'); //создаем кнопку
    deleteButton.classList.add('delete-btn'); //добавили класс к кнопке
    deleteButton.textContent = 'Удалить';
    newLi.append(deleteButton); //мы помещаем кнопку внутрь li - элемент списка
    taskList.append(newLi); //и помещаем этот li в ul. и получается, что ul будет его родителем
    saveData(); //Вызываем эту функцию, тогда когда список меняется!
    taskInput.value = ''; //очистили поле ввода
}) 

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove()
    }
    else if (event.target.classList.contains('task')){
        event.target.classList.toggle('done')
    }
    saveData(); //Вызываем эту функцию, тогда когда список меняется!
})

//Вызываем loadData() в самом низу файла, чтобы при открытии сайта задачи сразу появились
loadData();