// const root = document.querySelector(":root"); /* root alredy imported in previosus scripts.*/
// `root` was alredy defined in data.js
const togglePlayButton = document.querySelector("#play");
const statusBox = document.getElementById("game-status");
const gameMenu = document.getElementById("game-info");

let gameIsRunning = false;

const PlayPause = () => {
  // console.log("The function PlayPause has bee called!");

  if (togglePlayButton.innerText == "Play Again") {
    pairedCards = []; // reset the array of paired cards
    manuallyOpenedCards = [];
    populate(gridSize);
    gameCards = document.querySelectorAll(".card");
    shuffle();
    //NOTE: gameIsRunning is still FALSE. the below if-else seq. will run accordingly.
    //For Stop Clock :
    mins = 0;
    secs = 0;
    movesConsumedCount = 0;
    // TIMER_INT = setInterval(timeUpdater, 1000); //this will be called in the next if/else block.
    // So, no worries.
  } else {
  }
  // -----------------------------------------------------------------
  if (gameIsRunning) {
    // console.log("just before you clicked button, gameIsRunning was TRUE");
    pauseGame(); // defined in app.js
    gameIsRunning = false;
    togglePlayButton.innerText = "Resume";
    root.style.setProperty("--menu-btn-primary", "rgb(65, 177, 0)");
    root.style.setProperty("--menu-btn-secondary", "rgb(73, 199, 0");
    root.style.setProperty("--menu-btn-tertiary", "rgb(59, 161, 0)");
    statusBox.innerText = "Game(Paused) :";
    gameMenu.style.opacity = "1";
    gameMenu.style.border = "2px solid white";
    //For stop clock :
    clearInterval(TIMER_INT);
  } else {
    // console.log("just before you clicked button, gameIsRunning was FALSE");
    runGame(); // defined in app.js
    gameIsRunning = true;
    togglePlayButton.innerText = "Pause";
    root.style.setProperty("--menu-btn-primary", "rgb(10 80 0)");
    root.style.setProperty("--menu-btn-secondary", "rgb(35 110 0)");
    root.style.setProperty("--menu-btn-tertiary", "rgb(8 65 0)");
    statusBox.innerText = "Game(Running) :";
    gameMenu.style.opacity = "0.75";
    gameMenu.style.border = "2px solid transparent";
    // for stop-clock
    TIMER_INT = setInterval(timeUpdater, 1000);
  }
  //-------------------------
};

togglePlayButton.addEventListener("click", PlayPause);

//when the game is complete, i.e. the user ha won the game, then:
// VictoryChecker wil be used in app.js

const VictoryChecker = () => {
  // this function not only checks victory, but updates the DOM after victory.
  // gridSize can be found in data.js
  setTimeout(() => {
    if (pairedCards.length == gridSize ** 2) {
      gameIsRunning = false;
      togglePlayButton.innerText = "Play Again";
      root.style.setProperty("--menu-btn-primary", "rgb(65, 177, 0)");
      root.style.setProperty("--menu-btn-secondary", "rgb(73, 199, 0");
      root.style.setProperty("--menu-btn-tertiary", "rgb(59, 161, 0)");
      statusBox.innerText = "Enjoyed? :";
      gameMenu.style.opacity = "1";
      gameMenu.style.border = "1px solid white";
      //For StopClock:
      clearInterval(TIMER_INT);
      // Now, for the dialogue box and overlay, :-
      setTimeout(() => {
        root.style.setProperty("--victory-box-display-switch", "flex");
        root.style.setProperty("--overlay-display-switch", "block");
      }, 250);
      pairedCards.forEach((e) => {
        e.removeEventListener("click", VictoryChecker); // to avoid glitch.
        e.children[0].children[1].style.animation = "rainbow 0.5s infinite";
      });

      // details to be filled in dialogue box : -----
      let timeOfCompletionGreeting =
        document.getElementById("time-of-completion");

      timeOfCompletionGreeting.innerText =
        //using ternary operator, cause... why not!
        secs > 9 ? `${mins}:${secs}` : `${mins}:0${secs}`;

      let movesLeftReport = document.getElementById("moves-of-completion");
      movesLeftReport.innerText = movesConsumedCount;
      //------x--------x--------x--------x--------
    }
  }, 450);
};
// Now, for closing the victory box :
crossVictoryBoxButton = document.getElementById("victory-box-close-button");
closeVictoryBoxButton = document.getElementById("close-victory-box");
closeVictoryBoxButton.addEventListener("click", () => {
  root.style.setProperty("--victory-box-display-switch", "none");
  root.style.setProperty("--overlay-display-switch", "none");
});
crossVictoryBoxButton.addEventListener("click", () => {
  root.style.setProperty("--victory-box-display-switch", "none");
  root.style.setProperty("--overlay-display-switch", "none");
});

