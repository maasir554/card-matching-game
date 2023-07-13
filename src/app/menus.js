// const root = document.querySelector(":root");
// `root` was alredy defined in data.js
const togglePlayButton = document.querySelector("#play");
const statusBox = document.getElementById("game-status");
const gameMenu = document.getElementById("game-info");

let gameIsRunning = false;

const PlayPause = () => {
  if (togglePlayButton.innerText == "Play Again") {
    pairedCards = []; // reset the array of paired cards
    manuallyOpenedCards = [];
    populate(gridSize);
    gameCards = document.querySelectorAll(".card");
    shuffle();
  }
  //------------------------------
  if (gameIsRunning) {
    pauseGame(); // defined in app.js
    gameIsRunning = false;
    togglePlayButton.innerText = "Resume";
    root.style.setProperty("--menu-btn-primary", "rgb(65, 177, 0)");
    root.style.setProperty("--menu-btn-secondary", "rgb(73, 199, 0");
    root.style.setProperty("--menu-btn-tertiary", "rgb(59, 161, 0)");
    statusBox.innerText = "Game(Paused) :";
    gameMenu.style.opacity = "1";
    gameMenu.style.border = "2px solid white";
  } else {
    runGame(); // defined in app.js
    gameIsRunning = true;
    togglePlayButton.innerText = "Pause";
    root.style.setProperty("--menu-btn-primary", "rgb(10 80 0)");
    root.style.setProperty("--menu-btn-secondary", "rgb(35 110 0)");
    root.style.setProperty("--menu-btn-tertiary", "rgb(8 65 0)");
    statusBox.innerText = "Game(Running) :";
    gameMenu.style.opacity = "0.75";
    gameMenu.style.border = "2px solid transparent";
  }
  //-------------------------
};

togglePlayButton.addEventListener("click", PlayPause);

//when the game is complete, i.e. the user ha won the game, then:
// VictoryChecker.js wil be used in app.js
const VictoryChecker = () => {
  gameIsRunning = false;
  // gridSize can be found in data.js
  setTimeout(() => {
    if (pairedCards.length == gridSize ** 2) {
      togglePlayButton.innerText = "Play Again";
      root.style.setProperty("--menu-btn-primary", "rgb(65, 177, 0)");
      root.style.setProperty("--menu-btn-secondary", "rgb(73, 199, 0");
      root.style.setProperty("--menu-btn-tertiary", "rgb(59, 161, 0)");
      statusBox.innerText = "Enjoyed? :";
      gameMenu.style.opacity = "1";
      gameMenu.style.border = "1px solid white";
    }
  }, 550);
};