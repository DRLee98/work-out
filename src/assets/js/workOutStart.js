import { timerSet, timerStop } from "./timer";
import { writeSets, eraseSets } from "./setsBox";

const todayWorkOut = document.querySelectorAll(".day.today li");

let selected;
let workOutList = [];

const selectWorkOut = (target) => {
  const { children } = target;
  selected = target;
  const time = parseInt(children[4].value);
  const sets = parseInt(children[3].value);
  timerSet(time);
  writeSets(sets);
  target.classList.add("selected");
  target.addEventListener("dblclick", stopWorkOut);
};

const removeSelect = (target) => {
  timerStop();
  timerSet(0);
  eraseSets();
  target.classList.remove("selected");
  target.removeEventListener("dblclick", stopWorkOut);
};

const handleStart = (e) => {
  if (!selected) {
    const { target } = e;
    selectWorkOut(target);
    target.offsetParent.classList.add("start");
  }
};

const eventListen = (target) => {
  target.addEventListener("click", handleStart);
  workOutList.push(target);
};

const inspectList = () => {
  const checkList = workOutList.filter((li) =>
    li.classList.contains("finished")
  );
  if (workOutList.length === checkList.length) {
    return true;
  }
  return false;
};

export const stopWorkOut = (e) => {
  if (selected) {
    selected = null;
    const { target } = e;
    removeSelect(target);
    target.offsetParent.classList.remove("start");
  }
};

export const nextWorkOut = () => {
  if (selected) {
    removeSelect(selected);
    selected.classList.add("finished");
    selected.removeEventListener("click", handleStart);
    let { nextSibling } = selected;
    const finished = inspectList();
    if (finished) {
      console.log("Finished Today Work Out !");
      selected.offsetParent.classList.remove("start");
    } else if (nextSibling && nextSibling.classList.contains("finished")) {
      ({ nextSibling } = nextSibling);
    }
    selectWorkOut(nextSibling);
  }
};

const init = () => {
  todayWorkOut.forEach((li) => eventListen(li));
};

if (todayWorkOut) {
  init();
}
