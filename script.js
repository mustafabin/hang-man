//starting animation
document.querySelectorAll(".key").forEach((key) => {
  setTimeout(() => {
    key.classList.add("active");
  }, 100);
  setTimeout(() => {
    key.classList.toggle("active");
  }, 600);
});

let createDashes = (word) => {
  const wordContainer = document.querySelector(".word-container");
  for (let i = 0; i < word.length; i++) {
    let char = document.createElement("h1");
    char.textContent = "_";
    char.classList.add("word-letter");
    wordContainer.appendChild(char);
  }
};
let updateImg = (num) => {
  document.querySelector("img").src = `media/${num}.svg`;
};

let checkForMatch = (inputChar, word, key) => {
  let correctGuess = false;
  let wordArr = [];

  if (guessChances - 1 != 0 && !won) {
    document.querySelectorAll(".word-letter").forEach((char, i) => {
      if (inputChar == word[i]) {
        char.textContent = word[i].toUpperCase();
        correctGuess = true;
      }
      wordArr.push(char.textContent);
    });
    if (correctGuess) {
      key.classList.add("correct");
    } else {
      key.classList.add("wrong");
      guessChances--;
      updateImg(guessChances);
    }
    if (!wordArr.includes("_")) {
      console.log("win");
      document.querySelector(".guess").innerHTML = "You Win";

      return (won = true);
    }

    document.querySelector(".guesses-left").textContent = guessChances;
  } else if (!won) {
    document.querySelector(
      ".guess"
    ).innerHTML = `YOU LOSE: the word was  ' ${word} ' `;
    updateImg(guessChances - 1);
  }
};

let grabKey = (char) => {
  let foundKey = "err";
  document.querySelectorAll(".key").forEach((key) => {
    if (char == key.dataset.letter) {
      foundKey = key;
    }
  });
  return foundKey;
};
let startGame = () => {
  guessChances = document.querySelector("input[name='guess']:checked").value;
  document.querySelector(".startingBtns").classList.add("hide");
  document.querySelector("p").style.display = "block";
  document.querySelector(".guessBtns").style.display = "none";
  document.querySelector(".guesses-left").textContent = guessChances;
  let word = document.querySelector("#word-input").value;
  console.log(word);
  createDashes(word);
  document.querySelector(".game-area").addEventListener("keydown", (e) => {
    let key = document.querySelector(`[data-letter=${e.key}]`);
    key.classList.add("active");

    setTimeout(() => key.classList.remove("active"), 500);
    checkForMatch(e.key, word, grabKey(e.key));
  });
  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", (e) => {
      checkForMatch(e.target.dataset.letter, word, key);
    });
  });
};
let apiStart = async () => {
  guessChances = document.querySelector("input[name='guess']:checked").value;
  document.querySelector(".startingBtns").classList.add("hide");
  document.querySelector("p").style.display = "block";
  document.querySelector(".guessBtns").style.display = "none";
  document.querySelector(".guesses-left").textContent = guessChances;
  //https://random-word-api.herokuapp.com/word
  let response = await axios.get("https://random-word-api.herokuapp.com/word");
  let word = response.data[0];
  createDashes(word);
  document.querySelector(".game-area").addEventListener("keydown", (e) => {
    let key = document.querySelector(`[data-letter=${e.key}]`);
    key.classList.add("active");

    setTimeout(() => key.classList.remove("active"), 500);
    checkForMatch(e.key, word, grabKey(e.key));
  });
  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", (e) => {
      checkForMatch(e.target.dataset.letter, word, key);
    });
  });
};

let guessChances = 6;
let won = false;

document.querySelector(".inputBtn").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "flex";
});
document.querySelector(".apiBtn").addEventListener("click", apiStart);
document.querySelector("#modal-btn").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "none";
  startGame();
});
