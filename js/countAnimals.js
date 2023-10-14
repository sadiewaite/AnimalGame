const ANIMAL_ICONS = [
    "fa-hippo",
    "fa-otter",
    "fa-paw",
    "fa-dog",
    "fa-cow",
    "fa-fish",
    "fa-dragon",
    "fa-kiwi-bird",
    "fa-worm",
    "fa-spider",
    "fa-shrimp",
    "fa-mosquito",
    "fa-locust",
    "fa-horse",
    "fa-frog",
    "fa-fish-fins",
    "fa-dove",
    "fa-crow",
    "fa-cat",
]

class NumpadEvent {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
};

const addDigit = (current, digit) => {
    return current + digit;
};

const removeDigit = (current) => {
    if (current === "") {
        return "";
    } else {
        return current.slice(0, -1);
    }
    ;
};

const getAnimalsCounted = () => {
    return document.getElementById("animals-counted").value;
};

const setAnimalsCounted = (val) => {
    document.getElementById("animals-counted").value = val;
};


const numberBtnClickHandler = e => {
    const evt = new NumpadEvent("Add", {value: e.target.dataset.number});
    handleNumpadEvent(evt);
};

const removeBtnClickHandler = e => {
    const evt = new NumpadEvent("Remove", {});
    handleNumpadEvent(evt);
};

const submitBtnClickHandler = e => {
    const evt = new NumpadEvent("Submit", {});
    handleNumpadEvent(evt);
};

const clearBtnClickHandler = e => {
    const evt = new NumpadEvent("Clear", {});
    handleNumpadEvent(evt);
};

const randomAnimal = () => {
    return ANIMAL_ICONS[Math.floor(Math.random() * ANIMAL_ICONS.length)];
};

const randomNumberOfAnimals = () => {
    return Math.ceil(Math.random() * 10);
};

const displayAnimalIcons = (numberOfAnimals, animal) => {
    const el = document.getElementById("animals-to-count");
    el.innerHTML = "";
    for (let i = 0; i < numberOfAnimals; i++) {
        const span = document.createElement("span");
        span.classList.add("p-3");
        span.classList.add("fa");
        span.classList.add("animate__animated")
        span.classList.add(animal);
        el.appendChild(span);
        span.classList.add("animate__slideInDown");
    }
    for (let i = 0; i < numberOfAnimals; i++) {
        setTimeout(() => {
            el.children[i].classList.remove("animate__slideInDown");
        }, 500);
    }
};

const setCorrectAnimalCount = numberOfAnimals => {
    const el = document.getElementById("animals-to-count");
    el.dataset.animals = numberOfAnimals;
};

const getCorrectAnimalCount = () => {
    const el = document.getElementById("animals-to-count");
    return el.dataset.animals;
};

const celebrate = (rightAnswer) => {
    const el = document.getElementById("animals-to-count");
    let delay = 0;
    for (let i = 0; i < el.children.length; i++) {
        const span = el.children[i];
        setTimeout(() => {
                span.classList.add("animate__bounce");
            }, delay
        );
        delay += 50;
    }
    delay += 100;
    for (let i = 0; i < el.children.length; i++) {
        const span = el.children[i];
        setTimeout(() => {
                span.classList.add("animate__bounceOutRight");
            }, delay
        );
        delay += 50;
    }
    setTimeout(() => {
        const el = document.getElementById("animals-to-count");
        el.innerHTML = `<h4>Congratulations! ${rightAnswer} was the correct answer!</h4>`;
    }, delay + 1000);
    delay += 2000;
    setTimeout(newGame, delay);
};

const educate = (rightAnswer) => {
    const el = document.getElementById("animals-to-count");
    let delay = 0;
    for (let i = 0; i < el.children.length; i++) {
        const span = el.children[i];
        setTimeout(() => {
                span.classList.add("animate__rotateOut");
            }, delay
        );
        delay += 50;
    }
    setTimeout(() => {
        const el = document.getElementById("animals-to-count");
        el.innerHTML = `<h4>Sorry. The answer was ${rightAnswer}</h4>`;
    }, delay + 1000);
    delay += 2000;
    setTimeout(newGame, delay);
};


const handleNumpadEvent = numpadEvent => {
    let newVal = "";
    switch (numpadEvent.type) {
        case "Add":
            newVal = addDigit(getAnimalsCounted(), numpadEvent.data.value);
            setAnimalsCounted(newVal);
            break;
        case "Remove":
            newVal = removeDigit(getAnimalsCounted());
            setAnimalsCounted(newVal);
            break;
        case "Clear":
            setAnimalsCounted("");
            break;
        case "Submit":
            const correctAnswer = getCorrectAnimalCount();
            const guess = getAnimalsCounted();
            if (guess === correctAnswer) {
                celebrate(correctAnswer);
            } else {
                educate(correctAnswer);
            }
            break;
        default:
            console.error(`Unhandled numpad event ${numpadEvent}`);
    }
};

const newGame = () => {
    const numberOfAnimals = randomNumberOfAnimals();
    const animal = randomAnimal();
    displayAnimalIcons(numberOfAnimals, animal);
    setCorrectAnimalCount(numberOfAnimals);
    clearBtnClickHandler({});
};

export const preLoadHook = () => {
};
export const postLoadHook = () => {
    document.querySelectorAll(".number-btn").forEach(btn => {
        btn.addEventListener("click", numberBtnClickHandler);
    });
    document.querySelector(".remove-btn").addEventListener("click", removeBtnClickHandler);
    document.querySelector(".submit-btn").addEventListener("click", submitBtnClickHandler);
    newGame();
};
