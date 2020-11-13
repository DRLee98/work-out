import { timerStart, timerState } from "./timer";
import { nextWorkOut } from "./workOutStart";

const setsBox = document.getElementById("jsSetsBox");

let boxList = [];

const handleChecked = (e) => {
  const { target } = e;
  const lastSet = InspectSet();
  if (lastSet && timerState === "stop") {
    nextWorkOut();
  } else if (target.checked && timerState === "stop") {
    target.disabled = true;
    timerStart();
  } else {
    target.checked = false;
  }
};

const InspectSet = () => {
  const checkList = boxList.filter((li) => li.checked);
  if (boxList.length === checkList.length) {
    return true;
  }
  return false;
};

export const eraseSets = () => {
  while (setsBox.firstChild) {
    setsBox.removeChild(setsBox.lastChild);
  }
};

export const writeSets = (sets) => {
  for (let i = 0; i < sets; i++) {
    const div = document.createElement("div");
    const chkbox = document.createElement("input");
    const label = document.createElement("label");
    chkbox.type = "checkbox";
    chkbox.id = `checkbox${i}`;
    label.htmlFor = `checkbox${i}`;
    boxList.push(chkbox);
    div.append(chkbox, label);
    setsBox.appendChild(div);
    chkbox.addEventListener("click", handleChecked);
  }
};
