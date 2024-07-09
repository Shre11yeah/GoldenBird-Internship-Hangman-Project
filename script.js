const categories = {
    "Flowers": ["rose", "tulip", "daisy", "sunflower", "orchid"],
    "Superheroes": ["spiderman", "superman", "batman", "hulk", "ironman", "flash"],
    "Movies": ["inception", "titanic", "avatar", "gladiator", "up"],
    "Cricket Players": ["sachin", "dhoni", "virat", "lara", "warne"],
    "Actors": ["bradpitt", "tomcruise", "leonardo", "johnnydepp", "willsmith"]
};

let chosenWord = "";
let display = [];
let lives = 6;
let guessedLetters = [];
let categoryName = "";

const categoryContainer = document.getElementById("category-container");
const gameContainer = document.getElementById("game-container");
const categoryNameDisplay = document.getElementById("category-name");
const wordDisplay = document.getElementById("word-display");
const livesDisplay = document.getElementById("lives-display");
const alphabetButtonsContainer = document.getElementById("alphabet-buttons");
const hangmanImage = document.getElementById("hangman-image");

function resetGame(category) {
    categoryName = category;
    chosenWord = categories[category][Math.floor(Math.random() * categories[category].length)];
    display = Array(chosenWord.length).fill("_");
    lives = 6;
    guessedLetters = [];
    updateDisplay();
    createAlphabetButtons();
    categoryContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
}

function updateDisplay() {
    wordDisplay.textContent = display.join(" ");
    livesDisplay.textContent = `Lives: ${lives}`;
    categoryNameDisplay.textContent = `Category: ${categoryName}`;
    hangmanImage.src = `images/hangman${6 - lives}.png`; // Update hangman image based on lives remaining
}

function createAlphabetButtons() {
    alphabetButtonsContainer.innerHTML = "";
    for (let letter of "abcdefghijklmnopqrstuvwxyz") {
        const button = document.createElement("button");
        button.textContent = letter.toUpperCase();
        button.addEventListener("click", () => onButtonClick(letter, button));
        alphabetButtonsContainer.appendChild(button);
    }
}

function onButtonClick(letter, button) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        button.disabled = true;
        button.style.backgroundColor = 'gray';
        if (chosenWord.includes(letter)) {
            for (let i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === letter) {
                    display[i] = letter;
                }
            }
        } else {
            lives--;
            wordDisplay.classList.add("shake");
            setTimeout(() => wordDisplay.classList.remove("shake"), 500);
        }
        updateDisplay();
        checkGameStatus();
    }
}

function checkGameStatus() {
    if (!display.includes("_")) {
        setTimeout(() => alert("You win!"), 100);
        resetToCategorySelection();
    } else if (lives === 0) {
        setTimeout(() => alert(`You lose. The word was ${chosenWord}`), 100);
        resetToCategorySelection();
    }
}

function resetToCategorySelection() {
    categoryContainer.classList.remove("hidden");
    gameContainer.classList.add("hidden");
}

function createCategoryButtons() {
    const categoriesDiv = document.getElementById("categories");
    for (let category in categories) {
        const button = document.createElement("button");
        button.textContent = category;
        button.addEventListener("click", () => resetGame(category));
        categoriesDiv.appendChild(button);
    }
}

createCategoryButtons();
