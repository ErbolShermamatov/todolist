const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input'); 
const taskList = document.getElementById('task-list');

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
    deleteButton.classList.add('delete-btn'); //добавили класс
    deleteButton.textContent = 'Удалить';
    newLi.append(deleteButton); //мы помещаем кнопку внутрь li - элемент списка
    taskList.append(newLi); //и помещаем этот li в ul. и получается, что ul будет его родителем
    taskInput.value = ''; //очистили поле ввода
}) 

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove()
    }
    else if (event.target.classList.contains('task')){
        event.target.classList.toggle('done')
    }
})