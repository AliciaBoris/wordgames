// List of words for the game
const words = [
    { word: "cat", scrambled: "tac" },
    { word: "dog", scrambled: "dgo" },
    { word: "bat", scrambled: "bta" },
    { word: "sun", scrambled: "uns" },
    { word: "rat", scrambled: "atr" },
    { word: "pen", scrambled: "pne" },
    { word: "fan", scrambled: "fna" },
    { word: "pig", scrambled: "pgi" },
    { word: "cup", scrambled: "puc" },
    { word: "box", scrambled: "obx" },
    { word: "net", scrambled: "etn" },
    { word: "bug", scrambled: "gbu" },
    { word: "car", scrambled: "arc" },
    { word: "bus", scrambled: "sub" },
    { word: "fox", scrambled: "xof" },
    { word: "ball", scrambled: "blal" },
  { word: "door", scrambled: "ordo" },
  { word: "fish", scrambled: "fhsi" },
  { word: "frog", scrambled: "fgor" },
  { word: "leaf", scrambled: "lfea" },
  { word: "tree", scrambled: "tere" },
  { word: "milk", scrambled: "klim" },
  { word: "lamp", scrambled: "paml" },
  { word: "boat", scrambled: "atbo" },
  { word: "book", scrambled: "koob" },
  { word: "fork", scrambled: "krfo" },
  { word: "coat", scrambled: "ctao" },
  { word: "star", scrambled: "rast" },
  { word: "cake", scrambled: "keca" },
  { word: "rain", scrambled: "niar" },
    { word: "apple", scrambled: "lpeap" },
    { word: "bread", scrambled: "darbe" },
    { word: "chair", scrambled: "hciar" },
    { word: "table", scrambled: "bleta" },
    { word: "cloud", scrambled: "odlcu" },
    { word: "plant", scrambled: "tnalp" },
    { word: "train", scrambled: "rnati" },
    { word: "stone", scrambled: "tnose" },
    { word: "light", scrambled: "tgihl" },
    { word: "fruit", scrambled: "rituf" },
    { word: "piano", scrambled: "naopi" },
    { word: "brush", scrambled: "hrsub" },
    { word: "mouse", scrambled: "ouesm" },
    { word: "house", scrambled: "eohus" },
    { word: "grass", scrambled: "ssgar" },
    { word: "banana", scrambled: "nanaba" },
    { word: "orange", scrambled: "noager" },
    { word: "garden", scrambled: "ndraeg" },
  { word: "basket", scrambled: "sakteb" },
  { word: "animal", scrambled: "mnaial" },
  { word: "pencil", scrambled: "nlcipe" },
  { word: "silver", scrambled: "vlesir" },
  { word: "forest", scrambled: "etsrof" },
  { word: "bridge", scrambled: "gdirbe" },
  { word: "window", scrambled: "ndwiwo" },
    { word: "giraffe", scrambled: "raifegf" },
    { word: "elephant", scrambled: "tphelean" },
    { word: "computer", scrambled: "muocterp" },
    { word: "bottle", scrambled: "toblte" },
    { word: "cookie", scrambled: "ekooci" },
  { word: "planet", scrambled: "pantle" },
  { word: "sunset", scrambled: "suntes" },
  { word: "rabbit", scrambled: "ribabt" },
  { word: "school", scrambled: "olhcso" },
  { word: "butter", scrambled: "ruttbe" },
  { word: "picture", scrambled: "putcire" },
  { word: "teacher", scrambled: "tehrace" },
  { word: "brother", scrambled: "bretorh" },
  { word: "monster", scrambled: "mnstero" },
  { word: "blanket", scrambled: "ketblan" },
  { word: "friends", scrambled: "fsneri" },
  { word: "diamond", scrambled: "dmionad" },
  { word: "reading", scrambled: "gindare" },
  { word: "islands", scrambled: "nldssai" },
  { word: "library", scrambled: "rlyrabi" },
  { word: "kitchen", scrambled: "hnetkic" },
  { word: "sandbox", scrambled: "boxands" },
  { word: "holiday", scrambled: "yholadi" },
  { word: "captain", scrambled: "tanpaci" },
  { word: "message", scrambled: "gseesam" }
];

// Retrieve game progress from localStorage, or set default values if no progress is saved
let currentWordIndex = parseInt(localStorage.getItem("currentWordIndex")) || 0;
let score = parseInt(localStorage.getItem("score")) || 0;

// Function to display the scrambled word
function displayWord() {
    document.getElementById('scrambledWord').innerText = words[currentWordIndex].scrambled;
}

// Function to check if the player's answer is correct
function checkAnswer() {
    const userInput = document.getElementById('userInput').value.toLowerCase();
    const correctWord = words[currentWordIndex].word;

    if (userInput === correctWord) {
        document.getElementById('feedback').innerText = "Correct! Great job!";
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        document.getElementById('nextWordBtn').style.display = "block"; // Show next word button
    } else {
        document.getElementById('feedback').innerText = "Oops! Try again.";
    }
}

// Function to move to the next word
function nextWord() {
    currentWordIndex++;
    if (currentWordIndex < words.length) {
        document.getElementById('userInput').value = ""; // Clear input
        document.getElementById('feedback').innerText = ""; // Clear feedback
        document.getElementById('nextWordBtn').style.display = "none"; // Hide next button
        displayWord(); // Show next scrambled word
    } else {
        // End of game
        document.getElementById('feedback').innerText = "Congratulations! You're a Star! You completed all words!";
        document.getElementById('scrambledWord').innerText = "";
        document.getElementById('userInput').style.display = "none"; // Hide input box
        document.querySelector("button[onclick='checkAnswer()']").style.display = "none"; // Hide submit button
        document.getElementById('nextWordBtn').style.display = "none"; // Hide next button
    }
}

// Function to go to the previous word
function prevWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        console.log(`Going back to the previous word. Current word index: ${currentWordIndex}`); // Log the updated word index
        localStorage.setItem("currentWordIndex", currentWordIndex); // Save the current word index
        displayWord(); // Show previous scrambled word
        document.getElementById('nextWordBtn').style.display = "none"; // Hide next button
    } else {
        console.log('No previous word available.'); // Log if already at the first word
        document.getElementById('feedback').innerText = "This is the first word!";
    }
}

// Initialize game progress by displaying the first word or resuming where the player left off
function initGame() {
    document.getElementById('score').innerText = `Score: ${score}`;
    displayWord();
}

// Start the game by displaying the first word
displayWord();
