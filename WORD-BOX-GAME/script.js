const baseWords = [
  { word: "butterfly", valid: ["but", "buy", "butter", "utter", "fly", "try", "bet", "tub", "flutter", "yet", "fur", "let", "bye", "rye", "rub", "blue", "tell", "fry"] },
  { word: "playground", valid: ["play", "pay", "ground", "gun", "run", "yard", "grand", "round", "lay"] },
  { word: "elephant", valid: ["ant", "pant", "hat", "pen", "net", "tap", "ten", "help", "leap"] }
];
let stage = 0;

let currentWord = "";
let score = 0;
let correctCount = 0;

const letterTilesContainer = document.getElementById("letter-tiles");
const wordBox = document.getElementById("word-box");
const feedback = document.getElementById("feedback");
const wordList = document.getElementById("word-list");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const nextStageButton = document.getElementById("next-stage");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

let usedWords = new Set();

function loadStage() {
  // Clear state
  currentWord = "";
  correctCount = 0;
  usedWords.clear();
  feedback.textContent = "";
  wordList.innerHTML = "";
  nextStageButton.style.display = "none";

  const stageData = baseWords[stage];
  document.getElementById("base-word").textContent = stageData.word;
  createTiles(stageData.word);
}

function createTiles(word) {
  letterTilesContainer.innerHTML = '';
  word.split('').forEach((char, index) => {
    const tile = document.createElement("div");
    tile.textContent = char.toUpperCase();
    tile.classList.add("tile");
    tile.setAttribute("draggable", "true");
    tile.setAttribute("id", `tile-${index}`);
    tile.addEventListener("dragstart", dragStart);
    letterTilesContainer.appendChild(tile);
  });
}

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

wordBox.addEventListener("dragover", (e) => e.preventDefault());

wordBox.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text");
  const tile = document.getElementById(id);
  const clone = tile.cloneNode(true);
  clone.removeAttribute("id");
  clone.style.cursor = "default";
  wordBox.appendChild(clone);
  currentWord += tile.textContent.toLowerCase();
});

document.getElementById("submit-word").addEventListener("click", () => {
  if (currentWord.length === 0) return;
  const word = currentWord;
  const valid = baseWords[stage].valid;

  if (valid.includes(word) && !usedWords.has(word)) {
    const li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);
    score += word.length;
    correctCount += 1;
    usedWords.add(word);
    feedback.textContent = "✅ Great job!";
    feedback.classList.add("celebrate");
    correctSound.play();
    updateHighScore();

    if (correctCount >= 6) {
      nextStageButton.style.display = "inline-block";
    }
  } else {
    feedback.textContent = "❌ Try again!";
    wrongSound.play();
  }

  setTimeout(() => feedback.classList.remove("celebrate"), 500);

  scoreDisplay.textContent = score;
  wordBox.innerHTML = '<p>Drop letters here to build a word</p>';
  currentWord = '';
});

function updateHighScore() {
  const highScore = parseInt(localStorage.getItem("highScore")) || 0;
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScoreDisplay.textContent = score;
  }
}

nextStageButton.addEventListener("click", () => {
  if (stage + 1 < baseWords.length) {
    stage++;
    loadStage();
  } else {
    alert("🎉 You’ve completed all stages! Resetting game.");
    stage = 0;
    score = 0;
    scoreDisplay.textContent = 0;
    loadStage();
  }
});

function init() {
  score = 0;
  scoreDisplay.textContent = 0;
  highScoreDisplay.textContent = localStorage.getItem("highScore") || 0;
  loadStage();
}

init();
