//import { stopWorkOut } from "./workOutStart";
import axios from "axios";
import routes from "../../routes";
import { handleStart } from "./workOutStart";

const homeContainer = document.querySelector(".home-container");
const dayContainer = document.querySelector(".day-container");

const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const dayNumber = new Date().getDay();
const day = week[dayNumber];

let currentList, nextList, prevList;

function getDateObj(targetDate) {
  const newDate = new Date(targetDate);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const day = newDate.getDay();
  const dayStr = week[day];
  return { year, month, date, dayStr };
}

function getStartDate() {
  let weekDateList = [];
  const newDate = new Date();
  const date = newDate.getDate();
  const startDate = new Date(newDate.setDate(date - dayNumber));
  const startDateNum = startDate.getDate();
  for (let i = 0; i <= dayNumber; i++) {
    const addDate = startDate.setDate(startDateNum + i);
    const dateObj = getDateObj(addDate);
    weekDateList.push(dateObj);
  }
  getCompleteDate(weekDateList);
}

function setCompleteDate(weekDateList, dateList) {
  weekDateList.forEach((dateObj) => {
    const isCompleteDate = Boolean(
      dateList.find(
        (findDate) =>
          findDate.year === dateObj.year &&
          findDate.month === dateObj.month &&
          findDate.date === dateObj.date,
      ),
    );
    if (isCompleteDate) {
      const targets = dayContainer.querySelectorAll(
        `.${dateObj.dayStr}.day li.workOut`,
      );
      if (day === dateObj.dayStr) {
        homeContainer.classList.add("finished");
      }
      targets.forEach((target) => {
        target.removeEventListener("click", handleStart);
        target.classList.add("finished");
      });
    }
  });
}

async function getCompleteDate(weekDateList) {
  const response = await axios({
    url: `/api${routes.getCompleteDate}`,
    method: "POST",
    data: {
      year: weekDateList[0].year,
      month: weekDateList[0].month,
      onlyThisMonth: true,
    },
  });
  if (response.status === 200) {
    console.log(response.data);
    const dateList = response.data;
    setCompleteDate(weekDateList, dateList);
  } else {
    const error = response.data;
    console.log(error);
  }
}

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
  getStartDate();
  currentList.classList.add("today");
  const dayBtns = homeContainer.querySelectorAll(".day-btn");
  dayBtns.forEach((b) => b.addEventListener("click", handleDayBtn));
}
