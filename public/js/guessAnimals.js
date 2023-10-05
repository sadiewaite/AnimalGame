const ANIMALS = [
    "chipmunk",
    "deer",
    "kangaroo",
    "zebra",
    "snake",
    "donkey",
    "pig",
    "cheetah",
    "spider",
    "horse",
    "parrot",
    "crow",
    "chicken",
    "turtle",
    "bear",
    "lion",
    "tiger",
    "beaver",
    "bunny",
    "giraffe",
    "cow",
    "dog",
    "whale",
    "falcon"
];

const STATE = {
    correct_guesses: 0,
    total_tries: 0,
};

function getUrl(x) {
    return "https://source.unsplash.com/random/?" + x;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
function setChoice(id, value) {
    const el = document.getElementById(id);
    el.value = value;
    const lbl = document.getElementById(id + "_lbl");
    lbl.textContent = value;
}
function loadAnimal() {
    const animal_data = ANIMALS.map(x => { return { name: x, url: getUrl(x) }});
    const chosenAnimal = animal_data[getRandomInt(ANIMALS.length)];
    const url = chosenAnimal.url;
    const img = document.getElementById("animal_image");
    img.src = url;
    const choices = new Set([chosenAnimal.name]);
    while ([...choices].length < 4) {
        choices.add(ANIMALS[getRandomInt(ANIMALS.length)]);
    }
    const choices_arr = [...choices];
    shuffle(choices_arr);

    setChoice("choicesRadio1", choices_arr[0]);
    setChoice("choicesRadio2", choices_arr[1]);
    setChoice("choicesRadio3", choices_arr[2]);
    setChoice("choicesRadio4", choices_arr[3]);
    document.getElementById("correctAnimal").value = chosenAnimal.name;
}
function handleGuess(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    if (formProps.choicesRadio === formProps.correctAnimal) {
        // alert("Right!");
        const goodguessEl = document.getElementById("goodguess");
        goodguessEl.classList.add("animate__bounce");
        setTimeout(function() {
            goodguessEl.classList.remove("animate__bounce");
        }, 500);
    } else {
        alert("Sorry wrong answer!");
    }
    setTimeout(() => {
        loadAnimal();
    }, 100);
}


export const preLoadHook = () => {};
export const postLoadHook = () => {
    const newAnimalButton = document.getElementById("guess_form");
    newAnimalButton.addEventListener("submit", handleGuess);
    loadAnimal();
};