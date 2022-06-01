const header = document.querySelector('.header');
const body = document.querySelector('.body');
const counter = document.createElement('input');
counter.type = 'text';
counter.id = 'counter';
body.appendChild(counter);
const addBtn = document.querySelector('#add-btn');
const backBtn = document.querySelector('#back-btn');

let currentCalories = 0;
let lastAccessed;

const d = new Date();
const date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;

if (localStorage.getItem('lastAccessed')) {
    lastAccessed = localStorage.getItem('lastAccessed');
}

else {
    lastAccessed = date;
    localStorage.setItem('lastAccessed', lastAccessed);
}

if (lastAccessed == date) {
    if (localStorage.getItem("calories")) {
        let cal = parseFloat(localStorage.getItem("calories"));

        if (Number.isNaN(cal)) {
            currentCalories = 0;
        }

        else {
            currentCalories = parseFloat(localStorage.getItem("calories"));
        }
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

counter.addEventListener ('change', () => {

    let cal = parseFloat(counter.value);

    if (Number.isNaN(cal)) {
        counter.value = parseFloat(currentCalories);
    }

    else {
        currentCalories = counter.value;
        localStorage.setItem("calories", parseFloat(currentCalories));
    }
});

// add functionality

addBtn.addEventListener ('click', () => {
    body.removeChild(counter);
    const addCalories = document.createElement('input');
    addCalories.type = 'text';
    addCalories.id = 'addCalories';
    body.appendChild(addCalories);

    addCalories.addEventListener ('change', () => {
        let cal = parseFloat(addCalories.value);

        if (Number.isNaN(cal)) {
            body.removeChild(addCalories);
            counter.value = currentCalories;
            body.appendChild(counter);
            localStorage.setItem("calories", parseFloat(currentCalories));
        }

        else {
            currentCalories = parseFloat(currentCalories) + 
            parseFloat(addCalories.value);
            body.removeChild(addCalories);
            counter.value = currentCalories;
            body.appendChild(counter);
            localStorage.setItem("calories", parseFloat(currentCalories));
        }
    })
});

backBtn.addEventListener('click', () => {
    while (body.lastChild) {
        body.removeChild(body.lastChild);
    }

    body.appendChild(counter);
});