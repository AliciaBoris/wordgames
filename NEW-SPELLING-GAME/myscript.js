// List of words for the game
const words = [
    { word: "mat", scrambled: "m_t" },
    { word: "log", scrambled: "l_g" },
    { word: "fat", scrambled: "f_t" },
    { word: "sun", scrambled: "s_n" },
    { word: "cut", scrambled: "c_t" },
    { word: "pen", scrambled: "p_n" },
    { word: "fan", scrambled: "f_n" },
    { word: "pig", scrambled: "p_g" },
    { word: "cup", scrambled: "c_p" },
    { word: "box", scrambled: "b_x" },
    { word: "ten", scrambled: "t_n" },
    { word: "bag", scrambled: "b_g" },
    { word: "car", scrambled: "c_r" },
    { word: "bus", scrambled: "b_s" },
    { word: "fox", scrambled: "f_x" },
    { word: "call", scrambled: "ca_l" },
  { word: "poor", scrambled: "p_or" },
  { word: "fish", scrambled: "f_sh" },
  { word: "grain", scrambled: "gr_in" },
  { word: "leaf", scrambled: "l_af" },
  { word: "boost", scrambled: "b_ost" },
  { word: "mask", scrambled: "m_sk" },
  { word: "palm", scrambled: "p_lm" },
  { word: "boat", scrambled: "b_at" },
  { word: "book", scrambled: "b_ok" },
  { word: "fork", scrambled: "f_rk" },
  { word: "camp", scrambled: "c_mp" },
  { word: "star", scrambled: "st_r" },
  { word: "cake", scrambled: "c_ke" },
  { word: "rain", scrambled: "r_in" },
    { word: "candle", scrambled: "c_ndle" },
    { word: "bread", scrambled: "br_ad" },
    { word: "choir", scrambled: "ch_ir" },
    { word: "table", scrambled: "ta_le" },
    { word: "cloud", scrambled: "cl_ud" },
    { word: "plant", scrambled: "pl_nt" },
    { word: "shoe", scrambled: "sho_" },
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
