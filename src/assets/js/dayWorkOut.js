//import { stopWorkOut } from "./workOutStart";

const homeContainer = document.querySelector(".home-container");
const dayContainer = document.querySelector(".day-container");

const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const dayNumber = new Date().getDay();
const day = week[dayNumber];

let currentList, nextList, prevList;

const handleDayBtn = (e) => {
  const {
    target: { classList },
  } = e;
  //stopWorkOut();
  if (classList.contains("next")) {
    dayContainer.classList.add("next");
    setTimeout(nextTimeOut, 500);
  } else {
    dayContainer.classList.add("prev");
    setTimeout(prevTimeOut, 500);
  }
};

const nextTimeOut = () => {
  dayContainer.classList.remove("next", "prev");
  setList("nextList");
};

const prevTimeOut = () => {
  dayContainer.classList.remove("next", "prev");
  setList("prevList");
};

const setList = (condition) => {
  const { children } = dayContainer;
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains(condition)) {
      currentList = children[i];
      nextList = children[i + 1 > children.length - 1 ? 0 : i + 1];
      prevList = children[i - 1 < 0 ? children.length - 1 : i - 1];
    }
    children[i].classList.remove("currentList", "nextList", "prevList");
  }
  currentList.classList.add("currentList");
  nextList.classList.add("nextList");
  prevList.classList.add("prevList");
};

if (homeContainer && dayContainer) {
  setList(day);
  currentList.classList.add("today");
  const dayBtns = homeContainer.querySelectorAll(".day-btn");
  dayBtns.forEach((b) => b.addEventListener("click", handleDayBtn));
}
