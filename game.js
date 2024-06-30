const words = [
    {
        word: "group",
        hint: "A number of objects or persons"
    },
    {
        word: "addition",
        hint: "The process of adding numbers"
    },
    {
        word: "meeting",
        hint: "Events in which people come together"
    },
    {
        word: "exchange",
        hint: "The act of trading"
    },
    {
        word: "friend",
        hint: "Person other than a family member"
    },
    {
        word: "taste",
        hint: "Ability of tongue to detect flavor"
    },
    {
        word: "pocket",
        hint: "A bag for carrying small items"
    },
    {
        word: "expert",
        hint: "Person with extensive knowledge"
    },
];

const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxtime) => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxtime > 0) {
            maxtime--;
            timeText.textContent = maxtime;
        } else {
            clearInterval(timer);
            alert(`Time over. "${correctWord.toUpperCase()}" was the correct word.`);
            initGame();
        }
    }, 1000);
};

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.textContent = wordArray.join("");
    hintText.textContent = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};

const checkWord = () => {
    let userWord = inputField.value.trim().toLowerCase();
    if (!userWord) {
        alert("Please enter a word to check.");
        return;
    }

    if (userWord !== correctWord) {
        alert(`Oops! "${userWord}" is not the correct word.`);
    } else {
        alert(`Congratulations! "${userWord.toUpperCase()}" is the correct word.`);
    }
    initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

// Initialize the game when the page loads
initGame();