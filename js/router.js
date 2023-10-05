import * as guessAnimals from "./guessAnimals.js";
import * as countAnimals from "./countAnimals.js";

const switchGame = (tgt) => {
   const newEl = document.getElementById(`invisible-${tgt}`).cloneNode(true);
    const contentEl = document.getElementById("content");
    contentEl.innerHTML = "";
    contentEl.append(newEl);
    document.querySelector(".active").classList.remove("active");
    document.getElementById(`${tgt}-link`).classList.add("active");
}
const router = () => {
    switch (window.location.hash) {
        case "#":
            guessAnimals.preLoadHook();
            switchGame("guess");
            guessAnimals.postLoadHook();
            break;
        case "#guess-animals":
            guessAnimals.preLoadHook();
            switchGame("guess");
            guessAnimals.postLoadHook();
            break;
        case "#count-animals":
            countAnimals.preLoadHook();
            switchGame("count");
            countAnimals.postLoadHook();
            break;
        default:
            guessAnimals.preLoadHook();
            switchGame("guess");
            guessAnimals.postLoadHook();
            break;
    }
};
export const useRouter = e => {
    router();
};