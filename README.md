# card-matching-game v1.0.0

**[click Here](https://maasir554.github.io/card-matching-game/src)** to run the project.

card-matching-game is based on a very basic game type, that majority of us would have alredy played.

In this project, I will be using only `HTML`, `CSS` and `JavaScript`, without the usage of any external package, UI library and/or State-Management framework / library like `React`, `Vue`, `Angular`, etc. , as a challenge.

This project is built from complete scratch.

## Basic Structure of the project :

- The HTML file contains only the basic skeliton of the UI
- external css-stylesheets contains the main styling / positioning.
- the Cards will be injected in the HTML by `data.js`, as soon as the page gets loaded.
- the interaction logic of Cards, including click events, is written in `app.js`
- The file `styler.js` contains some optional styling and animation functions that makes the game more engaging.

# Functionalities

- click the cards to **open/close** them, if not closed, unpaired cards will automatically be closed after some time.
- game can be **paused/resumed** at any time you want. and after the end of the game, you can click on **Play Again** to restart the game.
- The **score** will be calculated after every move, using a specific algorithm.
- Your **High Score** will be saved in the local storage.
- the UI is completely responsive.
