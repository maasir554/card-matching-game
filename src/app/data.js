{
  /*
  -------------------------------------------------
  github.com/maasir554/card-matching-game/app/data.js
  -------------------------------------------------
  Function related to populating HTML directly.
  -------------------------------------------------
  Date Created : 12th of June, 2023
  -------------------------------------------------
  copyright(c) 2023, Mohammad Maasir
  --------------------------------------------------
  */
}
const game = document.getElementById("game");
const root = document.querySelector(":root");
//below are the names of emoji png present in ./assets folder
EmojiList = [
  "angryface",
  "coke",
  "coolface",
  "evilface",
  "feverface",
  "freezeface",
  "mindblownface",
  "sneezeface",
  "thinkingface",
  "vomitface",
  "laughing",
  "fire",
  "car",
  "hi",
  "punch",
  "thumb",
  "indexfinger",
  "money",
];

function ShuffledArray(arr) {
  // Fisher Yates Algorithm :
  // (this function is written with the help of stack overflow & chatGPT)
  let i = arr.length;
  let i_random;
  // can also do like : ```let i = array.lenght , i_random```

  // While there remain elements to shuffle.
  while (i != 0) {
    // Pick an index(random) which is less than i.
    i_random = Math.floor(Math.random() * i);
    i--;
    // Swap the elements with those indexe.
    [arr[i], arr[i_random]] = [arr[i_random], arr[i]];
  }

  return arr;
}

let gridSize = 4; //for a 4 x 4 grid ... //this can later be changed from menu options : 4x4 or 6x6
const populate = (size) => {
  //---------------------------------------
  //for giving dimentions to the grid :
  let sizeStr = "";
  for (let i = 1; i <= size; i++) {
    sizeStr += "1fr ";
  }
  root.style.setProperty("--grid-size", sizeStr);
  //--------------------------------------------
  //for placing the values :
  //-------------------------------------------
  let count_required_emojis = Math.floor((size * size) / 2);
  // console.log(count_required_emojis); //use this when debugging
  //Now, to get new elements every time :
  let ShuffledEmojiArray = ShuffledArray(EmojiList);
  // Now, we just take only the require no. of elements from it...
  let RequiredArray = ShuffledEmojiArray.slice(0, count_required_emojis, 1);
  // console.log(RequiredArray);
  game.innerHTML = ""; // erasing all the previous HTML in #game
  // Finally, populating it :
  RequiredArray.forEach((e) => {
    game.innerHTML += `
  <button type="button" class="card" data-image="${e}">
      <div class="sides-encloser">
            <img alt="emoji" src="assets/QuestionMark4.png" class="front" />
            <img src="assets/${e}.png" alt="emoji" class="back" />
      </div>
  </button>
  <button type="button" class="card" data-image="${e}">
      <div class="sides-encloser">
            <img alt="emoji" src="assets/QuestionMark4.png" class="front" />
            <img src="assets/${e}.png" alt="emoji" class="back" />
      </div>
  </button>
  `; // same button is populated two times for a reason... think it...
  }); //these will be further shuffled.
};

populate(gridSize);
const cards = document.querySelectorAll(".card");

const shuffle = () => {
  cards.forEach((element) => {
    let index = Math.round(Math.random() * cards.length);
    // console.log(index);
    element.style.order = index;
  });
};
// Even after the population, shuffling is VERY important :
shuffle();
