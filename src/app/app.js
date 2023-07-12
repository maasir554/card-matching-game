gameCards = document.querySelectorAll(".card");

const maxManuallyOpenableElements = 2; // max no. of cards that ca be opened simultaneously.

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
      try {
        //it was giving some errors , so...

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
        } else {
          manuallyOpenedCards[0].children[0].style.transform = "rotateY(0deg)";
          manuallyOpenedCards.splice(0, 1); //removes the card from opened list
        }
      } catch (e) {
        /* no worries if there is an error !*/
        // console.log("error occoured in card logic.");
        // console.log(e);
      }
    }, open_duration);
  }
};

gameCards.forEach((e) => {
  e.addEventListener("click", sideFlipper); // flip the card on click
  e.addEventListener("click", manualListUpdater); // adds the clicked card to the list
  e.addEventListener("click", cardLogic); // this will run cardLogic, every time you click a card.
  e.addEventListener("mouseenter", circleHighlighter); // Just for dopamine!
  e.addEventListener("mouseleave", circleReverter); // Just for Dopamine!
});

/*
12th of July, 2023
3:18

*/
