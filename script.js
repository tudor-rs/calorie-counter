const header = document.querySelector('.header');
const body = document.querySelector('.body');
const counter = document.createElement('input');
counter.type = 'number';
counter.inputMode = 'numeric';
counter.id = 'counter';
body.appendChild(counter);
const addBtn = document.querySelector('#add-btn');
const backBtn = document.querySelector('#back-btn');

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

addBtn.addEventListener('click', () => {
    body.removeChild(counter);

    const addCalories = document.createElement('input');
    addCalories.type = 'number';
    addCalories.inputMode = 'numeric';
    addCalories.id = 'addCalories';
    body.appendChild(addCalories);

    addCalories.addEventListener('change', () => {
        currentCalories = currentCalories + parseFloat(addCalories.value);
        body.removeChild(addCalories);
        counter.value = currentCalories;
        body.appendChild(counter);
        localStorage.setItem("calories", currentCalories);

        if (currentCalories >= 50000) {
            alert('This has to be unhealthy...');
        }
    })
});

backBtn.addEventListener('click', () => {
    while (body.lastChild) {
        body.removeChild(body.lastChild);
    }
    body.appendChild(counter);
});