gameCards = document.querySelectorAll(".card");
gameBox = document.querySelector("#game");

let maxManuallyOpenableElements = 2; // max no. of cards that ca be opened simultaneously.

const sideFlipper = (event) => {
  element = event.currentTarget; //returns the element which is clicked.
  if (
    element.children[0].style.transform != "rotateY(180deg)" &&
    manuallyOpenedCards.length < maxManuallyOpenableElements
  ) {
    element.children[0].style.transform = "rotateY(180deg)";
  } else {
    element.children[0].style.transform = "rotateY(0deg)";
  }
};

const manualListUpdater = (event) => {
  e = event.currentTarget;
  if (manuallyOpenedCards.includes(e)) {
    manuallyOpenedCards = manuallyOpenedCards.filter((item) => item !== e);
  } else if (manuallyOpenedCards.length < maxManuallyOpenableElements) {
    manuallyOpenedCards.push(e);
  }
};

let manuallyOpenedCards = [];
let pairedCards = [];
let activeElements = [];

// Setting up a function to continuously close the opened cards
// and checks for succes(pairing)
// and after succes, updates the game.
let open_duration = 750; //max time(milisecond) for which a card remains opened after click

cardLogic = () => {
  if (manuallyOpenedCards.length != 0) {
    setTimeout(() => {
      //error issue is now fixed, so removed that try/catch...
      if (
        manuallyOpenedCards.length == maxManuallyOpenableElements &&
        manuallyOpenedCards[0].dataset.image === //`dataset.image` represents `data-image` of HTML
          manuallyOpenedCards[1].dataset.image
      ) {
        for (i of manuallyOpenedCards) {
          i.removeEventListener("click", sideFlipper);
          i.removeEventListener("click", manualListUpdater);
          pairedCards.push(i);
          // console.log(pairedCards);
          successStyler(i); //defined in styler.js
        }
        manuallyOpenedCards.splice(0, 2);
      } else if (manuallyOpenedCards.length != 0) {
        manuallyOpenedCards[0].children[0].style.transform = "rotateY(0deg)";
        manuallyOpenedCards.splice(0, 1); //removes the card from opened list
      }
    }, open_duration);
  }
};

function runGame() {
  gameCards.forEach((e) => {
    //the extra `if` is important for pause/play functionality.
    if (pairedCards.length == 0 || pairedCards.includes(e) === false) {
      e.addEventListener("click", sideFlipper); // flip the card on click
      e.addEventListener("click", manualListUpdater); // adds the clicked card to the list
      e.addEventListener("click", cardLogic); // this will run cardLogic, every time you click a card.
      e.addEventListener("mouseenter", circleHighlighter); // Just for dopamine!
      e.addEventListener("mouseleave", circleReverter); // Just for Dopamine!
      e.addEventListener("click", VictoryChecker);
    }
    //Extra styling :
    e.style.opacity = "1";
  });
}

// runGame();

function pauseGame() {
  gameCards.forEach((e) => {
    e.removeEventListener("click", sideFlipper); // flip the card on click
    e.removeEventListener("click", manualListUpdater); // adds the clicked card to the list
    e.removeEventListener("click", cardLogic); // this will run cardLogic, every time you click a card.
    e.removeEventListener("mouseenter", circleHighlighter); // Just for dopamine!
    e.removeEventListener("mouseleave", circleReverter); // Just for Dopamine!
    e.addEventListener("click", VictoryChecker);
    //Extra Styling :
    e.style.opacity = "0.25";
  });
}
// you can even call the pauseGame function in browser console
// and it will still work.

//When the Game in Loaded inicially, the game should bein the paused state.:
pauseGame();

/*
12th of July, 2023
3:18

*/
