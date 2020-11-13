import { timerSet, timerStart, timerStop } from "./timer";
import { writeSets, eraseSets } from "./setsBox";

const todayWorkOut = document.querySelectorAll(".day.today li");

let selected;

const selectWorkOut = (target) => {
  const { children } = target;
  selected = target;
  const time = parseInt(children[4].value);
  const sets = parseInt(children[3].value);
  timerSet(time);
  writeSets(sets);
  target.classList.add("selected");
};

const removeSelect = (target) => {
  eraseSets();
  target.classList.remove("selected");
};

const handleStart = (e) => {
  if (!selected) {
    const { target } = e;
    selectWorkOut(target);
    target.offsetParent.classList.add("start");
  }
};

const handleStop = (e) => {
  if (selected) {
    selected = null;
    const { target } = e;
    timerStop();
    timerSet(0);
    removeSelect(target);
  }
};

const eventListen = (target) => {
  target.addEventListener("click", handleStart);
  target.addEventListener("dblclick", handleStop);
};

export const nextWorkOut = () => {
  if (selected) {
    const { nextSibling } = selected;
    if (nextSibling) {
      selectWorkOut(nextSibling);
    } else {
      console.log("Finished Today Work Out !");
    }
    removeSelect(selected);
    selected.classList.add("complete");
    selected.removeEventListener("click", handleStart);
    selected.removeEventListener("dblclick", handleStop);
  }
};

const init = () => {
  todayWorkOut.forEach((li) => eventListen(li));
};

if (todayWorkOut) {
  init();
}