// For navigation bar :

// For the Info Button
const instrucBtn = document.getElementById("instruction-button");
const instrucCloseBtn = document.getElementById("instructions-close-button");

instrucBtn.addEventListener("click", () => {
  /* Yeh variable andar define karna bahut hi zaroori hai, warna ye update nahi hota hai.. */
  let instrucDisplay = getComputedStyle(root).getPropertyValue(
    "--instructions-display"
  );
  if (instrucDisplay == "none") {
    root.style.setProperty("--instructions-display", "block");
    instrucBtn.style.opacity = "1";
  } else {
    root.style.setProperty("--instructions-display", "none");
    instrucBtn.style.fill = "white";
    instrucBtn.style.opacity = "0.65";
  }
  //For improved UX :
  root.style.setProperty("--settings-display", "none");
  settingsBtn.style.fill = "white";
  settingsBtn.style.opacity = "0.65";
});
instrucCloseBtn.addEventListener("click", () => {
  root.style.setProperty("--instructions-display", "none");
  instrucBtn.style.fill = "white";
  instrucBtn.style.opacity = "0.65";
});

// For the settings button :
const settingsBtn = document.getElementById("settings-button");
const settingsCloseBtn = document.getElementById("settings-close-button");
settingsBtn.addEventListener("click", () => {
  /* Yeh variable andar define karna bahut hi zaroori hai, warna ye update nahi hota hai.. */
  let settingsDisplay =
    getComputedStyle(root).getPropertyValue("--settings-display");
  if (settingsDisplay == "none") {
    root.style.setProperty("--settings-display", "grid");
    settingsBtn.style.opacity = "1";
  } else {
    root.style.setProperty("--settings-display", "none");
    settingsBtn.style.fill = "white";
    settingsBtn.style.opacity = "0.65";
  }
  //For improved UX :-
  root.style.setProperty("--instructions-display", "none");
  instrucBtn.style.opacity = "0.65";
  instrucBtn.style.fill = "white";
});
settingsCloseBtn.addEventListener("click", () => {
  root.style.setProperty("--settings-display", "none");
  settingsBtn.style.fill = "white";
  settingsBtn.style.opacity = "0.65";
});

// For moves Consumed :
let movesConsumedCount = 0;
const MovesCounsumedCountUpdater = () => {
  let MovesConsumedCountContainer = document.getElementById("moves-consumed");
  movesConsumedCount += 1;
  MovesConsumedCountContainer.innerText = movesConsumedCount;
  MovesConsumedCountContainer.style.color = "white";
  MovesConsumedCountContainer.style.opacity = "1";
  MovesConsumedCountContainer.style.textShadow = "0px 0px 5px red";
  setTimeout(() => {
    MovesConsumedCountContainer.style.color = "var(--gi-moves-consumed-color)";
    MovesConsumedCountContainer.style.opacity = "0.75";
    MovesConsumedCountContainer.style.textShadow = "none";
  }, 100);
};

//For score calculation :

highScoreBox = document.getElementById("high-score-box");
currentScoreBox = document.getElementById("current-score-box");
scoreDialogueBox = document.getElementById("score"); // inside the victory box.
if (localStorage.getItem("HighScore") != "null") {
  highScoreBox.innerText = localStorage.getItem("HighScore");
} else {
  highScoreBox.innerText = 0;
} // to populate when page is loaded
ScoreUpdater = () => {
  LSHighScore = localStorage.getItem("HighScore");
  let HighScore = LSHighScore != "null" ? LSHighScore : 0;
  let t = secs + mins * 60;
  let currentScore = Math.floor(
    pairedCards.length ** 5 / (1 + t ** 2 + movesConsumedCount ** 2)
  );
  if (currentScore > HighScore) {
    HighScore = currentScore;
  }

  currentScoreBox.innerText = currentScore;
  scoreDialogueBox.innerText = currentScore;
  highScoreBox.innerText = HighScore;
  localStorage.setItem("HighScore", HighScore);
};
