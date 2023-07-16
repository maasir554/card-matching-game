clock = document.getElementById("elapsed-time");
let [mins, secs] = [0, 0];
let TIMER_INT; // this variable will be used in menus.js (I have to do this because of the poor behaviour of JS.)

const timeUpdater = () => {
  if (secs < 60) {
    secs++;
  } else {
    secs = 0;
    mins++;
  }
  clock.innerText = secs;
  if (secs < 10) {
    clock.innerText = `${mins}:0${secs}`;
  } else {
    clock.innerText = `${mins}:${secs}`;
  }
};
// the interval should NOT be toos mall like 100 ms as then JS will lag too much...
// setInterval(timeUpdater, 1000);
