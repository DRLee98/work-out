const clockBox = document.getElementById("jsClockBox");
const clock = clockBox.querySelector("#jsClock");

let interval;
let time = 0;

const gauge = (v) => {
  clockBox.style.background = `conic-gradient(black 0% 0%, #ffe69b ${v}%, black ${v}% 100%)`;
};

const timeRun = () => {
  gauge(time);
  if (time > 100) {
    clock.style.width = "140px";
    clock.style.height = "140px";
    clockBox.style.background = "";
    clearInterval(interval);
  }
  time = time + 0.01;
};

const init = () => {
  clock.style.width = "150px";
  clock.style.height = "150px";
  interval = setInterval(timeRun, 10);
};

init();
