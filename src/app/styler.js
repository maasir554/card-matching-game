const successStyler = (i) => {
  /* To be fired when two cards gets paired.*/
  i.style.backgroundColor = "transparent";
  i.style.borderColor = "transparent";
  i.children[0].children[1].style.borderColor = "lightgreen";
  i.children[0].children[1].style.outline = "none";
  document.styleSheets[1].insertRule(
    `button[data-image=${i.dataset.image}]:focus{outline:none;}`
  );
  i.style.animation = "pop 0.5s 1";
  i.children[0].children[1].style.animation = "rainbow 1s 2";
};

const circleHighlighter = (event) => {
  elem = event.currentTarget;
  elem.children[0].children[0].style.borderColor = "rgba(255, 255, 255, 0.85)";
};

const circleReverter = (event) => {
  elem = event.currentTarget;
  elem.children[0].children[0].style.borderColor = "rgba(255, 255, 255, 0.5)";
};
