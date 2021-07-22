import { timerSet, timerStop } from "./timer";
import { writeSets, eraseSets } from "./setsBox";
import axios from "axios";
import routes from "../../routes";

const todayWorkOut = document.querySelectorAll(".day.today li");
const homeContainer = document.getElementById("jsHome");

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
    li.classList.contains("finished"),
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

export const nextWorkOut = async () => {
  if (selected) {
    removeSelect(selected);
    selected.classList.add("finished");
    selected.removeEventListener("click", handleStart);
    let { nextSibling } = selected;
    while (nextSibling && nextSibling.classList.contains("finished")) {
      ({ nextSibling } = nextSibling);
    }
    if (nextSibling) {
      return selectWorkOut(nextSibling);
    }
    if (inspectList()) {
      const response = await axios({
        url: `/api${routes.addCompleteDate}`,
        method: "POST",
      });
      if (response.status === 200) {
        homeContainer.classList.add("finished");
        console.log("Finished Today Work Out!");
      } else {
        const error = response.data;
        console.log(error);
      }
    }
    selected.offsetParent.classList.remove("start");
    selected = null;
  }
};

const init = () => {
  todayWorkOut.forEach((li) => eventListen(li));
};

if (todayWorkOut) {
  init();
}
