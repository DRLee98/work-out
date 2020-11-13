const homeContainer = document.querySelector(".home-container");
const dayContainer = document.querySelector(".day-container");

const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const dayNumber = new Date().getDay();
const day = week[dayNumber];

let today;

function init() {
  const { children } = dayContainer;
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains(day)) {
      today = children[i];
    }
  }
  today.classList.add("today");
}

if (homeContainer && dayContainer) {
  init();
}
