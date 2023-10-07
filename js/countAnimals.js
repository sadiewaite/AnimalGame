const ANIMAL_ICONS = [
    "fa-solid fa-hippo"
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
    };
};

const getAnimalsCounted = () => {
    return document.getElementById("animals-counted").value;
};

const setAnimalsCounted = (val) => {
    document.getElementById("animals-counted").value = val;
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
        case "Submit":
            console.log('submit');
            break;
        default:
            console.error(`Unhandled numpad event ${numpadEvent}`);
    }
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

export const preLoadHook = () => {};
export const postLoadHook = () => {
    document.querySelectorAll(".number-btn").forEach(btn => {
        btn.addEventListener("click", numberBtnClickHandler);
    });
    document.querySelector(".remove-btn").addEventListener("click", removeBtnClickHandler);
    document.querySelector(".submit-btn").addEventListener("click", submitBtnClickHandler);
};
