// fetching all the elements

const form = document.getElementById('form');
const inputEle = document.getElementById('task');
const addBtn = document.getElementById('add');
const list = document.getElementById('list');
const alltaskButton = document.getElementById('allTask');
const completedButton = document.getElementById('completedTask');
const activeButton = document.getElementById('activeTask');
let allTasks = [];
let buttonType = 'all';
// adding event listener to the add button

addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const task = inputEle.value.trim();
    if (task && !allTasks.some(t => t.toLowerCase() === task.toLowerCase())) {
        allTasks.push(task);
        addTask(task);
        inputEle.value = '';
    }
    else {
        alert('Task already exists');
    }
});

// adding task to the list
function addTask(task) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('listDetails');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.addEventListener('click', toggleList);
    const taskName = document.createElement('p');
    taskName.innerText = task;
    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fa-solid', 'fa-trash');
    deleteBtn.addEventListener('click', deleteTask);

    taskItem.appendChild(checkBox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteBtn);
    list.appendChild(taskItem);
    updateFooter();
}

function toggleList(e) {
    const item = e.target.parentElement;
    item.children[1].classList.toggle('completed');
    updateFooter();
    showList(buttonType);
}
function deleteTask(e) {
    const item = e.target.parentElement;
    allTasks = allTasks.filter(t => t.toLowerCase() !== item.children[1].innerText.toLowerCase());
    list.removeChild(item);
    updateFooter();
}
function updateFooter() {
    const count = allTasks.length;
    alltaskButton.innerText = `All-${count}`;
    completedButton.innerText = `Completed-${document.querySelectorAll('.completed').length}`;
    activeButton.innerText = `Active-${count - document.querySelectorAll('.completed').length}`;
}
alltaskButton.addEventListener('click', () => { showList('all') });
completedButton.addEventListener('click', () => { showList('completed') });
activeButton.addEventListener('click', () => { showList('active') });

function showList(taskType) {
    const todos = [...list.children];
    buttonType = taskType;
    todos.forEach(todoItem => {
        const isCompleted = todoItem.children[1].classList.contains('completed');

        if ((taskType === 'all') ||
            (taskType === 'completed' && isCompleted) ||
            (taskType === 'active' && !isCompleted)) {
            todoItem.style.display = 'flex';
        } else {
            todoItem.style.display = 'none';
        }
    });
}
