const header = document.querySelector('.header');
const body = document.querySelector('.body');
const footer = document.querySelector('.footer');

const dateBox = document.createElement('div');
dateBox.classList.add('date-box');

const targetCaloriesBox = document.createElement('input');
targetCaloriesBox.classList.add('target-calories-box');
targetCaloriesBox.type = 'number';
targetCaloriesBox.inputMode = 'numeric';

const messageBox = document.createElement('div');
messageBox.classList.add('message-box');

const counter = document.createElement('input');
counter.classList.add('counter');
counter.type = 'number';
counter.inputMode = 'numeric';

const addButton = document.createElement('div');
addButton.classList.add('button', 'add-button');
addButton.innerText = '+';

const backButton = document.createElement('div');
backButton.classList.add('button', 'back-button');
backButton.innerText = 'X';

const addCaloriesInput = document.createElement('input');
addCaloriesInput.classList.add('add-calories-input');
addCaloriesInput.type = 'number';
addCaloriesInput.inputMode = 'numeric';

let lastAccessed = 0;
let currentCalories = 0;
let targetCalories = 0;

loadData(); // from local storage

const d = new Date();
const date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;

if (lastAccessed != date) {
    currentCalories = 0;
}

function loadData() {
    if (localStorage.getItem('lastAccessed')) {
        lastAccessed = localStorage.getItem('lastAccessed');
    }

    if (localStorage.getItem('targetCalories')) {
        targetCalories = localStorage.getItem('targetCalories');
    }
    
    if (localStorage.getItem('currentCalories')) {
        currentCalories = localStorage.getItem('currentCalories');
    }
}

function saveData() {
    localStorage.setItem('lastAccessed', date);
    localStorage.setItem('targetCalories', targetCalories);
    localStorage.setItem('currentCalories', currentCalories);
}

function showMainScreen() {
    clearScreen();
    dateBox.innerText = date;
    header.appendChild(dateBox);
    targetCaloriesBox.value = targetCalories;
    header.appendChild(targetCaloriesBox);
    messageBox.innerText = '';
    body.appendChild(messageBox);
    counter.value = currentCalories;
    body.appendChild(counter);
    footer.appendChild(addButton);
}

function showAddCaloriesScreen() {
    clearScreen();
    messageBox.innerText = 'Calories to add:';
    body.appendChild(messageBox);
    addCaloriesInput.value = '';
    body.appendChild(addCaloriesInput);
    addCaloriesInput.focus();
    footer.appendChild(backButton);
}

function clearScreen() {
    while (body.lastChild) {
        body.removeChild(body.lastChild);
    }

    while (footer.lastChild) {
        footer.removeChild(footer.lastChild);
    }
}

targetCaloriesBox.addEventListener('change', () => {
    targetCalories = parseFloat(targetCaloriesBox.value);
    saveData();
});

counter.addEventListener('change', () => {
    currentCalories = parseFloat(counter.value);
    saveData();
    if (currentCalories >= 50000) {
        alert('That is a lot of calories!');
    }
});

addButton.addEventListener('click', () => {
    showAddCaloriesScreen();
});

addCaloriesInput.addEventListener('change', () => {
    currentCalories = currentCalories + parseFloat(addCaloriesInput.value);
    saveData();
    showMainScreen();
    if (currentCalories >= 50000) {
        alert('This has to be unhealthy...');
    }
});

backButton.addEventListener('click', () => {
    showMainScreen();
});

showMainScreen();