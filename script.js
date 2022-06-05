const header = document.querySelector('.header');
const body = document.querySelector('.body');
const messageBox = document.querySelector('.message-box');
const counter = document.createElement('input');
counter.type = 'number';
counter.inputMode = 'numeric';
counter.id = 'counter';
body.appendChild(counter);
const footer = document.querySelector('.footer');
const buttonAdd = document.querySelector('#button-add');
const buttonBack = document.createElement('div');
buttonBack.classList.add('button');
buttonBack.id = 'button-back';
buttonBack.innerText = 'X';

let currentCalories = 0;
let lastAccessed;

const d = new Date();
const date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;

// check if the app has been accessed before

if (localStorage.getItem('lastAccessed')) {
    lastAccessed = localStorage.getItem('lastAccessed');
}

else {
    lastAccessed = date;
    localStorage.setItem('lastAccessed', lastAccessed);
}

// check if there already is a stored number for current day

if (lastAccessed == date) {
    if (localStorage.getItem("calories")) {
        currentCalories = parseFloat(localStorage.getItem("calories"));
    }

    else {
        currentCalories = 0;
    }
}

else {
    currentCalories = 0;
}

header.innerText = date;
counter.value = currentCalories;

// edit functionality

counter.addEventListener('change', () => {
    currentCalories = parseFloat(counter.value);

    if (currentCalories >= 50000) {
        alert('That is a lot of calories!');
    }

    localStorage.setItem("calories", currentCalories);
});

// add functionality

buttonAdd.addEventListener('click', () => {
    body.removeChild(counter);
    const addCalories = document.createElement('input');
    addCalories.type = 'number';
    addCalories.inputMode = 'numeric';
    addCalories.id = 'addCalories';
    body.appendChild(addCalories);
    messageBox.innerText = 'Calories to add:';
    footer.removeChild(buttonAdd);
    footer.appendChild(buttonBack);
    addCalories.focus();

    addCalories.addEventListener('change', () => {
        currentCalories = currentCalories + parseFloat(addCalories.value);
        body.removeChild(addCalories);
        footer.removeChild(buttonBack);
        footer.appendChild(buttonAdd);
        messageBox.innerText = '';
        counter.value = currentCalories;
        body.appendChild(counter);
        localStorage.setItem("calories", currentCalories);

        if (currentCalories >= 50000) {
            alert('This has to be unhealthy...');
        }
    })
});

// return functionality

buttonBack.addEventListener('click', () => {
    while (body.lastChild) {
        body.removeChild(body.lastChild);
    }
    footer.removeChild(buttonBack);
    body.appendChild(messageBox);
    body.appendChild(counter);
    footer.appendChild(buttonAdd);

    messageBox.innerText = '';
});


// add hold functionality instead of click on circle?