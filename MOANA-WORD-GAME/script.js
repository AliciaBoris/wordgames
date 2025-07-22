const wordList = ['crab', 'starfish', 'pig', 'chicken', 'boat', 'oars', 'hook', 'coconut', 'tattoo', 'seashell', 'hut', 'turtle', 'moana', 'ocean', 'maui', 'tefiti', 'island', 'village', 'canoe', 'arrow', 'rope', 'courage', 'swim', 'oyster', 'wayfinder', 'heart'];
let usedWords = [];
let currentWord = '';
let score = 0;
let highScore = parseInt(localStorage.getItem('moanaHighScore')) || 0;

document.getElementById('score').textContent = `Score: ${score} | High Score: ${highScore}`;

function shuffle(word) {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

function createTiles(word) {
  const shuffled = shuffle(word);
  const container = document.getElementById('tile-container');
  container.innerHTML = '';
  document.getElementById('drop-zone').innerHTML = '';
  document.getElementById('message').textContent = '';
  document.getElementById('hint').textContent = '';
  document.getElementById('game-over').style.display = 'none';

  for (let i = 0; i < shuffled.length; i++) {
    const tile = document.createElement('div');
    tile.textContent = shuffled[i].toUpperCase();
    tile.classList.add('tile');
    tile.setAttribute('draggable', 'true');
    tile.setAttribute('id', 'tile-' + i);
    tile.addEventListener('dragstart', drag);
    container.appendChild(tile);
  }
}

function startGame() {
  if (usedWords.length === wordList.length) {
    document.getElementById('game-over').style.display = 'block';
    return;
  }

  do {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  } while (usedWords.includes(currentWord));

  usedWords.push(currentWord);
  createTiles(currentWord);
}

function drag(event) {
  event.dataTransfer.setData('text', event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const tileId = event.dataTransfer.getData('text');
  const tile = document.getElementById(tileId);
  if (!event.target.classList.contains('tile')) {
    event.target.appendChild(tile);
  }
}

function checkWord() {
  const dropZone = document.getElementById('drop-zone');
  const letters = Array.from(dropZone.querySelectorAll('.tile')).map(tile => tile.textContent.toLowerCase());
  const formedWord = letters.join('');
  const message = document.getElementById('message');

  if (formedWord === currentWord) {
    score += 3;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('moanaHighScore', highScore);
    }
    document.getElementById('score').textContent = `Score: ${score} | High Score: ${highScore}`;
    message.textContent = `✅ Correct! "${currentWord.toUpperCase()}"`;
    setTimeout(startGame, 1500);
  } else {
    message.textContent = '❌ Incorrect. Try again or reset the tiles.';
  }
}

function resetTiles() {
  createTiles(currentWord);
}

function showHint() {
  document.getElementById('hint').textContent = `Hint: First letter is "${currentWord[0].toUpperCase()}"`;
}

function toggleMusic() {
  const music = document.getElementById('gameMusic');
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

// Start the first round
startGame();
