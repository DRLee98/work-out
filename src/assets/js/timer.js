const clockBox = document.getElementById("jsClockBox");
const clock = document.getElementById("jsClock");
const min = document.getElementById("jsMin");
const sec = document.getElementById("jsSec");
const stopBtn = document.getElementById("jsClockStop");

let time, runTime, interval, gauge, gaugeStep;

export let timerState;

const handleGauge = (v) => {
  if (runTime > 0) {
    clockBox.style.background = `conic-gradient(black 0% 0%, #ffe69b ${v}%, black ${v}% 100%)`;
  } else {
    timerStop();
  }
};

const formatTime = (v) => (v < 10 ? (v < 0 ? "00" : `0${v}`) : v);

const writeTime = () => {
  const minValue = Math.floor(runTime / 60);
  const secValue = Math.floor(runTime % 60);
  min.innerText = formatTime(minValue);
  sec.innerText = formatTime(secValue);
};

const timeRun = () => {
  writeTime();
  handleGauge(gauge);
  runTime = runTime - 0.01;
  gauge = gauge + gaugeStep;
};

export const timerSet = (t) => {
  time = t;
  runTime = time;
  gauge = 0;
  gaugeStep = (100 / time) * 0.01;
  timerState = "stop";
  writeTime();
};

export const timerStart = () => {
  if (time > 0) {
    interval = setInterval(timeRun, 10);
    clock.classList.add("start");
    timerState = "run";
    stopBtn.classList.add("show");
  }
};

export const timerStop = () => {
  if (interval) {
    clockBox.style.background = "";
    clock.classList.remove("start");
    timerState = "stop";
    timerSet(time);
    clearInterval(interval);
    stopBtn.classList.remove("show");
  }
};

if (stopBtn) {
  stopBtn.addEventListener("click", timerStop);
}
