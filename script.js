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


let currentCalories = 0;
let targetCalories = () => {
    if (localStorage.getItem('targetCalories')) {
        targetCalories = localStorage.getItem('targetCalories');
    }
};
let lastAccessed = null;

const d = new Date();
// const date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
const date = '7-6-2022';


// check if the app has been accessed before

if (localStorage.getItem('lastAccessed')) {
    lastAccessed = localStorage.getItem('lastAccessed');
}

else {
    lastAccessed = date;
    localStorage.setItem('lastAccessed', lastAccessed);
}

// check if there is anything in storage

if (lastAccessed == date) {
    if (localStorage.getItem("currentCalories")) {
        currentCalories = parseFloat(localStorage.getItem("currentCalories"));
    }

    else {
        currentCalories = 0;
    }

    if (localStorage.getItem('targetCalories')) {
        targetCalories = parseFloat(localStorage.getItem('targetCalories'));
    }

    else {
        targetCalories = 0;
    }
}

else {
    currentCalories = 0;
    localStorage.setItem('lastAccessed', date);
    localStorage.setItem('currentCalories', currentCalories);
}

function showMainScreen() {
    dateBox.innerText = date;
    targetCaloriesBox.value = targetCalories;
    header.appendChild(dateBox);
    header.appendChild(targetCaloriesBox);
    messageBox.innerText = '';
    body.appendChild(messageBox);
    counter.value = currentCalories;
    body.appendChild(counter);
    footer.appendChild(addButton);
}

function showAddCaloriesScreen() {
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
    localStorage.setItem('targetCalories', targetCalories);
    targetCaloriesBox.value = targetCalories;
});

// edit functionality

counter.addEventListener('change', () => {
    currentCalories = parseFloat(counter.value);

    if (currentCalories >= 50000) {
        alert('That is a lot of calories!');
    }

    localStorage.setItem("currentCalories", currentCalories);
});

// add functionality

addButton.addEventListener('click', () => {
    clearScreen();
    showAddCaloriesScreen();
});

addCaloriesInput.addEventListener('change', () => {
    currentCalories = currentCalories + parseFloat(addCaloriesInput.value);
    localStorage.setItem("currentCalories", currentCalories);
    counter.value = currentCalories;

    if (currentCalories >= 50000) {
        alert('This has to be unhealthy...');
    }

    clearScreen();
    showMainScreen();
});

// return functionality

backButton.addEventListener('click', () => {
    clearScreen();
    showMainScreen();
});

showMainScreen();

// add progress bar relative to calorie goal
// add hold functionality instead of click on circle?